import React from 'react'
import Link from "next/link";
import Image from "next/image";
import BankCard from "@/components/BankCard";
import { countTransactionCategories } from '@/lib/utils';
import Category from './Category';

const RightSidebar = ({user, transactions, banks}:
                          RightSidebarProps) => {

    const categories: CategoryCount[] =
        countTransactionCategories(transactions);

    return (
        <aside className="right-sidebar min-h-[111vh]">
            <section className="flex flex-col pb-8">
                <div className="profile-banner" />
                    <div className="profile">
                        <div className="profile-img">
                            <span className="text-5xl font-bold text-blue-500">
                                {user.firstName[0]}
                            </span>
                        </div>
                        <div className="profile-details">
                            <h1 className="profile-name">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="profile-email">
                                {user.email}
                            </p>
                        </div>
                    </div>
            </section>

            <section className="banks">
                <div className="flex w-full justify-between">
                    <h2 className="header-2">My Banks</h2>
                    <Link href="/" className="flex gap-2">
                        <Image src="/icons/plus.svg" alt="plus" height={20} width={20} />
                        <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
                    </Link>
                </div>
                {banks?.length > 0 && (
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                        <div className="relative z-10">
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}
                <div className="mt-10 flex flex-col gap-6">
                    <h2 className="header-2">
                        Top Categories
                    </h2>
                    <div className="space-y-5">
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <Category key={category.name} category={category}/>
                            ))
                        ) : (
                            <p className="text-14 text-gray-500">No transactions yet to categorize.</p>
                        )}
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-6">
                    <h2 className="header-2">
                        Recent Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                             <div className="size-2 mt-1.5 rounded-full bg-blue-500" />
                             <div className="flex flex-col gap-1">
                                <p className="text-12 font-semibold text-gray-700">New Login Detected</p>
                                <p className="text-10 text-gray-500">Your account was accessed from a new device.</p>
                             </div>
                        </div>
                        <div className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                             <div className="size-2 mt-1.5 rounded-full bg-gray-300" />
                             <div className="flex flex-col gap-1">
                                <p className="text-12 font-semibold text-gray-700">Plaid Sync Complete</p>
                                <p className="text-10 text-gray-500">Your bank transactions have been updated.</p>
                             </div>
                        </div>
                        <div className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                             <div className="size-2 mt-1.5 rounded-full bg-gray-300" />
                             <div className="flex flex-col gap-1">
                                <p className="text-12 font-semibold text-gray-700">Security Passphrase Set</p>
                                <p className="text-10 text-gray-500">Recovery passphrase "Current City" is active.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </aside>
    )
}
export default RightSidebar
