import AdvancedScrollAnimation from '@/components/common/Animation/AdvancedScrollAnimation'
import { MessageSquare, Star, Home } from 'lucide-react'
import React from 'react'

interface HeaderCardCommensProps {
  totalComments: number;
  averageRating: string | number;
  hotelsWithComments: number;
}

const HeaderCardCommens = ({ totalComments, averageRating, hotelsWithComments }: HeaderCardCommensProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdvancedScrollAnimation type="slide-up" delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-[0_0_8px] shadow-blue-300/30 transition-all hover:shadow-[0_0_12px] hover:shadow-blue-300/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">کل کامنت‌ها</p>
                <p className="text-3xl font-bold mt-1">{totalComments}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <MessageSquare size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="slide-up" delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-[0_0_8px] shadow-blue-300/30 transition-all hover:shadow-[0_0_12px] hover:shadow-blue-300/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">میانگین امتیاز</p>
                <p className="text-3xl font-bold mt-1">{averageRating}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Star size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>

        <AdvancedScrollAnimation type="slide-up" delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-[0_0_8px] shadow-blue-300/30 transition-all hover:shadow-[0_0_12px] hover:shadow-blue-300/40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">هتل‌های دارای نظر</p>
                <p className="text-3xl font-bold mt-1">{hotelsWithComments}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-200 dark:bg-green-900/30 flex items-center justify-center">
                <Home size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </AdvancedScrollAnimation>
      </div>
    </div>
  )
}

export default HeaderCardCommens