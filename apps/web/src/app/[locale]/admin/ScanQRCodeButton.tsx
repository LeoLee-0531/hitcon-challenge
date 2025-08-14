"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ScanQRCodeButton() {
  const router = useRouter();
  const t = useTranslations('admin');

  return (
    <div className="mb-6 flex flex-col justify-center items-center">
      <h2 className="text-white text-4xl font-bold mb-4">
        {t('scanParticipantQRCode')}
      </h2>
      <div>
        <button
          onClick={() => router.push('/admin/scan')}
          className="ml-4 bg-[#0DF20D] text-black px-8 py-3 rounded-[9999px] font-semibold hover:bg-[#BEE3BE] transition text-lg"
        >
          {t('scanQRCode')}
        </button>
      </div>
    </div>
  );
}
