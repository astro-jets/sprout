"use client"
import { updateLesson } from "@/app/actions/Lessons";
import ErrorModal from "@/app/components/ErrorModal";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";

const CompleteBtn = ({ id }: { id: string }) => {
    const [showModal, setShowModal] = useState(false);
    const [showErrModal, setShowErrModal] = useState(false);
    const router = useRouter();
    const markComplete = async () => {
        const res = await updateLesson("complete", id);
        console.log(res)
        if (res) {
            if (res.status) { setShowModal(true); return; }
        }
        setShowErrModal(true)
    }

    return (
        <>
            <button className="flex items-center justify-center" onClick={() => { markComplete() }}>
                <BsCheck2 size={20} color="#3C50E0" />
            </button>
            <SucessModal
                title="Succefully Completed"
                message="Successfully marked the lesson as complete."
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    router.refresh();
                }}
                url=""
            />
            <ErrorModal
                title="Operation Failed"
                message="Failed to mark the lesson as complete."
                isOpen={showErrModal}
                onClose={() => {
                    setShowErrModal(false);
                    router.refresh();
                }}
                url=""
            />
        </>
    );
}

export default CompleteBtn;