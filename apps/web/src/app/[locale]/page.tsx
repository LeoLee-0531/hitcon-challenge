// import { useTranslations } from 'next-intl';
import Link from 'next/link';


export default function Home() {
  // const t = useTranslations('home');
  // const tCommon = useTranslations('common');

  return (
    // 範例程式碼，開發時請替換成實際內容
    <>
      <main className="bg-[#121712] overflow-y-scroll min-h-screen flex flex-col items-center pb-[3.75rem]">
        <div className="absolute top-0 left-0 w-[120rem] h-[5.875rem] pt-[1.875rem] z-[3] flex flex-col items-center">
          {/* Navbar Container */}
          <div className="w-[71.875rem] h-[4rem] px-[2.5rem] py-[0.75rem] bg-black/0.001 shadow-md rounded-full flex items-center justify-between">
            
            {/* Logo 區塊 */}
            <div className="w-[8.875rem] h-[1.875rem] flex flex-col justify-center">
              {/* 可放置 SVG 或圖片 */}
              <div className="w-[6.25rem] h-[1.875rem] relative">
                
                <img src="/logo.svg"></img>
              </div>
            </div>

            {/* 導覽連結 */}
            <div className="flex gap-[3.125rem] h-[1.3125rem] items-start">
              <div className="text-[0.875rem] leading-[1.3125rem] text-white font-normal font-['Noto Sans TC']">
                闖關地圖
              </div>
              <div className="text-[0.875rem] leading-[1.3125rem] text-white font-medium font-['Space Grotesk']">
                關於 SITCON
              </div>
              <div className="text-[0.875rem] leading-[1.3125rem] text-white font-medium font-['Space Grotesk']">
                SITCON 工人招募
              </div>
            </div>

            {/* 語言切換與登入 */}
            <div className="flex gap-[1rem] items-start">
              {/* Language Button */}
              <div className="w-[3.125rem] h-[2.5rem] px-[1rem] bg-[#214A21] rounded-md flex justify-center items-center">
                <span className="text-white text-[0.875rem] leading-[1.3125rem] font-bold text-center font-['Space Grotesk']">EN</span>
              </div>

              {/* Login Button */}
              <div className="w-[4.75rem] h-[2.5rem] px-[1.5rem] bg-[#214A21] rounded-md flex justify-center items-center">
                <span className="text-white text-[0.875rem] leading-[1.3125rem] font-bold text-center font-['Space Grotesk']">登入</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center py-[150px] gap-5 w-[680px] h-[462px]'>
          <h1 className="w-[687px] h-[64px] font-bold leading-[64px] text-6xl text-center text-[#0DF20D]">SITCON X HITCON 2025</h1>
          <h3 className='w-[300px] h-[30px] font-bold leading-[30px] text-3xl text-[#8FCC8F] font-[\"Noto Sans TC\"]'>駭客挑戰，限時開啟！</h3>
          <div className='flex flex-row flex-wrap justify-center items-center content-center w-[400px] h-[28px] gap-x-6 gap-y-0'>
            <div className='flex items-center gap-2 w-[7.125rem] h-[1.75rem]'>
              <img className="h-5 w-5" src="/calander.svg" ></img>
              <h4 className='font-[\"Geist\"] font-light text-lg  text-white'>8/15–8/16</h4>
            </div>
            <div className='flex items-center gap-2 w-[15.5625rem] h-[1.75rem]'>
              <img className="h-5 w-5" src="/map.svg" ></img>
              <h4 className='font-light text-lg text-white'>中央研究院 人文社會科學館</h4>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[40.375rem] h-[5.1875rem] pb-10">
          <h2 className="flex items-center justify-center w-[40.375rem] h-[2.6875rem] font-bold text-[2.25rem] leading-[2.7rem] text-[#D1D5DB] font-space-grotesk text-center">
          挑戰七道關卡，贏得 SITCON 限定好禮！
          </h2>
        </div>
        <div className='flex flex-col items-center gap-[3.25rem] w-[51.25rem] h-[72.375rem]'>
          <div
            className='flex flex-col items-start p-[3.75rem] w-[51.25rem] h-[33rem] rounded-[0.9375rem] shadow-md'
            style={{
              background: 'linear-gradient(180deg, rgba(143, 204, 143, 0.08) 0%, rgba(71, 102, 71, 0.08) 100%)',
              border: '1px solid rgba(143, 204, 143, 0.56)',
              boxSizing: 'border-box'
            }}>
            <div className='flex flex-col items-start pb-[3.75rem] gap-[0.75rem] w-[43.75rem] h-[13.125rem]'>
              <h2 className='w-[56rem] h-[3rem] text-[2rem] leading-[150%] font-bold text-[#8FCC8F] font-[\"Space Grotesk\"]'>
                活動說明 
              </h2>
              <p className='w-[43.75rem] h-[5.625rem] text-[1.25rem] leading-[150%] font-normal text-[#E3E3E3]'>
                在 HITCON 攤位，SITCON 將帶來一場結合技術、趣味與創意的「闖關挑戰」！
                總共七道關卡，從現場尋找 Flag 到破解 Prompt Injection、Python Jail 等，關關精彩！
              </p>
            </div>
            <div className='flex flex-col items-start gap-[0.75rem] w-[43.75rem] h-[12.375rem]'>
              <h2 className='w-[8rem] h-[3rem] text-[2rem] leading-[3rem] font-bold text-[#8FCC8F] font-[\"Space Grotesk\"]'>
                參加方式 
              </h2>
              <div className='flex flex-col items-start gap-[0.1875rem] w-[22.1875rem] h-[8.625rem]'>
                <div className='flex flex-row items-center w-[30rem] h-[2.75rem]'>
                  <img className="h-6 w-6" src="/head.svg" ></img>
                  <p className='pl-2 w-[20rem] h-[1.875rem] text-[1.25rem] leading-[1.875rem] font-normal text-[#E6E8EB]'>
                    使用 Google 帳號登入參加活動
                  </p>
                </div>
                <div className='flex flex-row items-center w-[30rem] h-[2.75rem]'>
                  <img className="h-6 w-6" src="/flag.svg" ></img>
                  <p className='pl-2 w-[20rem] h-[1.875rem] text-[1.25rem] leading-[1.875rem] font-normal text-[#E6E8EB]'>
                    每關輸入正確的 Flag 即可通關
                  </p>
                </div>
                <div className='flex flex-row items-center w-[30rem] h-[2.75rem]'>
                  <img className="h-6 w-6" src="/prize.svg" ></img>
                  <p className='pl-2 w-[26rem] h-[1.875rem] text-[1.25rem] leading-[1.875rem] font-normal text-[#E6E8EB]'>
                    完成 3、5、7 關可獲得不同等級獎勵
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start gap-7.5 w-[51.25rem] h-[36.125rem] p-[3rem_5rem] 
         bg-[rgba(143,204,143,0.08)] border border-[rgba(143,204,143,0.56)] 
         shadow-md rounded-[0.9375rem]'>
            <div className='flex flex-col items-start gap-2.5 w-[41.25rem] h-[5rem]'>
              <h2 className="w-[56rem] h-[2.5rem] font-extrabold text-[2rem] leading-[2.5rem] tracking-[-0.015625rem] text-[#8FCC8F] flex-none grow-0">
                兌獎說明
              </h2>
              <p className="w-[40.4375rem] h-[1.875rem] font-normal text-[1.25rem] leading-[1.875rem] text-[#E3E3E3] flex-none grow-0">
                挑戰成功後，即可至 SITCON 攤位兌換獎勵！獎品有限，兌完為止！
              </p>
            </div>
            <div className='flex flex-col items-start gap-[0.625rem] w-[41.25rem] h-[13.125rem] flex-none self-stretch grow-0'>
              <h3 className='w-[41.25rem] h-[1.875rem] font-noto font-bold text-[1.5rem] leading-[1.875rem] text-[#8FCC8F] flex-none self-stretch grow-0'>
                獎勵分級制度
              </h3>

                <div className="flex flex-row justify-center items-start gap-[0.625rem] w-[41.25rem] h-[8.125rem] flex-none self-stretch grow-0">
                  <div className="border border-[rgba(61,87,61,0.56)] flex flex-col justify-center items-center py-[1.875rem] gap-[0.625rem] w-[13.333rem] h-[8.125rem] bg-[rgba(2,14,2,0.57)] rounded-[1.25rem] flex-none grow">
                    <p className="w-[3.75rem] h-[1.875rem] font-space font-bold text-[2rem] leading-[1.875rem] text-[#0DF20D] flex-none grow-0">
                      3 關
                    </p>
                    <p className="w-[3.75rem] h-[1.875rem] font-space font-bold text-[1.25rem] leading-[1.875rem] text-[#0DF20D] flex-none1 grow-0">
                      一級獎
                    </p>
                  </div>
                  <div className="border border-[rgba(61,87,61,0.56)] flex flex-col justify-center items-center py-[1.875rem] gap-[0.625rem] w-[13.333rem] h-[8.125rem] bg-[rgba(2,14,2,0.57)] rounded-[1.25rem] flex-none grow">
                    <p className="w-[3.75rem] h-[1.875rem] font-space font-bold text-[2rem] leading-[1.875rem] text-[#F2CC0D] flex-none r-0 grow-0">
                      5 關
                    </p>
                    <p className="w-[3.75rem] h-[1.875rem] font-space font-bold text-[1.25rem] leading-[1.875rem] text-[#F2CC0D] flex-none grow-0">
                      二級獎
                    </p>
                  </div>
                  <div className="border border-[rgba(61,87,61,0.56)] flex flex-col justify-center items-center py-[1.875rem] gap-[0.625rem] w-[13.333rem] h-[8.125rem] bg-[rgba(2,14,2,0.57)] rounded-[1.25rem] flex-none order-2 grow">
                    <p className="w-[3.625rem] h-[1.875rem] font-space font-bold text-[2rem] leading-[1.875rem] text-[#E07393] flex-noneo grow-0">
                      7 關
                    </p>
                    <p className="w-[3.75rem] h-[1.875rem] font-space font-bold text-[1.25rem] leading-[1.875rem] text-[#E07393] flex-none  grow-0">
                      三級獎
                    </p>
                  </div>
                </div>
                <p className="w-[41.25rem] h-[1.875rem] font-space font-light text-[1rem] leading-[1.875rem] text-center text-[#E3E3E3] flex-none order-2 self-stretch grow-0">
                  每人限領一次獎勵，不可重複領取
                </p>
            </div>
            <div className="flex flex-col items-start gap-2.5 w-[56rem] h-[8.25rem] order-2">
              <div className="flex flex-row justify-center items-center gap-2.5 w-[12.4375rem] h-[1.875rem] order-0">
                <h3 className="w-[12.4375rem] h-[1.875rem] font-space font-bold text-[1.5rem] leading-[1.875rem] text-[#8FCC8F] order-0">
                  兌獎流程
                </h3>
              </div>

              <div className="flex flex-col items-start p-0 w-[31.5rem] h-[5.75rem] order-1">
  
                <div className="flex flex-row items-center gap-2.5 py-[0.5rem] w-[31.5rem] h-[2.875rem] order-0">

                  <div className="w-[0.625rem] h-[0.625rem] bg-gray-300 rounded-full order-0"></div>
                  <p className="font-space font-normal text-[1.25rem] leading-[1.875rem] text-[#D1D5DB] order-1">
                    到 SITCON 攤位請工作人員掃描在個人頁面的 QR code
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2.5 py-[0.5rem] w-[23.75rem] h-[2.875rem] order-1">
                  <div className="w-[0.625rem] h-[0.625rem] bg-gray-300 rounded-full order-0"></div>
                  <p className="font-space font-normal text-[1.25rem] leading-[1.875rem] text-[#D1D5DB] order-1">
                    待工作人員確認完畢後，即可現場領獎！
                  </p>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </main>
    </>
  );
}
