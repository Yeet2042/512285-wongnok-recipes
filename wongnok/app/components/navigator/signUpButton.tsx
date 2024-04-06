"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, user} from "@nextui-org/react";
import { UserIcon, EnvelopeIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/solid';

type Props = {}

export default function SignUpButton({}: Props) {
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [username, setUsername] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [conPassword, setConPassword] = useState<string | undefined>(undefined)
    const [terms, setTerms] = useState(false)
    
    const handleSubmit = async () => {
        if (password !== conPassword) {
            return
        }
        if (!terms) {
            return
        }
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            if ( res.status === 400 ) {
                alert('Username or email already exists')
                return
            } if ( res.status === 422 ) {
                alert('Invalid Data')
                return
            } if (res.ok) {
                alert('Sign up successful')
                router.push("/")
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Button 
                onPress={onOpen}
                color="primary"
                className="text-lg font-bold"
            >สมัครสมาชิก</Button>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center text-2xl font-bold m-7">สมัครสมาชิก</ModalHeader>
                            <ModalBody>
                                <Input
                                    isRequired
                                    endContent={
                                        <UserIcon className="h-6 w-6" />
                                    }
                                    label="ชื่อผู้ใช้"
                                    placeholder="กรุณาใส่ชื่อผู้ใช้ของคุณ"
                                    variant="bordered"
                                    type="email"
                                    value={username}
                                    onValueChange={setUsername}
                                />
                                <Input
                                    isRequired
                                    endContent={
                                        <EnvelopeIcon className="h-6 w-6" />
                                    }
                                    label="อีเมลล์"
                                    placeholder="กรุณาใส่อีเมลล์ของคุณ"
                                    variant="bordered"
                                    type="email"
                                    value={email}
                                    onValueChange={setEmail}
                                />
                                <Input
                                    isRequired
                                    endContent={
                                        <LockClosedIcon className="h-6 w-6" />
                                    }
                                    label="รหัสผ่าน"
                                    placeholder="กรุณาใส่รหัสผ่านของคุณ"
                                    variant="bordered"
                                    type="password"
                                    value={password}
                                    onValueChange={setPassword}
                                />
                                <Input
                                    isRequired
                                    endContent={
                                        <KeyIcon className="h-6 w-6" />
                                    }
                                    label="ยืนยันรหัสผ่าน"
                                    placeholder="กรุณายืนยันรหัสผ่านของคุณ"
                                    variant="bordered"
                                    type="password"
                                    value={conPassword}
                                    onValueChange={setConPassword}
                                />
                                <div className="flex justify-start">
                                    <Checkbox
                                        isRequired
                                        classNames={{
                                        label: "text-small",
                                        }}
                                        onChange={() => setTerms(!terms)}
                                    >
                                        <p>ฉันยอมรับข้อกำหนดการใช้งาน</p> และ นโยบายความเป็นส่วนตัว
                                    </Checkbox>
                                </div>
                                {password !== conPassword && (
                                    <span className="text-red-600">ยืนยันรหัสผ่านไม่ถูกต้อง</span>
                                )}
                            </ModalBody>
                            <ModalFooter className="flex flex-col justify-center items-center">
                                <Button 
                                    color="primary" 
                                    className="w-full text-lg font-bold"
                                    onPress={handleSubmit}
                                >
                                    สมัครสมาชิก
                                </Button>
                                <div className="flex space-x-2 pt-3">
                                    <p>มีบัญชีผู้ใช้แล้ว?</p>
                                    <Link 
                                        color="primary" 
                                        onPress={() => {
                                            onClose()
                                        }}
                                    >
                                        เข้าสู่ระบบ
                                    </Link>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}