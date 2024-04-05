"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

type Props = {}

export default function SignInButton({}: Props) {
    const router = useRouter()
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [email, setEmail] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)
    
    const handleSubmit = async () => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            if (result?.error) {
                alert("Invalid email or password")
            } else {
                router.push('/profile')
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <Button 
                onPress={onOpen}
                color="primary"
                variant="light"
                className="text-lg font-bold"
            >เข้าสู่ระบบ</Button>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-center text-2xl font-bold m-7">เข้าสู่ระบบ</ModalHeader>
                            <ModalBody>
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
                                    label="พาสเวิร์ด"
                                    placeholder="กรุณาใส่พาสเวิร์ดของคุณ"
                                    variant="bordered"
                                    type="password"
                                    value={password}
                                    onValueChange={setPassword}
                                />
                                <div className="flex justify-end">
                                    <Link color="primary" href="/" size="sm">
                                        ลืมรหัสผ่าน?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex flex-col justify-center items-center">
                                <Button 
                                    type="submit"
                                    color="primary"
                                    className="w-full text-lg font-bold"
                                    onPress={handleSubmit}
                                >
                                    เข้าสู่ระบบ
                                </Button>
                                <div className="flex space-x-2 pt-3">
                                    <p>ยังไม่มีบัญชีผู้ใช้?</p>
                                    <Link 
                                        color="primary" 
                                        onPress={() => {
                                            onClose()
                                        }}
                                    >
                                        สมัครสมาชิก
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