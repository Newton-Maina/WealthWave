"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createLinkToken, exchangePublicToken } from '../lib/actions/user.actions';
import { cn } from '@/lib/utils';

const PlaidLink = ({ user, variant, className, children }: PlaidLinkProps & { className?: string, children?: React.ReactNode }) => {

    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user]);
    
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        router.push('/');

    },[user])


    const config: PlaidLinkOptions = {
       token,
        onSuccess
    }

    const {open, ready} = usePlaidLink(config);

    return (
        <>
            {variant === 'primary' ? (
                <Button
                    onClick={() => open()}
                    disabled={!ready}
                    className={cn("plaidlink-primary", className)}>
                    {children || "Connect Bank"}
                </Button>
            ): variant === 'ghost' ?(
                <Button onClick={() =>open()} variant="ghost" className={cn("plaidlink-ghost justify-center", className)}>
                    {children || (
                        <>
                            <Image src="/icons/connect-bank.svg" alt="connect-bank" width={24} height={24} />
                            <p className="text-[16px] font-semibold text-text-sub-light">Connect Bank</p>
                        </>
                    )}
                </Button>
            ): (
                <Button onClick={() =>open()} className={cn("plaidlink-default", className)}>
                    {children || (
                        <>
                            <Image src="/icons/connect-bank.svg" alt="connect-bank" width={24} height={24} />
                            <p className="text-[16px] font-semibold text-text-sub-light">Connect Bank</p>
                        </>
                    )}
                </Button>
            )}
        </>
    )
}

export default PlaidLink
