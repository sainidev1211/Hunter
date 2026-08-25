import { Injectable, NotFoundException, BadRequestException, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto.js';
import { Plan, PlanDocument } from './schemas/plan.schema.js';
import { PrismaService } from '../database/prisma.service.js';

const DEFAULT_PUBLIC_PLANS = [
  {
    id: 'professional',
    slug: 'professional',
    name: 'Professional',
    description: 'Essential matching and dispatch tools to jumpstart your applications.',
    monthlyPrice: 999,
    yearlyPrice: 10990,
    currency: 'INR',
    jobCredits: 10,
    aiCredits: 0,
    resumeCredits: 0,
    atsCredits: 0,
    features: ['Upto 10 daily job matches', '10 credits/month', '50-60 applications/month'],
    status: 'ACTIVE',
    displayOrder: 1,
  },
  {
    id: 'premium',
    slug: 'premium',
    name: 'Premium',
    description: 'Perfect for active job candidates hunting for multiple interview invites.',
    monthlyPrice: 1299,
    yearlyPrice: 13990,
    currency: 'INR',
    jobCredits: 20,
    aiCredits: 0,
    resumeCredits: 0,
    atsCredits: 1,
    features: ['Upto 15 daily job matches', '20 credits/month', '80-100 applications/month', 'ATS Score Checker'],
    status: 'ACTIVE',
    displayOrder: 2,
  },
  {
    id: 'elite',
    slug: 'elite',
    name: 'Elite',
    description: 'Advanced automation features designed for rapid placement campaigns.',
    monthlyPrice: 1499,
    yearlyPrice: 15990,
    currency: 'INR',
    jobCredits: 30,
    aiCredits: 0,
    resumeCredits: 0,
    atsCredits: 1,
    features: ['Upto 25 daily job matches', '30 credits/month', '150 applications/month', 'ATS Score Checker'],
    status: 'ACTIVE',
    displayOrder: 3,
  },
];

@Injectable()
export class PlansService implements OnModuleInit {
  private readonly logger = new Logger(PlansService.name);
  private cachedPublicPlans: any[] | null = null;
  private cacheTimestamp = 0;
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes in-memory cache
  private isSeeded = false;

  constructor(
    @InjectModel(Plan.name) private planModel: Model<PlanDocument>,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    // Seed in the background without blocking server startup
    this.ensureSeeded().catch((err) => {
      this.logger.warn('Background seed notice:', err?.message || err);
    });
  }

  private async ensureSeeded() {
    if (this.isSeeded) return;
    try {
      // Upsert default plans
      for (const plan of DEFAULT_PUBLIC_PLANS) {
        await this.planModel.findOneAndUpdate(
          { id: plan.id },
          { $set: { ...plan } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
      }

      const count = await this.planModel.countDocuments();
      if (count <= DEFAULT_PUBLIC_PLANS.length) {
        try {
          const pgPlans = await Promise.race([
            this.prisma.subscriptionPlan.findMany(),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Postgres seed timeout')), 2000)),
          ]);
          for (const p of pgPlans || []) {
            const exists = await this.planModel.findOne({ id: p.id }).lean();
            if (exists) continue;
            await this.planModel.create({
              id: p.id,
              slug: p.slug,
              name: p.name,
              description: p.description as any,
              monthlyPrice: Number(p.monthlyPrice),
              yearlyPrice: p.yearlyPrice ? Number(p.yearlyPrice) : undefined,
              currency: p.currency,
              jobCredits: p.jobCredits,
              aiCredits: p.aiCredits,
              resumeCredits: p.resumeCredits,
              atsCredits: p.atsCredits,
              features: p.features as any,
              status: p.status,
              displayOrder: p.displayOrder,
            } as any);
          }
        } catch (e: any) {
          // Non-blocking postgres seed fallback
        }
      }
      this.isSeeded = true;
    } catch (e: any) {
      this.logger.warn('Plan seeding fallback triggered:', e?.message || e);
    }
  }

  private invalidateCache() {
    this.cachedPublicPlans = null;
    this.cacheTimestamp = 0;
  }

  async getPublicPlans(): Promise<any[]> {
    const now = Date.now();
    if (this.cachedPublicPlans && (now - this.cacheTimestamp < this.CACHE_TTL_MS)) {
      return this.cachedPublicPlans;
    }

    try {
      const plans = await this.planModel.find({ status: 'ACTIVE' }).sort({ displayOrder: 1 }).lean();
      if (plans && plans.length > 0) {
        this.cachedPublicPlans = plans;
        this.cacheTimestamp = now;
        return plans;
      }
    } catch (error: any) {
      this.logger.warn('Failed to query Mongo plans, falling back immediately:', error?.message || error);
    }

    // Immediate zero-latency fallback
    return DEFAULT_PUBLIC_PLANS;
  }

  async getAllPlans() {
    await this.ensureSeeded();
    return this.planModel.find().sort({ displayOrder: 1 }).lean();
  }

  async getPlanById(id: string) {
    const plan = await this.planModel.findOne({ id }).lean();
    if (!plan) {
      const defaultPlan = DEFAULT_PUBLIC_PLANS.find((p) => p.id === id);
      if (defaultPlan) return defaultPlan;
      throw new NotFoundException('Plan not found');
    }
    return plan;
  }

  async createPlan(dto: CreatePlanDto) {
    const existing = await this.planModel.findOne({ slug: dto.slug }).lean();
    if (existing) throw new BadRequestException('Plan with this slug already exists');
    const created = await this.planModel.create(dto as any);
    this.invalidateCache();
    return created;
  }

  async updatePlan(id: string, dto: Partial<UpdatePlanDto>) {
    await this.getPlanById(id);
    const updated = await this.planModel.findOneAndUpdate({ id }, dto, { new: true }).lean();
    this.invalidateCache();
    return updated;
  }

  async togglePlanStatus(id: string, status: string) {
    await this.getPlanById(id);
    const updated = await this.planModel.findOneAndUpdate({ id }, { status }, { new: true }).lean();
    this.invalidateCache();
    return updated;
  }

  async getPlanComparison() {
    const plans = await this.getPublicPlans();
    return {
      features: plans.map((p: any) => p.features),
      limits: plans.map((p: any) => ({
        name: p.name,
        aiCredits: p.aiCredits,
        resumeCredits: p.resumeCredits,
        jobCredits: p.jobCredits,
        atsCredits: p.atsCredits,
        maxApplications: p.maxApplications,
      })),
      pricing: plans.map((p: any) => ({ name: p.name, monthly: p.monthlyPrice, yearly: p.yearlyPrice })),
    };
  }
}
