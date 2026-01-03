import React from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'


const RecentTransactions = ({
    accounts,
    transactions = [],
    appwriteItemId,
    page =1,
}: RecentTransactionsProps) => {

    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);

    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = transactions.slice(
        indexOfFirstTransaction, indexOfLastTransaction
    )

    if (accounts.length === 0) {
        return (
            <section className="recent-transactions">
                <header className="flex items-center justify-between">
                    <h2 className="recent-transactions-label">
                        Recent Transactions
                    </h2>
                </header>
                <div className="flex w-full flex-col gap-4 p-4 items-center justify-center">
                    <p className="text-14 text-gray-500">
                        No bank accounts linked. Please link a bank account to view transactions.
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">
                    Recent Transactions
                </h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className="view-all-btn">
                    View all
                </Link>
            </header>
            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className="recent-transactions-tabslist">
                    {accounts.map((account: Account) => (
                        <TabsTrigger key={account.id} value={account.appwriteItemId}>
                            <BankTabItem
                                key={account.id}
                                account={account}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>

                {accounts.map((account: Account) => (
                    <TabsContent
                        value={account.appwriteItemId}
                        key={account.id}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />
                        <TransactionsTable transactions={currentTransactions}/>
                        {totalPages > 1 && (
                            <div className="my-4 w-full">
                                <Pagination
                                    totalPages={totalPages}
                                    page={page}
                                />
                            </div>
                        )}

                    </TabsContent>
                ))}

            </Tabs>
        </section>
    )
}
export default RecentTransactions
