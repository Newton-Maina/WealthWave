import { formatAmount } from '@/lib/utils';
import React from 'react'
import { redirect } from 'next/navigation';
import { Search, Filter, Download, Plus, ArrowUpRight, ArrowDownLeft, Clock, MoreHorizontal, ChevronDown } from 'lucide-react';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from '@/components/BankTabItem';

const TransactionHistory = async ({searchParams: {id, page}}:SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in');

    const accounts = await getAccounts({ userId: loggedIn.$id })
    if (!accounts) return;

    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
    const account = appwriteItemId ? await getAccount({ appwriteItemId }) : null;
    const transactions = account?.transactions || [];

    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // Calculate summary stats
    const totalSpent = transactions.filter((t:any) => t.type === 'debit').reduce((acc:number, t:any) => acc + t.amount, 0);
    const totalIncome = transactions.filter((t:any) => t.type === 'credit').reduce((acc:number, t:any) => acc + t.amount, 0);

    return (
        <section className="flex flex-col gap-8 p-8 bg-gray-50/50 min-h-screen w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Transactions History</h2>
                    <p className="text-sm text-gray-500 mt-1">Detailed log of all your financial movements.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-gray-700">
                        <Download className="size-4" />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3.5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                        <Plus className="size-4" />
                        <span>New Transaction</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</p>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-2.5%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{formatAmount(totalSpent)}</h3>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-gray-900 h-full rounded-full" style={{width: '45%'}}></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Income</p>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{formatAmount(totalIncome)}</h3>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '72%'}}></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Invested</p>
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">+4.2%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">$12,450.00</h3>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{width: '30%'}}></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending</p>
                        <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">3 items</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">$358.30</h3>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{width: '15%'}}></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <Tabs defaultValue={appwriteItemId} className="w-full">
                    <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <TabsList className="recent-transactions-tabslist">
                        {accountsData.map((a: Account) => (
                            <TabsTrigger key={a.id} value={a.appwriteItemId}>
                                <BankTabItem
                                    key={a.id}
                                    account={a}
                                    appwriteItemId={appwriteItemId}
                                />
                            </TabsTrigger>
                        ))}
                        </TabsList>
                    </div>
                </Tabs>
                
                <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5 group-focus-within:text-blue-500 transition-colors" />
                        <input className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-400" placeholder="Search by merchant, category or tag..." type="text"/>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                        <div className="flex items-center border-r border-gray-200 pr-2 mr-2">
                            <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors">All</button>
                            <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">Income</button>
                            <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">Expenses</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select className="pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none">
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                    <option>Last 3 Months</option>
                                    <option>Custom Range</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
                            </div>
                            
                            <div className="relative">
                                <select className="pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none">
                                    <option>All Categories</option>
                                    <option>Shopping</option>
                                    <option>Bills</option>
                                    <option>Grocery</option>
                                    <option>Transport</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select className="pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none">
                                    <option>Any Amount</option>
                                    <option>$0 - $50</option>
                                    <option>$50 - $100</option>
                                    <option>$100 - $500</option>
                                    <option>$500+</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
                            </div>

                            <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg border border-dashed border-gray-300 hover:bg-gray-50 transition-colors ml-1" title="More Filters">
                                <Filter className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <TransactionsTable transactions={currentTransactions} />
                </div>
                <div className="p-4 border-t border-gray-100">
                    <Pagination totalPages={totalPages} page={currentPage} />
                </div>
            </div>
        </section>
    )
}
export default TransactionHistory
