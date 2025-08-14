'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

interface EventDescriptionProps {
  isMobile: boolean;
}

export default function EventDescription({ isMobile }: EventDescriptionProps) {
  const t = useTranslations('');
  return (
    <div
      className={`glass-container shadow-md ${isMobile ? 'w-full p-4' : ''}`}
    >
      <div>
        <div className="event-title font-bold">活動說明</div>
        <p className="event-content font-light">
          在 HITCON 攤位，SITCON 將帶來一場結合技術、趣味與創意的「闖關挑戰」！
          總共七道關卡，從現場尋找 Flag 到破解 Prompt Injection、Python Jail
          等，關關精彩！
        </p>
      </div>
      <div>
        <div className="event-title font-bold">參加方式</div>
        <div className="event-list">
          <div className="event-list-content">
            <img className="event-icon" src="/head.svg"></img>
            <p className="event-content font-normal ">
              使用 Google 帳號登入參加活動
            </p>
          </div>
          <div className="event-list-content">
            <img className="event-icon" src="/flag.svg"></img>
            <p className="event-content font-normal ">
              每關輸入正確的 Flag 即可通關
            </p>
          </div>
          <div className="event-list-content">
            <img className="event-icon" src="/prize.svg"></img>
            <p className="event-content font-normal ">
              完成 3、5、7 關可獲得不同等級獎勵
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
