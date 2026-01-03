"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { CreditCard, MoreHorizontal, Send, ChevronRight, Check } from 'lucide-react';
import { formatAmount } from '@/lib/utils';
import { cn } from "@/lib/utils";

interface QuickTransferProps {
    accounts: any[];
}

const QuickTransfer = ({ accounts }: QuickTransferProps) => {
    const [amount, setAmount] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mock saved payments integrated directly
    const savedPayments = [
        { name: 'Maria S.', initials: 'MS', color: 'bg-pink-100 text-pink-600' },
        { name: 'John D.', initials: 'JD', color: 'bg-blue-100 text-blue-600' },
        { name: 'Wifi Bill', initials: 'WB', color: 'bg-purple-100 text-purple-600' },
        { name: 'Mom', initials: 'M', color: 'bg-green-100 text-green-600' },
    ];

    const handleTransfer = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setAmount('');
        setSelectedRecipient(null);
        // Ideally trigger a toast notification here
    };

    return (
        <section className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100/50 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="header-2">Quick Transfer</h2>
                <button className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Recipient Selection - Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <div 
                    onClick={() => setSelectedRecipient(null)}
                    className="flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]"
                >
                    <div className="size-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-blue-500 transition-colors bg-gray-50">
                        <span className="text-2xl text-gray-400 group-hover:text-blue-500 font-light">+</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500">New</span>
                </div>

                {savedPayments.map((person) => (
                    <div 
                        key={person.name} 
                        onClick={() => setSelectedRecipient(person.name)}
                        className="flex flex-col items-center gap-2 cursor-pointer min-w-[60px]"
                    >
                        <div className={cn(
                            "size-12 rounded-full flex items-center justify-center font-bold text-sm relative transition-all duration-300",
                            person.color,
                            selectedRecipient === person.name ? "ring-2 ring-offset-2 ring-blue-600 scale-110" : "hover:scale-105"
                        )}>
                            {person.initials}
                            {selectedRecipient === person.name && (
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 border-2 border-white">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                        <span className={cn(
                            "text-xs font-medium transition-colors",
                            selectedRecipient === person.name ? "text-blue-700 font-bold" : "text-gray-600"
                        )}>{person.name}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <div className="relative">
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
                        {selectedRecipient ? `Sending to ${selectedRecipient}` : 'Recipient Card Number'}
                    </label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                        <input 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder-gray-400 font-medium" 
                            placeholder={selectedRecipient ? "**** **** **** 1234" : "0000 0000 0000 0000"}
                            type="text" 
                            disabled={!!selectedRecipient}
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Amount</label>
                        <input 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-bold text-gray-900" 
                            placeholder="0.00" 
                            type="number" 
                        />
                    </div>
                    <div className="relative w-28">
                        <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Currency</label>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-3 pr-8 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                        </select>
                    </div>
                </div>

                <button 
                    onClick={handleTransfer}
                    disabled={isLoading || !amount}
                    className={cn(
                        "w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2",
                        (isLoading || !amount) && "opacity-50 cursor-not-allowed hover:shadow-none"
                    )}
                >
                    {isLoading ? (
                         <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Send Money <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default QuickTransfer;
