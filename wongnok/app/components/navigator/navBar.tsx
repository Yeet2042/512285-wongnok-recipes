"use client"
import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch, Input, button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
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
    
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null
    return (
        <Navbar className="p-2">
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand className="flex gap-4">
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
            <NavbarContent justify="end">
                <NavbarItem className="hidden sm:flex">
                    <SearchBar />
                </NavbarItem>
                <NavbarItem className="gap-2">
                    {status !== "authenticated" && (
                        <div className="hidden sm:flex">
                            <SignInButton />
                            <SignUpButton />
                        </div>
                    )}
                    {status === "authenticated" && (
                        <div className="flex space-x-6">
                            <div className="hidden sm:flex">
                                <CreateRecipeButton />
                            </div>
                            <ProfileNav />
                        </div>
                    )}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="flex flex-col items-center justify-center">
                {status !== "authenticated" && (
                    <>
                        <NavbarMenuItem>
                            <SignInButton />
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <SignUpButton />
                        </NavbarMenuItem>
                    </>
                )}
                {status === "authenticated" && (
                    <>
                        <SearchBar />
                        <CreateRecipeButton />
                    </>
                )}
            </NavbarMenu>
        </Navbar>
    )
}