'use client'

import { usePathname } from 'next/navigation'

export default function AppointmentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isCallOrChat = pathname?.includes('call') || pathname?.includes('messages')

    if (isCallOrChat) {
        return children
    }

    return <div className="p-4 lg:p-8">{children}</div>
}
