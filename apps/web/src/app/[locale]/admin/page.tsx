import { auth } from "@/auth";
import { notFound } from 'next/navigation';
import ScanQRCodeButton from './ScanQRCodeButton';

export default async function ScanParticipantPage() {
  const session = await auth();
  if (!session || (session as any).role !== 'ADMIN') {
    notFound();
  }
  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <div className="w-full max-w-[960px] flex flex-col mb-8 px-4 md:px-8">
        <ScanQRCodeButton />
      </div>
    </div>
  );
}
