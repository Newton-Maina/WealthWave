import React from 'react'
import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const CreditCardWidget = ({ account, variant = 'primary' }: { account: Account, variant?: 'primary' | 'secondary' }) => {
  const isPrimary = variant === 'primary';

  return (
    <div className={cn(
        "rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden h-56 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
        {
            "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border-gray-700/50": isPrimary,
            "bg-white text-gray-900 border-gray-200": !isPrimary
        }
    )}>
        {isPrimary ? (
            <>
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors"></div>
                <div className="absolute bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors"></div>
            </>
        ) : (
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none"></div>
        )}
        
        <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-2">
                <span className={cn("font-bold tracking-wider opacity-80", { "text-white": isPrimary, "text-gray-800": !isPrimary })}>
                    {isPrimary ? 'Wealthwave' : 'Savings'}
                </span>
                {!isPrimary && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold tracking-wide">ACTIVE</span>}
            </div>
            <Image 
                src="/icons/Paypass.svg" 
                width={24} 
                height={24} 
                alt="contactless" 
                className={cn("opacity-80", { "invert": isPrimary })} 
            />
        </div>

        <div className="z-10 mt-4">
            <div className="flex justify-between items-center mb-4">
                 <Image src="/icons/chip.png" width={40} height={40} alt="chip" className="opacity-100 drop-shadow-sm" />
                 {!isPrimary && <Image src="/icons/wifi.svg" width={24} height={24} alt="wifi" className="rotate-90 text-gray-400 opacity-50" />}
            </div>
            <p className={cn("text-xl tracking-widest font-mono", { "text-white/90": isPrimary, "text-gray-500": !isPrimary })}>
                **** **** **** {account?.mask || '0000'}
            </p>
        </div>

        <div className="flex justify-between items-end z-10">
            <div>
                <p className={cn("text-xs opacity-60 uppercase", { "text-gray-400": isPrimary, "text-gray-500": !isPrimary })}>
                    {isPrimary ? 'Checking Balance' : 'Available Savings'}
                </p>
                <p className={cn("text-2xl font-bold tracking-tight", { "text-white": isPrimary, "text-gray-900": !isPrimary })}>
                    {formatAmount(account?.currentBalance)}
                </p>
            </div>
            <div className="text-right">
                <p className={cn("text-xs opacity-60 uppercase", { "text-gray-400": isPrimary, "text-gray-500": !isPrimary })}>
                    {isPrimary ? 'Exp' : 'APY'}
                </p>
                <p className={cn("text-sm font-medium", { "text-white": isPrimary, "text-green-600 font-bold": !isPrimary })}>
                    {isPrimary ? '09/25' : '4.5%'}
                </p>
            </div>
        </div>
    </div>
  )
}

export default CreditCardWidget
