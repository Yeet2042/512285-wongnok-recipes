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
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">Wongnok recipes</Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input
            placeholder="ค้นหาสูตรอาหาร"
            endContent={
                <button className="p-2">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
            }
        />
      </NavbarContent>
      <NavbarContent justify="end">
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
        <NavbarItem className="space-x-2">
            {status !== "authenticated" && (
                <>
                    <SignInButton />
                    <SignUpButton />
                </>
            )}
            {status === "authenticated" && (
                <>
                    <ProfileNav />
                </>
            )}
            
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}