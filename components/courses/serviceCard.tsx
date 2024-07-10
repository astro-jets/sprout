"use client"
import Paywall from "@/app/components/Paywall";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ServiceCard = ({ id, price, icon, title, details }: { id: string; price: string; icon: JSX.Element; title: string; details: string }) => {
    const { data: session, status } = useSession();
    const paywallData = { id, price, title, details }
    const [showPay, setShowPay] = useState(false);
    const handleSignup = async () => {
        if (!session?.user) {
            return;
        }
        setShowPay(true)
    }
    return (
        <>
            <Paywall course={paywallData} isOpen={showPay} onClose={() => { setShowPay(!showPay) }} />
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-9 rounded-[20px] bg-white p-4 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
                    <div className="mb-8 overflow-hidden flex h-60 w-full items-center justify-center rounded-xl">
                        {icon}
                    </div>
                    <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
                        {title}
                    </h4>
                    <p className="text-primary text-lg">K {parseInt(price).toLocaleString()}</p>
                    <p className="text-dark-6">{details}</p>
                    <button className="bg-primary p-2 w-full rounded-md  text-white"
                        onClick={() => { handleSignup() }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
};
export default ServiceCard;