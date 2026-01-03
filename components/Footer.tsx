import { logoutAccount } from "@/lib/actions/user.actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const router = useRouter();

    const handleLogOut = async () => {
        const loggedOut = await logoutAccount();
        if (loggedOut) router.push('/sign-in');
    }

    return (
        <footer className="flex items-center justify-between gap-2 p-4 border-t border-gray-200 mt-auto">
            <div className={type === 'mobile' ? 'size-10 rounded-full bg-gray-200 flex items-center justify-center' : 'size-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0'}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.firstName[0]}
                </p>
            </div>

            <div className={type === 'mobile' ? 'hidden' : 'flex flex-1 flex-col justify-center min-w-0'}>
                <h1 className="text-14 truncate font-semibold text-gray-700">
                    {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-12 truncate font-normal text-gray-500">
                    {user?.email}
                </p>
            </div>

            <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors group" 
                onClick={handleLogOut}
                title="Logout"
            >
                <LogOut className="size-5 text-gray-500 group-hover:text-red-500 transition-colors" />
            </button>
        </footer>
    )
}
export default Footer
