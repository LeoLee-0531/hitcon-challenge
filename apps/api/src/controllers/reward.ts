import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { AuthenticatedRequest, RewardClaimPayload } from '../types';

// 領獎所需的最少通關數
const MIN_STAGES_FOR_REWARD = 3;

export const getRewardStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    let targetUserId: string;

    // 如果是管理員且提供了 user_id，查詢指定使用者
    if (req.admin && req.query.user_id) {
      targetUserId = req.query.user_id as string;
    } else if (req.user) {
      targetUserId = req.user.id;
    } else {
      sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED],
        401
      );
      return;
    }

    // 查找使用者及其進度
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        progress: {
          where: { passed: true },
        },
        rewardClaim: true,
      },
    });

    if (!user) {
      sendError(
        res,
        ERROR_CODES.USER_NOT_FOUND,
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        404
      );
      return;
    }

    const passedCount = user.progress.length;
    const rewardClaimed = !!user.rewardClaim;
    const claimedAt = user.rewardClaim?.claimedAt || null;

    sendSuccess(res, {
      user_id: user.id,
      nickname: user.nickname,
      passed_count: passedCount,
      reward_claimed: rewardClaimed,
      claimed_at: claimedAt,
    });
  } catch (error) {
    console.error('取得獎勵狀態錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

export const claimReward = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { user_id }: RewardClaimPayload = req.body;

    if (!req.admin) {
      sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]
      );
      return;
    }

    const adminId = req.admin.id;

    // 查找使用者及其進度
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        progress: {
          where: { passed: true },
        },
        rewardClaim: true,
      },
    });

    if (!user) {
      sendError(
        res,
        ERROR_CODES.USER_NOT_FOUND,
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        404
      );
      return;
    }

    // 檢查是否已領取過獎勵
    if (user.rewardClaim) {
      sendError(
        res,
        ERROR_CODES.ALREADY_CLAIMED,
        ERROR_MESSAGES[ERROR_CODES.ALREADY_CLAIMED]
      );
      return;
    }

    const passedCount = user.progress.length;

    // 檢查是否符合領獎資格 (至少通過 3 關)
    if (passedCount < MIN_STAGES_FOR_REWARD) {
      sendError(
        res,
        ERROR_CODES.NOT_ELIGIBLE,
        ERROR_MESSAGES[ERROR_CODES.NOT_ELIGIBLE]
      );
      return;
    }

    // 創建領獎記錄
    const rewardClaim = await prisma.rewardClaim.create({
      data: {
        userId: user_id,
        claimedBy: adminId,
      },
    });

    sendSuccess(res, {
      user_id: user.id,
      nickname: user.nickname,
      passed_count: passedCount,
      reward_claimed: true,
      claimed_at: rewardClaim.claimedAt,
    });
  } catch (error) {
    console.error('領取獎勵錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

export const resetReward = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { user_id }: RewardClaimPayload = req.body;

    // 查找使用者及其進度
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        progress: {
          where: { passed: true },
        },
        rewardClaim: true,
      },
    });

    if (!user) {
      sendError(
        res,
        ERROR_CODES.USER_NOT_FOUND,
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        404
      );
      return;
    }

    // 刪除領獎記錄
    if (user.rewardClaim) {
      await prisma.rewardClaim.delete({
        where: { id: user.rewardClaim.id },
      });
    }

    const passedCount = user.progress.length;

    sendSuccess(res, {
      user_id: user.id,
      nickname: user.nickname,
      passed_count: passedCount,
      reward_claimed: false,
      claimed_at: null,
    });
  } catch (error) {
    console.error('重設獎勵錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};
