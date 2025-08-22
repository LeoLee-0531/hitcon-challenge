// app/recruit/page.tsx
import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

type Team = {
  id: string;
  deadline: string;
  formUrl: string;
  dancingManImgs?: string[];
};

const TEAMS: Team[] = [
  {
    id: 'logistics',
    deadline: '2025/08/29',
    formUrl: 'https://forms.gle/wSrobrMkV1WwZsYv7',
    dancingManImgs: [
      '/dancingMan/11.png',
      '/dancingMan/12.png',
      '/dancingMan/13.png',
      '/dancingMan/14.png',
    ],
  },
  {
    id: 'marketing',
    deadline: '2025/08/18',
    formUrl: 'https://forms.gle/qkao1Xc4VfSqWrft6',
    dancingManImgs: ['/dancingMan/21.png', '/dancingMan/22.png'],
  },
  {
    id: 'design',
    deadline: '2025/08/22',
    formUrl: 'https://forms.gle/kTA4viUGP8Pvr2ic7',
    dancingManImgs: [
      '/dancingMan/31.png',
      '/dancingMan/32.png',
      '/dancingMan/33.png',
      '/dancingMan/34.png',
    ],
  },
  {
    id: 'dev',
    deadline: '2025/08/25',
    formUrl: 'https://forms.gle/o7he9cJio8ZMCJUo7',
    dancingManImgs: ['/dancingMan/41.png', '/dancingMan/42.png'],
  },
  {
    id: 'record',
    deadline: '2025/08/20',
    formUrl: 'https://forms.gle/ymexPU8J99Hsc9AN9',
    dancingManImgs: ['/dancingMan/0300_2s.png'],
  },
];

