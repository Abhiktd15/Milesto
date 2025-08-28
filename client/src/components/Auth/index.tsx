"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateUserMutation, useLoginUserMutation } from "@/state/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
    method: string;
};

const AuthComp = ({method} : Props ) => {
    const router  = useRouter()
    const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUser,{isLoading : createLoading}] = useCreateUserMutation()
    const [loginUser,{isLoading : loginLoading}] = useLoginUserMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(method === "Signup"){
            try {
                await createUser({
                    username,
                    email,
                    password
                })
                setUsername("")
                setEmail("")
                setPassword("")
                router.push('/')
            } catch (error) {
                console.log("Error Creating User",error)
            }
        }else{
            try {
                await loginUser({
                    email,
                    password,
                })
                router.push('/')

            } catch (error) {
                console.log("Error Logging in User",error)
            }
        }
    }
    

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
            <div className="w-full max-w-md border rounded-3xl bg-[#171717]/20 p-10">
                <div className="flex flex-col gap-6 ">
                    <h1 className="text-center text-xl font-semibold">{method === "Login" ?"Login to your account" : "Create a new account"}</h1>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-1">
                                    <label htmlFor="email" className="text-sm font-bold ml-2">Email</label>
                                    <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="abc@example.com"
                                    required
                                    />
                                </div>
                                { method === 'Signup' && <div className="grid gap-1">
                                    <label htmlFor="username" className="text-sm font-bold ml-2">Username</label>
                                    <Input
                                        id="username"
                                        value={username}
                                        type="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="abc123"
                                        required
                                    />
                                </div>}
                                <div className="grid gap-1">
                                    <div className="flex items-center">
                                    <label htmlFor="password" className="text-sm font-bold ml-2">Password</label>
                                    </div>
                                    <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" required />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full font-bold hover:cursor-pointer  border ">
                                        {method === "Login" ? (
                                            loginLoading ? 'Loading...':'Login'
                                        ) : (
                                            createLoading? 'Loading...':'Sign Up'
                                        )}
                                    </Button> 
                                </div>
                            </div>
                            {method === 'Login' ? (
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup" className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            ):(
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthComp;