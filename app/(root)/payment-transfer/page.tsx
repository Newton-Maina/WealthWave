import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import { redirect } from 'next/navigation';
import Image from 'next/image';

const Transfer = async () => {

    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in');

    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    if (!accounts) return;

    const accountsData = accounts?.data;

    return (
        <section className="payment-transfer">
            <div className="flex items-center gap-3 mb-8">
                <div className="size-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <Image src="/icons/money-send.svg" width={30} height={30} alt="transfer" className="text-blue-600" />
                </div>
                <HeaderBox
                    title="Payment Transfer"
                    subtext="Securely transfer funds to friends, family, or other accounts."
                />
            </div>
            
            <div className="flex flex-col xl:flex-row gap-8">
                <section className="flex-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
                    <PaymentTransferForm
                        accounts={accountsData}
                    />
                </section>

                <div className="xl:w-[350px] flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white shadow-md">
                        <h3 className="text-18 font-bold mb-4">Transfer Limits</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                <span className="text-14 text-gray-300">Daily Limit</span>
                                <span className="text-16 font-semibold">$5,000.00</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                <span className="text-14 text-gray-300">Remaining</span>
                                <span className="text-16 font-semibold">$5,000.00</span>
                            </div>
                            <p className="text-12 text-gray-400 mt-2">Limits reset daily at midnight EST.</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                             <Image src="/icons/monitor.svg" width={24} height={24} alt="security" />
                             <h3 className="text-16 font-bold text-blue-900">Secure Transfer</h3>
                        </div>
                        <p className="text-14 text-blue-700 leading-relaxed">
                            Your transfers are protected by bank-level encryption. Always verify recipient details before sending.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Transfer
