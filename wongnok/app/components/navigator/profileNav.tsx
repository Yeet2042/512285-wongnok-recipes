import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from '@nextui-org/react';
import { AdjustmentsHorizontalIcon, ArrowRightStartOnRectangleIcon, ChatBubbleLeftEllipsisIcon, ChevronDownIcon, IdentificationIcon } from '@heroicons/react/24/solid';

type Props = {}

export default function ProfileNav({}: Props) {
    const { data: session, status } = useSession()

    return (
        status === 'authenticated' &&
        session.user && (
        <>
            <div className="flex items-center gap-4">
                <Dropdown placement="bottom-end" backdrop="blur">
                    <DropdownTrigger>
                        <div className="flex items-center gap-2">
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    radius: "md",
                                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                }}
                                className="transition-transform"
                                description={session.user.role}
                                name={session.user.username}
                            />
                            <ChevronDownIcon className="h-6 w-6"/>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem href="/profile" key="profile" color="primary" className="h-14 gap-2 text-primary" startContent={ <IdentificationIcon className="h-6 w-6" /> }>
                        <p className="font-bold text-lg">ดูโปรไฟล์ของฉัน</p>
                    </DropdownItem>
                    <DropdownItem href="/setting" key="configurations" className="p-2" startContent={ <AdjustmentsHorizontalIcon className="h-5 w-5" /> }>
                        ตั้งค่า
                    </DropdownItem>
                    <DropdownItem href="/help" key="help_and_feedback" className="p-2" startContent={ <ChatBubbleLeftEllipsisIcon className="h-5 w-5" /> }>
                        ความช่วยเหลือและข้อเสนอแนะ
                    </DropdownItem>
                    <DropdownItem 
                        key="logout" 
                        color="danger" 
                        className="text-danger p-2" 
                        startContent={ <ArrowRightStartOnRectangleIcon className="h-5 w-5" /> }
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        ออกจากระบบ
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
        )
    )
}