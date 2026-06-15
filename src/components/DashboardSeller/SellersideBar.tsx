'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    MessageSquare,
    TicketPercent,
    FileText,
    Settings,
    LogOut,
    PlusCircle,
} from 'lucide-react'

import HeaderIcon from '@/components/DashboardSeller/Icon/HeaderIcon'
import HeaderIconDark from '@/components/DashboardSeller/Icon/HeaderIconDark'
import LogoutBox from './logout/LogoutBox'

const MenuItems = [
    {
        id: 1,
        icon: LayoutDashboard,
        label: 'داشبورد',
        href: '/dashboard/seller',
    },
    {
        id: 3,
        icon: Users,
        label: 'اطلاعات کاربری',
        href: '/dashboard/seller/userprofile',
    },
    {
        id: 4,
        icon: CalendarCheck,
        label: 'مدیریت املاک',
        href: '/dashboard/seller/housemanegement',
    },
    {
       id: 9,
       icon:  PlusCircle ,
       label: ' افزودن ملک',
       href: '/dashboard/seller/CreateMyHosue',
   },
    {
        id: 5,
        icon: MessageSquare,
        label: 'مدیریت رزروها',
        href: '/dashboard/seller/reservemanagement',
    },
    {
        id: 6,
        icon: TicketPercent,
        label: 'مدیریت مالی',
        href: '/dashboard/seller/Financialmanagement',
    },
    {
        id: 7,
        icon: FileText,
        label: 'مدیریت نظرات',
        href: '/dashboard/seller/commentmanegement',
    },
]

const Sidebar = () => {

    const pathname = usePathname()

    return (
        <aside
            className='row-span-2 h-[calc(100vh-3rem)]
            top-6 rounded-2xl shadow-[0_0_8px]
            shadow-blue-300/30 dark:shadow-blue-500/10
            bg-white dark:bg-blue-400 p-4 overflow-y-auto'
        >

            {/* logo */}
            <div
                className='flex justify-center py-4
                border-b border-gray-200 dark:border-gray-700'
            >

                <div className='dark:hidden'>
                    <HeaderIcon />
                </div>

                <div className='hidden dark:block'>
                    <HeaderIconDark />
                </div>

            </div>

            {/* menu */}
            <nav className='mt-6 space-y-2'>

                {
                    MenuItems.map((item) => {

                        const isActive =
                            pathname === item.href

                        return (

                            <Link
                                key={item.id}
                                href={item.href}
                                className={`
                                flex items-center gap-3
                                px-4 py-3 rounded-xl
                                transition-all duration-200

                                ${isActive
                                        ? `
                                        bg-blue-500
                                        text-white
                                        shadow-lg shadow-blue-500/30
                                        `
                                        : `
                                        text-gray-700 dark:text-gray-300
                                        hover:bg-blue-50
                                        dark:hover:bg-blue-900/20
                                        `
                                    }
                                `}
                            >

                                <item.icon size={20} />

                                <span
                                    className='text-sm font-medium'
                                >
                                    {item.label}
                                </span>

                            </Link>

                        )
                    })
                }

                {/* logout */}
                <div
                    className='pt-4 mt-4
                    border-t border-gray-200
                    dark:border-gray-700'
                >

                   

                        < div
                            className='w-full flex items-center
                            gap-3 px-4 py-3 rounded-xl
                            text-red-500 hover:bg-red-50
                            dark:hover:bg-red-900/20
                            transition-all'
                        >

                            <LogOut size={20} />

                            <span className='text-sm font-medium'>
                                    <LogoutBox />
                            </span>

                        </div>

                    

                </div>

            </nav>

        </aside>
    )
}

export default Sidebar
