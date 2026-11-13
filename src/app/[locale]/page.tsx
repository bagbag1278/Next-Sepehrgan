import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('common');
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
        </p>
        <Link
          href="/Admin/AdminDashboard"
          className="px-6 py-3 bg-[#0887CAB2] text-white rounded-xl hover:bg-[#0887CA]/90 transition"
        >
       
        </Link>
      </div>
    </div>
  );
}