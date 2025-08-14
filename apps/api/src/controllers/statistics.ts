import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { AuthenticatedRequest } from '../types';

export const getOverviewStatistics = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // 總使用者數
    const totalUsers = await prisma.user.count();

    // 完成所有關卡的使用者數 (通過 7 關)
    const totalStages = await prisma.stage.count({ where: { isActive: true } });

    // 實際完成所有關卡的使用者
    const usersWithAllStagesPassed = await prisma.user.findMany({
      include: {
        progress: {
          where: { passed: true },
        },
      },
    });

    const fullyCompletedUsers = usersWithAllStagesPassed.filter(
      (user) => user.progress.length === totalStages
    ).length;

    const completionRate =
      totalUsers > 0 ? fullyCompletedUsers / totalUsers : 0;

    sendSuccess(res, {
      total_users: totalUsers,
      completed_users: fullyCompletedUsers,
      completion_rate: parseFloat(completionRate.toFixed(3)),
      last_updated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('取得總覽統計錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

export const getStageStatistics = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const stages = await prisma.stage.findMany({
      where: { isActive: true },
      orderBy: { stageNumber: 'asc' },
      include: {
        userProgress: {
          where: { passed: true },
        },
      },
    });

    const totalUsers = await prisma.user.count();

    const stageStats = stages.map((stage) => {
      const passedCount = stage.userProgress.length;
      const passRate = totalUsers > 0 ? passedCount / totalUsers : 0;

      return {
        stage_id: stage.id,
        stage_title: stage.title, // 預設使用中文標題
        passed_count: passedCount,
        pass_rate: parseFloat(passRate.toFixed(3)),
      };
    });

    sendSuccess(res, {
      stage_stats: stageStats,
    });
  } catch (error) {
    console.error('取得關卡統計錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

export const getRewardStatistics = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // 符合領獎資格的使用者數 (通過至少 3 關)
    const usersWithProgress = await prisma.user.findMany({
      include: {
        progress: {
          where: { passed: true },
        },
      },
    });

    const eligibleUsers = usersWithProgress.filter(
      (user) => user.progress.length >= 3
    );
    const totalEligibleUsers = eligibleUsers.length;

    // 已領取獎勵的使用者數
    const totalClaimedCount = await prisma.rewardClaim.count();

    const claimRate =
      totalEligibleUsers > 0 ? totalClaimedCount / totalEligibleUsers : 0;

    sendSuccess(res, {
      total_eligible_users: totalEligibleUsers,
      total_claimed_count: totalClaimedCount,
      claim_rate: parseFloat(claimRate.toFixed(3)),
    });
  } catch (error) {
    console.error('取得獎勵統計錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};
