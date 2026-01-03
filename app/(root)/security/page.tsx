import HeaderBox from '@/components/HeaderBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, Key, Lock, Fingerprint, RefreshCw, AlertCircle } from 'lucide-react'
import React from 'react'

const Security = () => {
  return (
    <section className="flex flex-col gap-8 p-8 bg-gray-50/50 min-h-screen w-full">
        <HeaderBox 
            title="Security Settings"
            subtext="Manage your account security and authentication methods."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Change Password */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Key className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                        <p className="text-xs text-gray-500">Update your password regularly</p>
                    </div>
                </div>
                
                <form className="space-y-5 flex-1">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" className="bg-gray-50/50" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="bg-gray-50/50" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" className="bg-gray-50/50" placeholder="Confirm new password" />
                    </div>
                    <Button type="submit" className="w-full bg-bank-gradient text-white mt-4">
                        Update Password
                    </Button>
                </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-xs text-gray-500">Add an extra layer of protection</p>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                        Add an extra layer of security to your account by enabling 2FA. We'll send a code to your mobile device whenever you sign in from a new location.
                    </p>
                    
                    <div className="flex items-center justify-between p-5 bg-gray-50/80 rounded-2xl border border-gray-100 mb-8">
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900">Enable 2FA</span>
                            <span className="text-xs text-gray-500">SMS or Authenticator App</span>
                        </div>
                        {/* Styled Switch */}
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 cursor-pointer">
                             <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm"/>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-3 mt-auto">
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50 font-semibold text-gray-700">
                        Configure Authentication App
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                        <AlertCircle className="size-3" />
                        Last updated on Oct 12, 2023
                    </div>
                </div>
            </div>

            {/* Recovery Codes */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Fingerprint className="size-32" />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <Lock className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Emergency Recovery Codes</h3>
                            <p className="text-xs text-gray-500">Access your account if you lose your 2FA device</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900">
                        <RefreshCw className="size-3" />
                        Generate New Codes
                    </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {['X7A9-2B3C', '9D4E-5F6G', '1H2I-3J4K', '5L6M-7N8O', 'P9Q0-R1S2', 'T3U4-V5W6', 'X7Y8-Z9A0', 'B1C2-D3E4'].map((code, index) => (
                        <div key={index} className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center font-mono text-sm text-gray-700 tracking-wider shadow-inner group hover:border-orange-200 transition-colors">
                            {code}
                        </div>
                    ))}
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50/50 rounded-xl border border-red-100">
                    <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-900">Important Security Notice</p>
                        <p className="text-xs text-red-700 mt-1 leading-relaxed">
                            Keep these codes in a safe, offline place. Each code can only be used once. If you lose these codes and your 2FA device, you may be permanently locked out of your account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Security