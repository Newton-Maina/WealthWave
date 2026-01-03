import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const Preferences = () => {
  return (
    <section className="flex flex-col gap-8 p-8 bg-gray-50/50 min-h-screen w-full">
         <HeaderBox 
            title="Preferences"
            subtext="Manage your account settings and preferences."
        />
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">Preferences settings coming soon...</p>
        </div>
    </section>
  )
}

export default Preferences