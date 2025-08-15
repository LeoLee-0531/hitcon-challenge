// components/BaseFooter.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import FacebookLogo from './logos/facebook';
import FlickrLogo from './logos/flickr';
import InstagramLogo from './logos/instagram';
import TelegramLogo from './logos/telegram';
import ThreadsLogo from './logos/threads';
import YoutubeLogo from './logos/youtube';
import SitconLogo from './logos/sitcon';

export default function BaseFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="space-y-7 bg-[#121712] px-5 pb-7 pt-4 text-white mobile:px-10 mobile:py-16 mobile:pt-16">
      {/* Divider */}
      <hr className="border-white pb-7 max-mobile:hidden" />

      {/* Responsive Layout */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2" />
        <div className="col-span-8 flex justify-between max-[700px]:block">
          {/* Desktop/tablet shows PastEvents + Contact, mobile shows Contact + PastEvents */}
          <div className="max-[700px]:hidden flex justify-between w-full">
            <span>
              <PastEvents />
            </span>
            <span>
              <Contact />
            </span>
          </div>
          <div className="min-[701px]:hidden">
            <Contact />
            <div className="py-3"></div>
            <PastEvents />
          </div>
        </div>
        <div className="col-span-2" />
      </div>

      {/* Social Media Links */}
      <SocialMediasSection />
    </footer>
  );
}

function PastEvents() {
  const t = useTranslations('footer');

  return (
    <FooterSubMenuGrid
      title={t('pastEvents')}
      links={[
        { text: '2013', href: 'https://sitcon.org/2013' },
        { text: '2014', href: 'https://sitcon.org/2014' },
        { text: '2015', href: 'https://sitcon.org/2015' },
        { text: '2016', href: 'https://sitcon.org/2016' },
        { text: '2017', href: 'https://sitcon.org/2017' },
        { text: '2018', href: 'https://sitcon.org/2018' },
        { text: '2019', href: 'https://sitcon.org/2019' },
        { text: '2020', href: 'https://sitcon.org/2020' },
        { text: '2021', href: 'https://sitcon.org/2021' },
        { text: '2022', href: 'https://sitcon.org/2022' },
        { text: '2024', href: 'https://sitcon.org/2024' },
        { text: '2025', href: 'https://sitcon.org/2025' },
      ]}
    />
  );
}

function Contact() {
  const t = useTranslations('footer');

  return (
    <FooterSubMenu
      title={t('contact')}
      links={[
        { text: 'contact@sitcon.org', href: 'mailto:contact@sitcon.org' },
      ]}
      internal={false}
    />
  );
}

function Brand() {
  return (
    <div className="flex flex-row gap-6 max-mobile:flex-col mobile:items-end">
      <SitconLogo height={60} width={200} />
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-end gap-2 max-[700px]:w-full max-[700px]:justify-between">
      <RadioLinkButton href="https://sitcon.org/fb" logo={<FacebookLogo />} />
      <RadioLinkButton
        href="https://sitcon.org/threads"
        logo={<ThreadsLogo />}
      />
      <RadioLinkButton href="https://sitcon.org/yt" logo={<YoutubeLogo />} />
      <RadioLinkButton
        href="https://sitcon.org/instagram"
        logo={<InstagramLogo />}
      />
      <RadioLinkButton href="https://sitcon.org/flickr" logo={<FlickrLogo />} />
      <RadioLinkButton href="https://sitcon.org/tg" logo={<TelegramLogo />} />
    </div>
  );
}

function SocialMediasSection() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-2" />
      <div className="col-span-8 flex justify-between items-end">
        <div className="max-[700px]:hidden">
          <Brand />
        </div>
        <SocialLinks />
      </div>
      <div className="col-span-2" />
    </div>
  );
}

interface LinkText {
  text: string;
  href: string;
}

function FooterSubMenu({
  title,
  links,
  internal,
}: {
  title: string;
  links: LinkText[];
  internal: boolean;
}) {
  return (
    <ul className="flex flex-col gap-2">
      <li className="mb-2 font-bold">{title}</li>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target={internal ? undefined : '_blank'}
            className="hover:opacity-70"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterSubMenuGrid({
  title,
  links,
}: {
  title: string;
  links: LinkText[];
}) {
  // 將 links 分成兩行
  const half = Math.ceil(links.length / 2);
  const firstRow = links.slice(0, half);
  const secondRow = links.slice(half);

  return (
    <ul>
      <p className="mb-4 font-bold">{title}</p>
      <ul className="flex flex-row flex-nowrap gap-3 text-center max-[1150px]:flex-col max-[1150px]:gap-1">
        <li>
          <ul className="flex flex-row flex-nowrap gap-3 text-center text-[14px] max-[1150px]:justify-between">
            {firstRow.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  className="inline-block hover:opacity-70 text-[14px]"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <ul className="flex flex-row flex-nowrap gap-3 text-center text-[14px] max-[1150px]:justify-between">
            {secondRow.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  className="inline-block hover:opacity-70 text-[14px]"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </ul>
  );
}

function RadioLinkButton({
  logo,
  href,
}: {
  logo: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white px-2 py-1 text-white hover:bg-blue-600 hover:text-white mobile:h-12 mobile:w-12 mobile:px-3"
    >
      {logo}
    </Link>
  );
}
