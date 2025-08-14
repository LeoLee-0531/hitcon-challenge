// app/recruit/page.tsx
import React from 'react';
import Link from 'next/link';

type Team = {
  id: string;
  name: string;
  deadline: string;
  headcount?: string;
  formUrl: string;
  duties: string[];
  preferred?: string[];
  process?: string[];
  techStack?: string[]; // 給「開發組」的技術清單
  notes?: string[];
  dancingManImgs?: string[];
};

const TEAMS: Team[] = [
  {
    id: 'logistics',
    name: '場務組',
    deadline: '2025/08/29',
    // headcount: "餐飲股 6 人、機動股 25 人、報到股 8 人、物流股 2 人",
    headcount: '餐飲股 6人 機動股 25人 報到股 8人 物流股 2人',
    formUrl: 'https://forms.gle/wSrobrMkV1WwZsYv7',
    duties: [
      '餐飲股：餐飲的訂購和運送',
      '機動股：在其他股/組人力不足時協助',
      '報到股：報到處門票的檢驗和東西發放',
      '物流股：物品於會場和倉庫間的流動',
    ],
    preferred: [
      '場務組主要負責年會當天場地相關事務，只需有足夠熱忱和遇到突發情況的判斷能力，是 SITCON 工人入門門檻較低、且收人數最多的組別，非常歡迎新人加入！',
    ],
    notes: ['* 實際工作內容依不同股別略有差異'],
    dancingManImgs: ['/dancingMan/11.png', '/dancingMan/12.png', '/dancingMan/13.png', '/dancingMan/14.png'],
  },
  {
    id: 'marketing',
    name: '行銷組',
    deadline: '2025/08/18',
    headcount: '8 人',
    formUrl: 'https://forms.gle/qkao1Xc4VfSqWrft6',
    duties: ['撰寫贊助提案', '聯絡廠商與媒體', '年會當日協助贊助商與媒體接待'],
    preferred: ['對行銷與商務往來有興趣', '擅長寫 Email、喜歡溝通與談判'],
    dancingManImgs: ['/dancingMan/21.png', '/dancingMan/22.png'],
  },
  {
    id: 'design',
    name: '設計組',
    deadline: '2025/08/22',
    headcount: '10 人',
    formUrl: 'https://forms.gle/kTA4viUGP8Pvr2ic7',
    duties: [
      '年會主視覺、週邊等平面設計',
      '製作動畫與社群圖像',
      '與場務、開發、編輯密切合作設計需求',
    ],
    preferred: [
      '會使用 Illustrator / Figma / Photoshop 等設計軟體',
      '有作品集尤佳',
    ],
    process: [
      '即日起 ~ 8/16（六） 報名截止',
      '8/17（日）~ 8/19（二） 書審',
      '8/20（三）前寄送通過 / 未通過信件',
      '8/21（四）~ 8/28（四）面試',
      '8/30（六）前寄送錄取 / 未錄取信件',
    ],
    dancingManImgs: ['/dancingMan/31.png', '/dancingMan/32.png', '/dancingMan/33.png', '/dancingMan/34.png'],
  },
  {
    id: 'dev',
    name: '開發組',
    deadline: '2025/08/25',
    headcount: '約 3 人',
    formUrl: 'https://forms.gle/o7he9cJio8ZMCJUo7',
    duties: [
      '官網、CFP 系統、大地遊戲系統開發',
      '使用技術（舉例）：HTML / CSS / JS；可能會用到：Astro、Fastify、Three.js、Figma',
    ],
    preferred: [
      '熟悉 Web 開發（不只能下 prompt，願意理解背後邏輯）',
      '熟悉 Git 協作',
      '願意投入時間精力一起幹大事',
    ],
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Astro',
      'Fastify',
      'Three.js',
      'Figma',
    ],
    dancingManImgs: ['/dancingMan/41.png', '/dancingMan/42.png'],
  },
  {
    id: 'record',
    name: '紀錄組',
    deadline: '2025/08/20',
    headcount: '10 人',
    formUrl: 'https://forms.gle/ymexPU8J99Hsc9AN9',
    duties: [
      '年會當天拍攝議程、互動、攤位等',
      '活動前參與培訓，後期協助修圖與整理',
    ],
    preferred: [
      '有攝影經驗與基礎器材',
      '具備構圖與調色概念',
      '會使用 Lightroom / Photoshop 或剪輯軟體者尤佳',
    ],
    dancingManImgs: ['/dancingMan/0300_2s.png'],
  },
];

