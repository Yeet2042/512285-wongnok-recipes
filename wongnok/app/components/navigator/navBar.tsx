"use client"
import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch, Input, button} from "@nextui-org/react";
import { MoonIcon, SunIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

import SignInButton from './signInButton';
import SignUpButton from './signUpButton';
import ProfileNav from './profileNav';
import CreateRecipeButton from './createRecipeButton';
import SearchBar from './searchBar';

type Props = {}

export default function NavBar({}: Props) {
    const { data: session, status } = useSession()
    
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null
    return (
        <Navbar className="p-2">
            <NavbarBrand className="flex gap-4 justify-center">
                <Link href="/" className="flex sm:flex-row flex-col gap-2 font-bold text-inherit">
                    <p>Wongnok</p>
                    <p>Recipes</p>
                </Link>
                <Switch
                    isSelected={theme === "dark" ? false : true}
                    size="sm"
                    color="primary"
                    startContent={<SunIcon />}
                    endContent={<MoonIcon />}
                    onChange={() => {
                        setTheme(theme === "dark" ? "light" : "dark")
                    }}
                />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <SearchBar />
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="flex gap-2">
                    {status !== "authenticated" && (
                        <>
                            <div className="hidden sm:flex">
                                <SignInButton />
                            </div>
                            <SignUpButton />
                        </>
                    )}
                    {status === "authenticated" && (
                        <div className="flex space-x-6">
                            <CreateRecipeButton />
                            <ProfileNav />
                        </div>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}