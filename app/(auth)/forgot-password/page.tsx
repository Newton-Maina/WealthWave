'use client'

import React, { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "@/components/CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { verifyRecovery } from "@/lib/actions/user.actions";

const recoverySchema = z.object({
    email: z.string().email(),
    city: z.string().min(2, "City is required for recovery"),
    ssn: z.string().min(4, "SSN/ID is required for verification"),
})

const ForgotPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof recoverySchema>>({
        resolver: zodResolver(recoverySchema),
        defaultValues: {
            email: "",
            city: "",
            ssn: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof recoverySchema>) => {
        setIsLoading(true)
        setError('');
        try {
            const result = await verifyRecovery(data);
            if (result) {
                setIsSubmitted(true);
            } else {
                setError('Verification failed. Please check your details.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex-center size-full max-sm:px-6">
            <div className="auth-form">
                <header className="flex flex-col gap-5 md:gap-8">
                    <Link href="/" className="cursor-pointer flex items-center gap-1">
                        <Image src="/icons/logo.svg" alt="WealthWave-logo" width={34} height={34}/>
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">WealthWave</h1>
                    </Link>

                    <div className="flex flex-col gap-1 md:gap-3">
                        <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                            {isSubmitted ? 'Check your Email' : 'Recover Account'}
                            <p className="text-16 font-normal text-gray-600">
                                {isSubmitted 
                                    ? 'If the details match, you will receive a reset link shortly.' 
                                    : 'Verify your security passphrase to continue'}
                            </p>
                        </h1>
                    </div>
                </header>

                {isSubmitted ? (
                    <div className="flex flex-col gap-4">
                        <Button onClick={() => router.push('/sign-in')} className="form-btn">
                            Back to Sign In
                        </Button>
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <CustomInput
                                    control={form.control} name='email' label='Email'
                                    placeholder='Enter your email'
                                />
                                <div className="flex flex-col gap-1">
                                    <label className="text-14 font-medium text-gray-700">Security Passphrase</label>
                                    <p className="text-12 text-gray-500 mb-2">Hint: What is your current city?</p>
                                    <CustomInput
                                        control={form.control} name='city' label=''
                                        placeholder='Your Answer'
                                    />
                                </div>
                                <CustomInput
                                    control={form.control} name='ssn' label='SSN/ID Verification'
                                    placeholder='Last 4 digits or ID'
                                />
                                
                                    {error && <p className="text-12 text-red-500 text-center">{error}</p>}
                                    <Button type="submit" disabled={isLoading} className="form-btn">
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" /> &nbsp;
                                                Verifying...
                                            </>
                                        ) : 'Reset Password'}
                                    </Button>
                            </form>
                        </Form>
                        <footer className="flex justify-center gap-1">
                            <Link href="/sign-in" className="form-link">
                                Back to Sign in
                            </Link>
                        </footer>
                    </>
                )}
            </div>
        </section>
    )
}

export default ForgotPassword
