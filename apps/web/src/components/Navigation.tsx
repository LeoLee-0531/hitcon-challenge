'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { getApiBaseUrl } from '../config/env';
import type { User } from '../types/auth';

interface SitconLogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export function SitconLogo({
  className,
  height = 30,
  width = 100,
}: SitconLogoProps) {
  return (
    <Image
      src="/logo/sitcon-white.svg"
      alt="Sitcon Logo"
      className={className}
      height={height}
      width={width}
    />
  );
}

export default function Navigation() {
  const t = useTranslations('nav');
  const { login, isLoading } = useGoogleAuth();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, []);

  // 處理 ESC 鍵關閉選單
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isMobileMenuOpen]);

  const initializeAuth = async () => {
    // 檢查 localStorage 中的使用者資料
    const userInfo = localStorage.getItem('user_info');
    const userToken = localStorage.getItem('user_token');

    if (userInfo && userToken) {
      try {
        const parsedUser = JSON.parse(userInfo);

        // 如果沒有頭像資料，嘗試從 API 獲取最新的使用者資料
        if (!parsedUser.picture) {
          try {
            const profileData = await fetchUserProfile(userToken);
            if (profileData && profileData.profileImage) {
              const updatedUser = {
                ...parsedUser,
                picture: profileData.profileImage,
              };
              localStorage.setItem('user_info', JSON.stringify(updatedUser));
              setUser(updatedUser);
            } else {
              setUser(parsedUser);
            }
          } catch (error) {
            setUser(parsedUser);
          }
        } else {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('解析使用者資料失敗:', error);
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_token');
      }
    }

    // 設定初始化完成
    setInitializing(false);
  };

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.data;
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
    return null;
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="nav p-4 sm:p-6 lg:p-10">
        <div className="nav-content glass-box mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <SitconLogo />
          </Link>

          {/* 電腦版導覽列 */}
          <div className="nav-links hidden md:flex gap-[50px]">
            <Link href="/challenges" className="nav-link">
              {t('challenges')}
            </Link>
            <Link href="/about" className="nav-link">
              {t('about')}
            </Link>
            <Link href="/recruitment" className="nav-link">
              {t('recruitment')}
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher className="side-box" />

            {!mounted || initializing ? (
              // 組件掛載前或初始化時顯示載入狀態
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200/20"></div>
            ) : user ? (
              <Link href="/profile" className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${user.picture ? '' : 'bg-[var(--primary-20)]'}`}
                >
                  {user.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.nickname}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      {user.nickname.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </Link>
            ) : (
              <button
                onClick={login}
                disabled={isLoading}
                className="login-btn side-box rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10"
              >
                {isLoading ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 !m-0 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                  </svg>
                )}
              </button>
            )}

            {/* 漢堡選單 */}
            <button
              onClick={toggleMobileMenu}
              className="flex md:hidden p-2 rounded-md w-8 h-8 sm:w-10 sm:h-10 items-center justify-center cursor-pointer"
              aria-label="切換手機選單"
            >
              <div className="flex flex-col justify-center items-center w-4 h-4 sm:w-5 sm:h-5 !m-0">
                <span
                  className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-white mt-1 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-white mt-1 transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* 手機版手風琴導覽列 */}
      <div
        className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />
      <div className="md:hidden fixed top-0 w-full p-4 sm:p-6">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="nav-content glass-box mx-auto !pt-[65px]">
            <div className="py-4">
              <div className="flex flex-col space-y-2">
                <div className="py-3 px-4 rounded-md">
                  <Link
                    href="/challenges"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('challenges')}
                  </Link>
                </div>
                <div className="py-3 px-4 rounded-md">
                  <Link
                    href="/about"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('about')}
                  </Link>
                </div>
                <div className="py-3 px-4 rounded-md">
                  <Link
                    href="/recruitment"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('recruitment')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
