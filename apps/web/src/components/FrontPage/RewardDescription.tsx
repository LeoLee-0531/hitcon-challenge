'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

interface RewardDescriptionProps {
  isMobile: boolean;
}

export default function RewardDescription({ isMobile }: RewardDescriptionProps) {
  const t = useTranslations('');
  return (
    <div className="glass-container shadow-md">
      <div>
        <div className="event-title font-bold">兌獎說明</div>
        <p className="event-content font-light">
          挑戰成功後，即可至 SITCON 攤位兌換獎勵！獎品有限，兌完為止！
        </p>
      </div>
      <div>
        <div className="reward-title font-bold">獎勵分級制度</div>
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-4`}>
          <div className="reward-glass-container">
            <p className="reward-3 reward-level font-bold">3 關</p>
            <p className="reward-3 reward-prize font-bold">一級獎</p>
          </div>
          <div className="reward-glass-container">
            <p className="reward-5 reward-level font-bold">5 關</p>
            <p className="reward-5 reward-prize font-bold">二級獎</p>
          </div>
          <div className="reward-glass-container">
            <p className="reward-7 reward-level font-bold">7 關</p>
            <p className="reward-7 reward-prize font-bold">三級獎</p>
          </div>
        </div>
        <p className="pt-2 font-light text-[1rem] text-center text-[#E3E3E3]">
          每人限領一次獎勵，不可重複領取
        </p>
      </div>
      <div>
        <div className="reward-title font-bold">兌獎流程</div>

        <div className="reward-list event-content">
          <div className="reward-list-content">
            <div className="w-[0.625rem] h-[0.625rem] bg-gray-300 rounded-full "></div>
            <p className="font-normal">
              到 SITCON 攤位請工作人員掃描在個人頁面的 QR code
            </p>
          </div>

          <div className="reward-list-content">
            <div className="w-[0.625rem] h-[0.625rem] bg-gray-300 rounded-full "></div>
            <p className="font-normal ">待工作人員確認完畢後，即可現場領獎！</p>
          </div>
        </div>
      </div>
    </div>
  );
}