export default function RecruitPage() {
  return (
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
              <h1 className="text-3xl sm:text-4xl md:text-4.5xl font-bold">
                SITCON 2026 <br />
                工作人員招募資訊
              </h1>
              <p className="mt-2 text-sm text-emerald-300/80">
                歡迎加入籌備團隊！下方表格含截止日期、招募名額、表單連結與工作內容。
              </p>
            </header>

            {/* Cards (mobile) */}
            <section className="md:hidden space-y-4">
              {TEAMS.map((t) => (
                <article
                  key={t.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{t.name}</h2>
                      <div className="flex items-center gap-2">
                        {t.dancingManImgs && (
                          <div className="flex">
                            {t.dancingManImgs.map((src, idx) => (
                              <img
                                key={idx}
                                src={src}
                                alt={`dancingMan-${t.id}-${idx}`}
                                className="h-7 object-contain rounded-md bg-black/10"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Badge>{t.deadline}</Badge>
                      <ExternalLink href={t.formUrl}>{'報名表單'}</ExternalLink>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {t.headcount && (
                      <Row label="招募人數">
                        <span className="text-gray-200">{t.headcount}</span>
                      </Row>
                    )}

                    <Row label="工作內容">
                      <BulletList items={t.duties} />
                    </Row>

                    {t.preferred && t.preferred.length > 0 && (
                      <Row label="推薦條件">
                        <BulletList items={t.preferred} />
                      </Row>
                    )}

                    {t.process && t.process.length > 0 && (
                      <Row label="招募流程">
                        <BulletList items={t.process} />
                      </Row>
                    )}

                    {t.techStack && t.techStack.length > 0 && (
                      <Row label="技術 / 工具">
                        <TagList items={t.techStack} />
                      </Row>
                    )}

                    {t.notes && t.notes.length > 0 && (
                      <Row label="備註">
                        <BulletList items={t.notes} />
                      </Row>
                    )}
                  </div>
                </article>
              ))}
              <div className="mt-6 text-center">
                <Link
                  href="#top"
                  className="text-sm text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
                >
                  ⬆️ 回頂端
                </Link>
              </div>
            </section>

            {/* Table (md+) */}
            <section className="hidden md:block">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full border-collapse">
                  <thead className="bg-emerald-900/30">
                    <tr>
                      <Th className="w-[80px]">組別</Th>
                      <Th className="w-[100px]">截止日期</Th>
                      <Th className="w-[110px]">招募人數</Th>
                      <Th>工作內容</Th>
                      <Th>推薦條件 / 流程 / 技術</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {TEAMS.map((t, idx) => (
                      <tr
                        key={t.id}
                        className={
                          idx % 2 === 0 ? 'bg-white/0' : 'bg-white/[0.03]'
                        }
                      >
                        <Td>
                          <div className="font-semibold">{t.name}</div>
                          {/* dancingMan 圖片 */}
                          {t.dancingManImgs && (
                            <div className="flex mt-2 justify-center">
                              {t.dancingManImgs.map((src, idx) => (
                                <img
                                  key={idx}
                                  src={src}
                                  alt={`dancingMan-${t.id}-${idx}`}
                                  className="h-5 object-contain rounded-md bg-black/10"
                                />
                              ))}
                            </div>
                          )}
                        </Td>
                        <Td>
                          <div className="flex flex-col gap-2">
                            <Badge>{t.deadline}</Badge>
                            <ExternalLink href={t.formUrl}>
                              {'報名表單'}
                            </ExternalLink>
                          </div>
                        </Td>
                        <Td>
                          <span className="text-gray-200">
                            {t.headcount ?? '—'}
                          </span>
                        </Td>
                        <Td>
                          <BulletList items={t.duties} />
                        </Td>
                        <Td>
                          <div className="space-y-3">
                            {t.preferred && t.preferred.length > 0 && (
                              <section>
                                <h4 className="mb-1 text-xs font-semibold text-emerald-300/90">
                                  推薦條件
                                </h4>
                                <BulletList items={t.preferred} />
                              </section>
                            )}
                            {t.process && t.process.length > 0 && (
                              <section>
                                <h4 className="mb-1 text-xs font-semibold text-emerald-300/90">
                                  招募流程
                                </h4>
                                <BulletList items={t.process} />
                              </section>
                            )}
                            {t.techStack && t.techStack.length > 0 && (
                              <section>
                                <h4 className="mb-1 text-xs font-semibold text-emerald-300/90">
                                  技術 / 工具
                                </h4>
                                <TagList items={t.techStack} />
                              </section>
                            )}
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* <div className="mt-4 text-right">
            <Link
              href="#top"
              className="text-sm text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
            >
              ⬆️ 回頂端
            </Link>
          </div> */}
            </section>
          </div>
        </main>
      </div>
      <div className="xl:col-span-2 col-span-1" />
    </div>
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
    <span className="inline-flex items-center rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-200 ring-1 ring-inset ring-emerald-400/30">
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
