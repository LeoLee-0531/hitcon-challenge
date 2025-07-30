import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';

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

  // 建立管理員帳戶
  if (!process.env.ADMIN_DEFAULT_PASSWORD) {
    throw new Error('❌ 環境變數 ADMIN_DEFAULT_PASSWORD 未設定，無法建立管理員帳戶。');
  }
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10);

  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log('✅ 管理員帳戶已建立:', { username: admin.username });

  // 建立關卡資料
  const stages = await Promise.all([
    prisma.stage.create({
      data: {
        stageNumber: 1,
        password: 'flag{hitcon_physical_flag}',
        titleZh: '實體 Flag 蒐集',
        descriptionZh: '在會場中找到隱藏的實體 Flag，並輸入正確的密碼來通關。',
        titleEn: 'Physical Flag Collection',
        descriptionEn:
          'Find the hidden physical flags in the venue and enter the correct password to pass.',
        externalUrl: null,
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 2,
        password: 'flag{prompt_injection_master}',
        titleZh: 'Prompt Injection 挑戰',
        descriptionZh: '嘗試通過 Prompt Injection 技術來突破 AI 系統的防護。',
        titleEn: 'Prompt Injection Challenge',
        descriptionEn:
          'Try to use Prompt Injection techniques to break through AI system defenses.',
        externalUrl: 'https://prompt-injection.example.com',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 3,
        password: 'flag{web_security_ninja}',
        titleZh: 'Web 安全挑戰',
        descriptionZh: '發現並利用 Web 應用程式中的安全漏洞。',
        titleEn: 'Web Security Challenge',
        descriptionEn:
          'Discover and exploit security vulnerabilities in web applications.',
        externalUrl: 'https://web-challenge.example.com',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 4,
        password: 'flag{reverse_engineering_pro}',
        titleZh: '逆向工程',
        descriptionZh: '分析並逆向工程二進位檔案以找到隱藏的秘密。',
        titleEn: 'Reverse Engineering',
        descriptionEn:
          'Analyze and reverse engineer binary files to find hidden secrets.',
        externalUrl: 'https://reverse.example.com',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 5,
        password: 'flag{crypto_wizard}',
        titleZh: '密碼學挑戰',
        descriptionZh: '破解各種加密演算法和密碼學難題。',
        titleEn: 'Cryptography Challenge',
        descriptionEn:
          'Break various encryption algorithms and cryptographic puzzles.',
        externalUrl: 'https://crypto.example.com',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 6,
        password: 'flag{forensics_detective}',
        titleZh: '數位鑑識',
        descriptionZh: '從數位證據中找出隱藏的線索和訊息。',
        titleEn: 'Digital Forensics',
        descriptionEn: 'Find hidden clues and messages from digital evidence.',
        externalUrl: 'https://forensics.example.com',
        isActive: true,
      },
    }),
    prisma.stage.create({
      data: {
        stageNumber: 7,
        password: 'flag{pwn_master_supreme}',
        titleZh: 'Binary Exploitation',
        descriptionZh: '利用二進位程式的漏洞來獲得系統控制權。',
        titleEn: 'Binary Exploitation',
        descriptionEn:
          'Exploit binary program vulnerabilities to gain system control.',
        externalUrl: 'https://pwn.example.com',
        isActive: true,
      },
    }),
  ]);

  console.log('✅ 關卡資料已建立:', stages.length, '個關卡');

  // 建立獎勵等級設定
  const rewardLevels = await Promise.all([
    prisma.rewardLevel.create({
      data: {
        level: 1,
        requiredPassed: 3,
        titleZh: '銅級獎勵',
        descriptionZh: '完成 3 個關卡即可獲得銅級獎勵',
        titleEn: 'Bronze Reward',
        descriptionEn: 'Complete 3 challenges to get bronze reward',
        isActive: true,
      },
    }),
    prisma.rewardLevel.create({
      data: {
        level: 2,
        requiredPassed: 5,
        titleZh: '銀級獎勵',
        descriptionZh: '完成 5 個關卡即可獲得銀級獎勵',
        titleEn: 'Silver Reward',
        descriptionEn: 'Complete 5 challenges to get silver reward',
        isActive: true,
      },
    }),
    prisma.rewardLevel.create({
      data: {
        level: 3,
        requiredPassed: 7,
        titleZh: '金級獎勵',
        descriptionZh: '完成所有 7 個關卡即可獲得金級獎勵',
        titleEn: 'Gold Reward',
        descriptionEn: 'Complete all 7 challenges to get gold reward',
        isActive: true,
      },
    }),
  ]);

  console.log('✅ 獎勵等級已建立:', rewardLevels.length, '個等級');

  // 建立測試使用者
  const testUsers = await Promise.all([
    prisma.user.create({
      data: {
        googleId: 'test_google_id_1',
        email: 'user1@example.com',
        nickname: '測試使用者一',
        language: 'zh',
      },
    }),
    prisma.user.create({
      data: {
        googleId: 'test_google_id_2',
        email: 'user2@example.com',
        nickname: 'Test User Two',
        language: 'en',
      },
    }),
    prisma.user.create({
      data: {
        googleId: 'test_google_id_3',
        email: 'user3@example.com',
        nickname: '測試使用者三',
        language: 'zh',
      },
    }),
    prisma.user.create({
      data: {
        googleId: 'test_google_id_4',
        email: 'user4@example.com',
        nickname: 'Advanced User',
        language: 'en',
      },
    }),
  ]);

  console.log('✅ 測試使用者已建立:', testUsers.length, '個使用者');

  // 為測試使用者建立一些進度記錄
  // 使用者1: 通過 5 關 (銀級獎勵資格)
  await Promise.all([
    prisma.userProgress.create({
      data: {
        userId: testUsers[0].id,
        stageId: stages[0].id,
        passed: true,
        passedAt: new Date('2024-07-01T10:00:00Z'),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: testUsers[0].id,
        stageId: stages[1].id,
        passed: true,
        passedAt: new Date('2024-07-01T11:00:00Z'),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: testUsers[0].id,
        stageId: stages[2].id,
        passed: true,
        passedAt: new Date('2024-07-01T12:00:00Z'),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: testUsers[0].id,
        stageId: stages[3].id,
        passed: true,
        passedAt: new Date('2024-07-01T13:00:00Z'),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: testUsers[0].id,
        stageId: stages[4].id,
        passed: true,
        passedAt: new Date('2024-07-01T14:00:00Z'),
      },
    }),
  ]);

  // 使用者2: 通過 3 關 (銅級獎勵資格)
  await Promise.all([
    prisma.userProgress.create({
      data: {
        userId: testUsers[1].id,
        stageId: stages[0].id,
        passed: true,
        passedAt: new Date('2024-07-01T15:00:00Z'),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: testUsers[1].id,
        stageId: stages[1].id,
        passed: true,
        passedAt: new Date('2024-07-01T16:00:00Z'),
      },
    }),
    prisma.userProgress.create({
      data: {
        userId: testUsers[1].id,
        stageId: stages[2].id,
        passed: true,
        passedAt: new Date('2024-07-01T17:00:00Z'),
      },
    }),
  ]);

  // 使用者3: 通過所有 7 關 (金級獎勵資格)
  await Promise.all(
    stages.map((stage, index) =>
      prisma.userProgress.create({
        data: {
          userId: testUsers[2].id,
          stageId: stage.id,
          passed: true,
          passedAt: new Date(`2024-07-02T${10 + index}:00:00Z`),
        },
      })
    )
  );

  // 使用者4: 只通過 1 關 (不符合獎勵資格)
  await prisma.userProgress.create({
    data: {
      userId: testUsers[3].id,
      stageId: stages[0].id,
      passed: true,
      passedAt: new Date('2024-07-03T10:00:00Z'),
    },
  });

  console.log('✅ 使用者進度已建立');

  // 為使用者1建立領獎記錄 (已領取銀級獎勵)
  await prisma.rewardClaim.create({
    data: {
      userId: testUsers[0].id,
      claimedBy: admin.id,
      claimedAt: new Date('2024-07-01T15:00:00Z'),
    },
  });

  console.log('✅ 領獎記錄已建立');

  console.log('\n🎉 假資料建立完成！');
  console.log('管理員帳戶:', { username: 'admin', password: defaultPassword });
  console.log('測試使用者:');
  testUsers.forEach((user, index) => {
    const progressCount =
      index === 0 ? 5 : index === 1 ? 3 : index === 2 ? 7 : 1;
    console.log(
      `  - ${user.nickname} (${user.email}): ${progressCount} 關卡完成`
    );
  });
}

main()
  .catch((e) => {
    console.error('❌ 建立假資料時發生錯誤:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
