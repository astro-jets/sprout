"use client"

import Link from "next/link";
const Sidebar = () => {
    return (
        <div className="fixed left-0 w-1/5 hidden md:flex flex-col items-center h-screen bg-[#111]">
            <div className="w-[70%] py-4 text-white space-y-6 flex flex-col items-start">
                <Link href={'/dashboard'}>Dashboard</Link>
                <Link href={'/sensors'}>Sensors</Link>
                <Link href={'/controls'}>controls</Link>
                <Link href={'/reports'}>reports</Link>
                <Link href={'/reports'}>settings</Link>
            </div>
        </div>
    );
}

export default Sidebar;