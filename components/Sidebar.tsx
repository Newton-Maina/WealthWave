'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Wallet, ArrowRightLeft, Package, ShieldCheck, ScrollText, LifeBuoy, Settings } from "lucide-react";
import { sidebarLinks } from "@/constants";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname();

    const iconMap: { [key: string]: any } = {
        "Overview": LayoutGrid,
        "Wallet": Wallet,
        "Payments": ArrowRightLeft,
        "Preferences": Settings,
        "Security": ShieldCheck,
        "Transactions": ScrollText
    };

    return (
        <aside className="w-64 bg-surface-light border-r border-gray-200 flex flex-col justify-between shadow-sm relative z-20 hidden md:flex min-h-[111vh]">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform rotate-12 shadow-lg">
                        <span className="text-white font-bold text-lg transform -rotate-12">W</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-800">Wealthwave</span>
                </div>
                <nav className="space-y-2">
                    {sidebarLinks.map((item) => {
                        const Icon = iconMap[item.label] || LayoutGrid;
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                        if (item.label === 'Connect Bank') {
                            return (
                                <div key={item.label} className="relative pl-1">
                                    <PlaidLink user={user} variant="ghost" />
                                </div>
                            )
                        }

                        return (
                            <Link
                                href={item.route}
                                key={item.label}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden",
                                    {
                                        "bg-bank-gradient text-white shadow-md": isActive,
                                        "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isActive,
                                    }
                                )}
                            >
                                <Icon className={cn("size-6 transition-colors", { 
                                    "text-white": isActive, 
                                    "text-gray-500 group-hover:text-gray-900": !isActive 
                                })} />
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            
            <div className="p-6 mt-auto">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-5 relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">Have questions?</h4>
                        <p className="text-xs text-gray-600 mb-4">Ask your financial specialist.</p>
                        <button className="bg-surface-light text-gray-800 text-xs font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            Contact Support
                        </button>
                    </div>
                    <LifeBuoy className="absolute -bottom-4 -right-4 size-20 text-white opacity-20 transform rotate-12" />
                </div>
            </div>

            <Footer user={user} />
        </aside>
    )
}
export default Sidebar
