import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    // 範例程式碼，開發時請替換成實際內容
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t('description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/challenges"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t('getStarted')}
            </Link>
            <Link
              href="/about"
              className="border border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('featuredChallenges')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample challenge cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Web Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Test your web application security knowledge
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  100 points
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  42 solved
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Cryptography
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Solve cryptographic puzzles and ciphers
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  150 points
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  28 solved
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Reverse Engineering
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Analyze and reverse engineer binary files
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  200 points
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  15 solved
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('recentActivity')}
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>{tCommon('loading')}...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
