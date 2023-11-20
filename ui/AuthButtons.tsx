"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
    return <button className="px-5 py-2 bg-gray-800 rounded-lg text-white" onClick={() => signIn()}>Sign In</button>;
}

export function SignOutButton() {
    return <button className="px-5 py-2 bg-gray-800 rounded-lg text-white" onClick={() => signOut()}>Sign Out</button>;
}