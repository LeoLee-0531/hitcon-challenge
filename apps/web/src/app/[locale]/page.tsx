import { useTranslations } from 'next-intl';
import { Calendar, MapPin, User, Shield, Trophy } from 'lucide-react';

export default function Home() {
  const t = useTranslations('home');
  const tHero = useTranslations('home.hero');
  const tEvent = useTranslations('home.eventDescription');
  const tReward = useTranslations('home.rewardDescription');

  return (
    <>
      <div className="relative z-10 flex flex-col gap-6 md:gap-[3.25rem] px-4 md:px-8 pb-[100px]">
        {/* Banner */}
        <div className="front-hero flex-col-center">
          <div
            className="front-hero-title font-bold"
          >
            {tHero('title')}
          </div>

          <div className="front-hero-subtitle font-bold">{tHero('subtitle')}</div>

          <div className="flex-center flex-wrap gap-4 md:gap-8">
            <div className="flex-center">
              <Calendar className="front-hero-icon " />
              <div className="front-hero-content">{tHero('date')}</div>
            </div>

            <div className="flex-center">
              <MapPin className="front-hero-icon " />
              <div className="front-hero-content">{tHero('location')}</div>
            </div>
          </div>
        </div>
        <div className="flex-center">
          <div
            className="banner-content font-bold"
          >
            {t('title')}
          </div>
        </div>

        {/* Description */}
        <div
          className="glass-container shadow-md"
        >
          <div>
            <div className="event-title font-bold">{tEvent('title')}</div>
            <p className="event-content font-light">{tEvent('content')}</p>
          </div>
          <div>
            <div className="event-title font-bold">{tEvent('participationTitle')}</div>
            <div className="event-list">
              <div className="event-list-content">
                <User className="event-list-icon " />
                <p className="event-content font-normal ">{tEvent('login')}</p>
              </div>
              <div className="event-list-content">
                <Shield className="event-list-icon " />
                <p className="event-content font-normal ">{tEvent('flag')}</p>
              </div>
              <div className="event-list-content">
                <Trophy className="event-list-icon " />
                <p className="event-content font-normal ">{tEvent('rewards')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-container shadow-md">
          <div>
            <div className="event-title font-bold">{tReward('title')}</div>
            <p className="event-content font-light">{tReward('content')}</p>
          </div>
          <div className='w-full'>
            <p className="reward-title font-bold">{tReward('levelSystemTitle')}</p>
            <div
              className='flex flex-row gap-4 w-full'
            >
              <div className="reward-glass-container">
                <p className="reward-3 reward-level font-bold">{tReward('level1')}</p>
                <p className="reward-3 reward-prize font-bold">
                  {tReward('level1Prize')}
                </p>
              </div>
              <div className="reward-glass-container">
                <p className="reward-5 reward-level font-bold">{tReward('level2')}</p>
                <p className="reward-5 reward-prize font-bold">
                  {tReward('level2Prize')}
                </p>
              </div>
              <div className="reward-glass-container">
                <p className="reward-7 reward-level font-bold">{tReward('level3')}</p>
                <p className="reward-7 reward-prize font-bold">
                  {tReward('level3Prize')}
                </p>
              </div>
            </div>
            <p className="pt-2 font-light text-[1rem] text-center text-[#E3E3E3]">
              {tReward('limitNote')}
            </p>
          </div>
          <div>
            <div className="reward-title font-bold">
              {tReward('exchangeProcessTitle')}
            </div>

            <ul className="list-disc reward-list event-content pl-5">
              <li className="font-normal">{tReward('step1')}</li>
              <li className="font-normal">{tReward('step2')}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
