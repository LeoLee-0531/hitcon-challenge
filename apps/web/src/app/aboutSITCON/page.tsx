import React from "react";

export default function AboutSITCONPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1A2316] to-[#121712] flex flex-col items-center py-12 px-4">
      {/* SITCON 2026 info */}
      <section className="w-full max-w-3xl mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 font-sans">
          📢 SITCON 2026
          <span className="block mt-1 text-lg text-[#ACD997] font-medium">
            @ 中央研究院人文社會科學館
          </span>
        </h1>
        <div className="text-base text-[#ACD997] font-medium mb-1">
          2026 / 3 / 28 ( Sat. )
        </div>
      </section>

      {/* About SITCON */}
      <section className="w-full max-w-3xl bg-white/5 rounded-xl shadow px-6 py-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">關於 SITCON</h2>
        <h3 className="text-lg text-[#9CA3AF] mb-3">About SITCON</h3>
        <p className="text-base text-gray-200 font-light leading-relaxed">
          學生計算機年會（Students’ Information Technology Conference）自 2012 年發起，
          以學生為本、由學生自發舉辦，長期投身學生資訊教育與推廣開源精神，
          希望引領更多學子踏入資訊的殿堂。<br className="hidden sm:block"/>
          也冀望所有對資訊有興趣的學生，能夠在年會齊聚一堂，彼此激盪、傳承、啟發，
          實踐「學以致用、教學相長」的理念。
        </p>
      </section>

      {/* Code of Conduct */}
      <section className="w-full max-w-3xl bg-white/5 rounded-xl shadow px-6 py-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">行為準則</h2>
        <h3 className="text-lg text-[#9CA3AF] mb-3">Code of Conduct</h3>
        <p className="text-base text-gray-200 font-light leading-relaxed mb-1">
          SITCON 歡迎不同身分、來自不同背景的與會者，也非常鼓勵女性、性少數與多元背景的參與者。
          為了讓大家都能愉快的參加 SITCON，我們要求所有參與者閱讀年會的{" "}
          <a
            href="#"
            className="text-[#0DF20D] font-semibold underline hover:opacity-80 transition"
          >
            行為準則（Code of Conduct）
          </a>
          ，共同創造一個友善的環境。
        </p>
      </section>

      {/* Join the community */}
      <section className="w-full max-w-3xl bg-white/5 rounded-xl shadow px-6 py-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">參與討論</h2>
        <h3 className="text-lg text-[#9CA3AF] mb-3">Join the community</h3>
        <p className="text-base text-gray-200 font-light leading-relaxed mb-2">
          SITCON 是個開放的社群，許多籌備相關事項都會在公開的{" "}
          <a
            href="#"
            className="text-[#0DF20D] font-semibold underline hover:opacity-80 transition"
          >
            郵件論壇
          </a>
          {" "}上討論。如果你有興趣參與，歡迎訂閱 SITCON 的郵件論壇並貢獻你的想法；
          如果想成為明年年會的籌備團隊，可以查看 SITCON 工人招募頁面！
        </p>
        <p className="text-base text-gray-200 font-light leading-relaxed">
          若你想進一步了解 SITCON 年會籌備與討論內容，歡迎到{" "}
          <a
            href="#"
            className="text-[#0DF20D] font-semibold underline hover:opacity-80 transition"
          >
            GitLab
          </a>
          {" "}上查看 SITCON 2026 的籌備歷程。
        </p>
      </section>

      {/* Footer note */}
      <div className="w-full max-w-3xl mt-4 text-base text-gray-300 font-light italic text-center">
        ＊這行文字內容好像被塞了些什麼神奇的東西
      </div>
    </div>
  );
}