import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import { redirect } from 'next/navigation';
import Link from "next/link";
import { formatAmount } from '@/lib/utils';
import CreditCardWidget from '@/components/CreditCardWidget';
import { PieChart, TrendingUp, ArrowUp, ArrowDown, Wallet, Search, Bell, Plus, Wifi, Zap, Smartphone, ShieldCheck, Home as HomeIcon, CreditCard, MoreHorizontal } from 'lucide-react';
import PlaidLink from '@/components/PlaidLink';

const MyBanks = async () => {
    const loggedIn = await getLoggedInUser();
    if (!loggedIn) redirect('/sign-in');

    const accounts = await getAccounts({ userId: loggedIn.$id })
    const accountsData = accounts?.data || [];
    const totalBalance = accounts?.totalCurrentBalance || 0;

    const savedPayments = [
        { name: 'Electricity', icon: Zap },
        { name: 'Top up', icon: Smartphone },
        { name: 'Insurance', icon: ShieldCheck },
        { name: 'Rent', icon: HomeIcon },
    ];

    return (
        <section className="flex flex-col gap-8 p-8 bg-gray-50/50 min-h-screen w-full">
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Accounts</h2>
                <div className="flex items-center gap-4">
                    <div className="relative w-64 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                        <input className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 placeholder-gray-400" placeholder="Search..." type="text" />
                    </div>
                    <button className="p-2 bg-white text-gray-500 hover:text-gray-700 rounded-xl border border-gray-200 shadow-sm relative transition-all">
                        <Bell className="size-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Wallet className="size-5" />
                        </div>
                        <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <ArrowUp className="size-3 mr-1" /> 2.4%
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Net Worth</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatAmount(totalBalance)}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-purple-200 transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <PieChart className="size-5" />
                        </div>
                        <span className="flex items-center text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Last 30 days</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Spent this month</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">$3,420.50</h3>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-orange-200 transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <TrendingUp className="size-5" />
                        </div>
                        <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <ArrowUp className="size-3 mr-1" /> 5.1%
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Investments Portfolio</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">$24,461.50</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Your Cards</h3>
                            <p className="text-sm text-gray-500 mt-1">Manage your physical and virtual cards</p>
                        </div>
                        <PlaidLink user={loggedIn} className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Plus className="size-4" />
                            <span>New Card</span>
                        </PlaidLink>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {accountsData.length > 0 ? (
                            accountsData.map((a: Account, index: number) => (
                                <CreditCardWidget 
                                    key={a.id} 
                                    account={a} 
                                    variant={index === 0 ? 'primary' : 'secondary'} 
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm col-span-2 text-center py-8">No cards found. Connect a bank to get started.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                        <Link href="/transaction-history" className="text-sm font-medium text-blue-600 hover:underline">See all</Link>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                            <div className="flex items-center space-x-3">
                                <div className="size-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
                                    <span className="text-white font-bold text-xs">AP</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">Apple Store</h4>
                                    <p className="text-xs text-gray-500">Electronics • Sept 4</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">-$135.00</span>
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                            <div className="flex items-center space-x-3">
                                <div className="size-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                    <Wallet className="size-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">Whole Foods</h4>
                                    <p className="text-xs text-gray-500">Groceries • Sept 3</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">-$86.50</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-5">Quick transfer</h3>
                    <div className="space-y-4">
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                            <input className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-blue-500 placeholder-gray-400" placeholder="Card number" type="text" />
                        </div>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-4 text-sm focus:ring-1 focus:ring-blue-500 placeholder-gray-400" placeholder="Amount" type="number" />
                            </div>
                            <div className="relative w-24">
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-3 pr-8 text-sm focus:ring-1 focus:ring-blue-500 text-gray-600 appearance-none">
                                    <option>USD</option>
                                    <option>EUR</option>
                                </select>
                            </div>
                        </div>
                        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-sm">
                            Send Transfer
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Saved payments</h3>
                        <MoreHorizontal className="text-gray-400 size-5 cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {savedPayments.map((item) => (
                            <div key={item.name} className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-500 border border-transparent transition-colors cursor-pointer group">
                                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <item.icon className="size-5" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Payment schedule</h3>
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-4">Upcoming</p>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors cursor-pointer">
                            <div className="bg-indigo-50 size-10 rounded-lg flex items-center justify-center text-indigo-600 mr-3">
                                <span className="font-bold">E</span>
                            </div>
                            <div className="flex-1">
                                <h5 className="text-sm font-bold text-gray-900">Electricity Bill</h5>
                                <p className="text-xs text-gray-500">Auto-pay • Sep 24</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900">$45.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MyBanks
