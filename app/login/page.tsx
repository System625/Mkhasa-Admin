"use client"
import React from 'react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            // Handle errors here
            console.error(result.error);
        } else {
            // Redirect to dashboard on success
            router.push('/dashboard');
        }
    };


    return (
        <Wrapper className="flex flex-col items-center justify-center max-w-lg min-h-screen py-12">
            <Heading>Welcome !</Heading>
            <p className='text-sm mt-2 text-center'>Enter Your Email Address And Password To Access <span className='text-app-red font-medium'>Mkhasa</span> Admin Panel</p>
            <form onSubmit={handleSubmit} className="w-[90%] md:w-[60%] mx-auto mt-5 gap-3 flex flex-col">
                <div className="text-left md:text-center">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="text-left md:text-center">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    className="w-full rounded-none py-[10px] flex justify-center bg-black text-base text-white font-bold mt-5"
                    type="submit"
                >
                    Log In
                </Button>
            </form>
        </Wrapper>
    );
};

export default LoginPage;
