import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';
// import bcrypt from 'bcrypt'

// 載入 .env
config({ path: resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('開始建立假資料...');

  // 清除現有資料（開發環境用）
  await prisma.rewardClaim.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.rewardLevel.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.statisticsSnapshot.deleteMany();

  // 建立關卡資料
  const stages = await Promise.all([
    prisma.stage.create({
      data: {
        stageNumber: 1,
        password: 'stage1pass',
        titleZh: '第一關：實體 Flag',
        descriptionZh: '這是第一關的描述',
        titleEn: 'Stage 1: The Real Flag',
        descriptionEn: 'This is the description for stage 1',
        externalUrl: 'https://example.com/stage1',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 2,
        password: 'stage2pass',
        titleZh: '第二關：Prompt Injection',
        descriptionZh: '這是第二關的描述',
        titleEn: 'Stage 2: Prompt Injection',
        descriptionEn: 'This is the description for stage 2',
        externalUrl: 'https://example.com/stage2',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 3,
        password: 'stage3pass',
        titleZh: '第三關：Web Security',
        descriptionZh: '這是第三關的描述',
        titleEn: 'Stage 3: Web Security',
        descriptionEn: 'This is the description for stage 3',
        externalUrl: 'https://example.com/stage3',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 4,
        password: 'stage4pass',
        titleZh: '第四關：Cryptography',
        descriptionZh: '這是第四關的描述',
        titleEn: 'Stage 4: Cryptography',
        descriptionEn: 'This is the description for stage 4',
        externalUrl: 'https://example.com/stage4',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 5,
        password: 'stage5pass',
        titleZh: '第五關：Reverse Engineering',
        descriptionZh: '這是第五關的描述',
        titleEn: 'Stage 5: Reverse Engineering',
        descriptionEn: 'This is the description for stage 5',
        externalUrl: 'https://example.com/stage5',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 6,
        password: 'stage6pass',
        titleZh: '第六關：Network Security',
        descriptionZh: '這是第六關的描述',
        titleEn: 'Stage 6: Network Security',
        descriptionEn: 'This is the description for stage 6',
        externalUrl: 'https://example.com/stage6',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 7,
        password: 'stage7pass',
        titleZh: '第七關：Final Challenge',
        descriptionZh: '這是第七關的描述',
        titleEn: 'Stage 7: Final Challenge',
        descriptionEn: 'This is the description for stage 7',
        externalUrl: 'https://example.com/stage7',
        isActive: true,
      },
    }),
  ]);

  // 建立獎勵等級
  const rewardLevels = await Promise.all([
    prisma.rewardLevel.create({
      data: {
        level: 1,
        requiredPassed: 3,
        titleZh: '第一級獎勵',
        descriptionZh: '通過 3 個關卡可獲得第一級獎勵',
        titleEn: 'First Level Reward',
        descriptionEn: 'Pass 3 stages to get first level reward',
      },
    }),
    prisma.rewardLevel.create({
      data: {
        level: 2,
        requiredPassed: 5,
        titleZh: '第二級獎勵',
        descriptionZh: '通過 5 個關卡可獲得第二級獎勵',
        titleEn: 'Second Level Reward',
        descriptionEn: 'Pass 5 stages to get second level reward',
      },
    }),
    prisma.rewardLevel.create({
      data: {
        level: 3,
        requiredPassed: 7,
        titleZh: '第三級獎勵',
        descriptionZh: '通過 7 個關卡可獲得第三級獎勵',
        titleEn: 'Third Level Reward',
        descriptionEn: 'Pass 7 stages to get third level reward',
      },
    }),
  ]);

  // 建立測試用戶
  const users = await Promise.all([
    prisma.user.create({
      data: {
        googleId: 'google_123456',
        email: 'user1@example.com',
        nickname: '測試用戶1',
        profileImage: 'https://example.com/avatar1.jpg',
        language: 'zh',
      },
    }),
    prisma.user.create({
      data: {
        googleId: 'google_789012',
        email: 'user2@example.com',
        nickname: 'Test User 2',
        profileImage: 'https://example.com/avatar2.jpg',
        language: 'en',
      },
    }),
    prisma.user.create({
      data: {
        googleId: 'google_345678',
        email: 'user3@example.com',
        nickname: '獎勵測試用戶',
        profileImage: 'https://example.com/avatar3.jpg',
        language: 'zh',
      },
    }),
    // 更多測試用戶...
  ]);

  // 建立用戶進度
  await Promise.all([
    // 第一位用戶進度（只完成前兩關）
    prisma.userProgress.create({
      data: {
        userId: users[0].id,
        stageId: stages[0].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: users[0].id,
        stageId: stages[1].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    // 第三位用戶進度（完成前五關，符合等級二獎勵條件）
    prisma.userProgress.create({
      data: {
        userId: users[2].id,
        stageId: stages[0].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: users[2].id,
        stageId: stages[1].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: users[2].id,
        stageId: stages[2].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: users[2].id,
        stageId: stages[3].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: users[2].id,
        stageId: stages[4].id,
        passed: true,
        passedAt: new Date(),
      },
    }),
    // 更多進度記錄...
  ]);

  // 建立獎勵領取記錄
  await prisma.rewardClaim.create({
    data: {
      userId: users[2].id, // 第三個用戶（獎勵測試用戶）
      claimedAt: new Date(), // 明確設定領取時間
      claimedBy: 'admin', // 管理員發放
    },
  });

  // 建立管理員
  // const hashedPassword = await bcrypt.hash('SITCON2025', 10)
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: 'SITCON2025', // 暫時使用明文密碼進行測試
      isActive: true,
    },
  });

  console.log('假資料建立完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