export default function RecruitPage() {
  const t = useTranslations('recruitment');

  // 函數：根據團隊ID獲取翻譯後的團隊信息
  const getTeamInfo = (teamId: string) => {
    return {
      name: t(`teams.${teamId}.name`),
      headcount: t(`teams.${teamId}.headcount`),
      duties: t.raw(`teams.${teamId}.duties`),
      preferred: t.raw(`teams.${teamId}.preferred`),
      process: t.raw(`teams.${teamId}.process`),
      techStack: t.raw(`teams.${teamId}.techStack`),
      notes: t.raw(`teams.${teamId}.notes`),
    };
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="xl:col-span-2 col-span-1" />
        <div className="xl:col-span-8 col-span-10">
          <main
            id="top"
            className="min-h-screen w-full bg-[#121712] text-white my-12"
          >
            <div className="mx-auto max-w-6xl px-4 py-8 mb-8">
              {/* Header */}
              <header className="mb-8 py-15 text-center">
                <h1
                  className="text-3xl sm:text-4xl md:text-4.5xl font-bold"
                  dangerouslySetInnerHTML={{ __html: t('title') }}
                />
                <p className="mt-2 text-sm text-emerald-300/80">
                  {t('subtitle')}
                </p>
              </header>

              {/* Cards (mobile) */}
              <section className="md:hidden space-y-4">
                {TEAMS.map((team) => {
                  const teamInfo = getTeamInfo(team.id);
                  return (
                    <article
                      key={team.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-semibold">
                            {teamInfo.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            {team.dancingManImgs && (
                              <div className="flex">
                                {team.dancingManImgs.map((src, idx) => (
                                  <img
                                    key={idx}
                                    src={src}
                                    alt={`dancingMan-${team.id}-${idx}`}
                                    className="h-6 object-contain rounded-md bg-black/10"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-1">
                          <Badge>{team.deadline}</Badge>
                          <ExternalLink href={team.formUrl}>
                            {t('formBtn')}
                          </ExternalLink>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {teamInfo.headcount && (
                          <Row label={t('headcount')}>
                            <span className="text-gray-200">
                              {teamInfo.headcount}
                            </span>
                          </Row>
                        )}

                        <Row label={t('duties')}>
                          <BulletList items={teamInfo.duties} />
                        </Row>

                        {teamInfo.preferred &&
                          teamInfo.preferred.length > 0 && (
                            <Row label={t('preferred')}>
                              <BulletList items={teamInfo.preferred} />
                            </Row>
                          )}

                        {teamInfo.process && teamInfo.process.length > 0 && (
                          <Row label={t('process')}>
                            <BulletList items={teamInfo.process} />
                          </Row>
                        )}

                        {teamInfo.techStack &&
                          teamInfo.techStack.length > 0 && (
                            <Row label={t('techStack')}>
                              <TagList items={teamInfo.techStack} />
                            </Row>
                          )}

                        {teamInfo.notes && teamInfo.notes.length > 0 && (
                          <Row label={t('notes')}>
                            <BulletList items={teamInfo.notes} />
                          </Row>
                        )}
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Table (md+) */}
              <section className="hidden md:block">
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full border-collapse">
                    <thead className="bg-emerald-900/30">
                      <tr>
                        <Th className="w-[80px]">{t('colTeam')}</Th>
                        <Th className="w-[100px]">{t('colDeadline')}</Th>
                        <Th className="w-[110px]">{t('colHeadcount')}</Th>
                        <Th>{t('colDuties')}</Th>
                        <Th>{t('colOthers')}</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {TEAMS.map((team, idx) => {
                        const teamInfo = getTeamInfo(team.id);
                        return (
                          <tr
                            key={team.id}
                            className={
                              idx % 2 === 0 ? 'bg-white/0' : 'bg-white/[0.03]'
                            }
                          >
                            <Td>
                              <div className="font-semibold">
                                {teamInfo.name}
                              </div>
                              {/* dancingMan 圖片 */}
                              {team.dancingManImgs && (
                                <div className="flex mt-2 justify-center">
                                  {team.dancingManImgs.map((src, idx) => (
                                    <img
                                      key={idx}
                                      src={src}
                                      alt={`dancingMan-${team.id}-${idx}`}
                                      className="h-5 object-contain rounded-md bg-black/10"
                                    />
                                  ))}
                                </div>
                              )}
                            </Td>
                            <Td>
                              <div className="flex flex-col gap-2">
                                <Badge>{team.deadline}</Badge>
                                <ExternalLink href={team.formUrl}>
                                  {t('formBtn')}
                                </ExternalLink>
                              </div>
                            </Td>
                            <Td>
                              <span className="text-gray-200">
                                {teamInfo.headcount ?? t('noData')}
                              </span>
                            </Td>
                            <Td>
                              <BulletList items={teamInfo.duties} />
                            </Td>
                            <Td>
                              <div className="space-y-3">
                                {teamInfo.preferred &&
                                  teamInfo.preferred.length > 0 && (
                                    <section>
                                      <h4 className="mb-1 text-xs font-semibold text-emerald-300/90">
                                        {t('preferred')}
                                      </h4>
                                      <BulletList items={teamInfo.preferred} />
                                    </section>
                                  )}
                                {teamInfo.process &&
                                  teamInfo.process.length > 0 && (
                                    <section>
                                      <h4 className="mb-1 text-xs font-semibold text-emerald-300/90">
                                        {t('process')}
                                      </h4>
                                      <BulletList items={teamInfo.process} />
                                    </section>
                                  )}
                                {teamInfo.techStack &&
                                  teamInfo.techStack.length > 0 && (
                                    <section>
                                      <h4 className="mb-1 text-xs font-semibold text-emerald-300/90">
                                        {t('techStack')}
                                      </h4>
                                      <TagList items={teamInfo.techStack} />
                                    </section>
                                  )}
                              </div>
                            </Td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

/* ---------- 小元件 ---------- */

function Th({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th
      className={`px-4 py-3 text-left text-sm font-semibold text-emerald-200 tracking-wide ${className}`}
      scope="col"
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <td className={`align-top px-4 py-4 text-sm text-gray-100 ${className}`}>
      {children}
    </td>
  );
}

function Badge({ children }: React.PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-md bg-emerald-500/20 px-2 py-1 text-sm font-medium text-emerald-200 ring-1 ring-inset ring-emerald-400/30">
      {children}
    </span>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex w-[100px] items-center gap-1 rounded-lg border border-emerald-400/40 px-3 py-1 text-emerald-300 hover:bg-emerald-500/10"
    >
      <span className="text-sm">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5 fill-current opacity-80"
      >
        <path d="M14 3h3a1 1 0 0 1 1 1v3h-2V6.414l-6.293 6.293-1.414-1.414L14.586 5H14V3ZM4 5h5v2H6v7h7v-3h2v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      </svg>
    </a>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-gray-100">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <span
          key={i}
          className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-gray-100 ring-1 ring-inset ring-white/15"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Row({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="rounded-lg bg-white/5 p-3 ring-1 ring-inset ring-white/10">
      <div className="text-xs font-semibold text-emerald-300/90">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}
