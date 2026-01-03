import React from 'react'
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CreditCardWidget from '@/components/CreditCardWidget';
import StatWidget from '@/components/StatWidget';
import FinancialChart from '@/components/FinancialChart';
import RecentTransactions from '@/components/RecentTransactions';
import SpendingTrends from '@/components/SpendingTrends';
import SavingsGoal from '@/components/SavingsGoal';
import QuickTransfer from '@/components/QuickTransfer';
import { formatAmount } from '@/lib/utils';
import { ArrowUp, ArrowDown, TrendingUp, PieChart, BarChart3, Wallet, CreditCard, ChevronRight, MoreHorizontal, Plus, Search, Bell, Settings, Zap, Smartphone, ShieldCheck, Home as HomeIcon } from 'lucide-react';

const Home = async ({searchParams: {id, page } }:SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in')

    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    const accountsData = accounts?.data || [];
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    const account = appwriteItemId ? await getAccount({ appwriteItemId }) : null;

    // Calculate stats
    const transactions = account?.transactions || [];
    const currentMonth = new Date().getMonth();
    const monthlyTransactions = transactions.filter((t: any) => new Date(t.date).getMonth() === currentMonth);
    const spent = monthlyTransactions.filter((t: any) => t.type === 'debit').reduce((acc: number, t: any) => acc + t.amount, 0);
    const received = monthlyTransactions.filter((t: any) => t.type === 'credit').reduce((acc: number, t: any) => acc + t.amount, 0);

    return (
        <section className="flex w-full min-h-[111vh] bg-gray-50/50">
            <div className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto no-scrollbar">
                <header className="flex flex-col gap-8">
                    <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                        <HeaderBox
                            type="greeting"
                            title="Overview"
                            user={loggedIn?.firstName || 'Guest'}
                            subtext="Manage your financial activities"
                        />
                        <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 gap-2 shadow-sm w-full md:w-auto">
                            <Image src="/icons/search.svg" width={20} height={20} alt="search" />
                            <input type="text" placeholder="Search transactions..." className="bg-transparent outline-none text-14 placeholder:text-gray-400 w-full" />
                        </div>
                    </div>

                    {/* My Cards - Moved to top for Mobile first visibility */}
                    <div className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="header-2">My Cards</h2>
                            <Link href="/my-banks" className="text-xs font-medium text-blue-600 hover:underline">Manage Banks</Link>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                            <div className="w-full lg:w-[400px]">
                                {account && <CreditCardWidget account={account.data} />}
                            </div>
                            <div className="flex-1 w-full lg:border-l lg:pl-8 border-gray-100">
                                <TotalBalanceBox
                                    accounts={accountsData}
                                    totalBanks={accounts?.totalBanks}
                                    totalCurrentBalance={accounts?.totalCurrentBalance}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                        <StatWidget 
                            title="Spent this month" 
                            amount={spent} 
                            icon={BarChart3} 
                            variant="default"
                        />
                        <StatWidget 
                            title="Received this month" 
                            amount={received} 
                            icon={TrendingUp} 
                            variant="success" 
                        />
                        <StatWidget 
                            title="Investments" 
                            amount={24461.50} 
                            icon={PieChart} 
                            variant="info" 
                            trend="+12.1%"
                        />
                        <StatWidget 
                            title="Cashback" 
                            amount={1897.30} 
                            icon={Wallet} 
                            variant="warning" 
                        />
                    </div>
                </header>

                {/* New Feature Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="xl:col-span-8">
                        <SpendingTrends />
                    </div>
                    <div className="xl:col-span-4">
                        <QuickTransfer accounts={accountsData} />
                    </div>
                </div>

                {/* Transactions & Goals Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-8">
                    <div className="xl:col-span-8 flex flex-col gap-6">
                        <RecentTransactions
                            accounts={accountsData}
                            transactions={account?.transactions}
                            appwriteItemId={appwriteItemId}
                            page={currentPage}
                        />
                    </div>
                    
                    <div className="xl:col-span-4 flex flex-col gap-6">
                         <h2 className="header-2">Savings Goals</h2>
                         <SavingsGoal 
                            title="Dream Car" 
                            targetAmount={45000} 
                            currentAmount={28500}
                            color="bg-bank-gradient" 
                        />
                         <SavingsGoal 
                            title="Emergency Fund" 
                            targetAmount={10000} 
                            currentAmount={8250}
                            color="bg-green-500" 
                        />
                    </div>
                </div>
            </div>
            <RightSidebar
                user={loggedIn}
                transactions={account?.transactions}
                banks={accountsData?.slice(0,2)}
            />
        </section>
    )
}
export default Home