'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutSITCONPage() {
  const t = useTranslations('about');
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="sm:col-span-2 col-span-1" />
      <div className="sm:col-span-8 col-span-10">
        <div className="bg-[#121712] flex flex-col items-center py-20 my-12 px-6">
          {/* SITCON 2026 info */}
          <section className="w-full text-center mb-20 mt-4">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-white font-sans mb-0">
                {t('title')}
              </h1>
              <a
                href="https://sitcon.org/2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-13 lg:h-13 flex items-center justify-center rounded-full bg-[#0DF20D] shadow hover:opacity-80 transition"
              >
                <img
                  src="/hyperlink.png"
                  alt={t('linkAlt')}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                />
              </a>
            </div>
            <span className="block mt-1 text-xl text-[#ACD997] font-medium">
              {t('venue')}
            </span>
            <div className="text-base text-[#ACD997] font-medium mb-1">
              {t('date')}
            </div>
          </section>

          {/* About SITCON */}
          <section className="w-full max-w-3xl bg-white/5 rounded-xl shadow px-6 py-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
              {t('aboutTitle')}
            </h2>
            <p className="text-base text-gray-200 font-light leading-relaxed">
              {t('aboutDesc1')}
              <br className="hidden sm:block" />
              {t('aboutDesc2')}
            </p>
          </section>

          {/* Code of Conduct */}
          <section className="w-full max-w-3xl bg-white/5 rounded-xl shadow px-6 py-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
              {t('cocTitle')}
            </h2>
            <p className="text-base text-gray-200 font-light leading-relaxed mb-1">
              {t('cocDesc1')}
              <a
                href="https://sitcon.org/code-of-conduct/"
                className="text-[#0DF20D] font-semibold underline hover:opacity-80 transition"
              >
                {t('cocLinkText')}
              </a>
              {t('cocDesc2')}
            </p>
          </section>

          {/* Join the community */}
          <section className="w-full max-w-3xl bg-white/5 rounded-xl shadow px-6 py-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">
              {t('joinTitle')}
            </h2>
            <p className="text-base text-gray-200 font-light leading-relaxed mb-2">
              {t('joinDesc1')}
              <a
                href="https://groups.google.com/g/sitcon-general/"
                className="text-[#0DF20D] font-semibold underline hover:opacity-80 transition"
              >
                {t('joinMailText')}
              </a>
              {t('joinDesc2')}
            </p>
            <p className="text-base text-gray-200 font-light leading-relaxed">
              {t('joinDesc3')}
              <a
                href="https://gitlab.com/sitcon-tw"
                className="text-[#0DF20D] font-semibold underline hover:opacity-80 transition"
              >
                GitLab
              </a>
              {t('joinDesc4')}
            </p>
          </section>

          {/* Footer note */}
          <div className="w-full max-w-3xl mt-4 text-base text-gray-300 font-light italic text-center">
            {t('footerNote')}
          </div>
        </div>
      </div>
      <div className="sm:col-span-2 col-span-1" />
    </div>
  );
}
