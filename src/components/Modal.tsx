import { secondsToDhms } from "@lib/helpers";
import React, { useEffect } from "react";

type ModalProps = {
    uniqueID: string;
    validInSec: number;
};

const Modal: React.ElementType<ModalProps> = ({ uniqueID, validInSec }) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const toggleModal = () => {
        const modal = document.getElementById(
            "success-modal"
        ) as HTMLInputElement | null;
        modal.checked = !modal.checked;
    };

    const copyToClipboard = (e) => {
        // Write to clipboard and show notification
        navigator.clipboard.writeText(`${baseURL}/pwd/${uniqueID}`);
        e.target.innerHTML = "Copied!";
        e.target.classList.add("btn-success");

        // After 2 seconds, change the text back
        setTimeout(() => {
            e.target.classList.remove("btn-success");
            e.target.innerHTML = "Copy URL";
        }, 2000);
    };

    useEffect(() => {
        // Get the modal
        const modal = document.getElementById(
            "success-modal"
        ) as HTMLInputElement | null;
        if (uniqueID && validInSec && modal) {
            modal.checked = true;
        } else {
            modal.checked = false;
        }
    }, [uniqueID, validInSec]);

    return (
        <>
            <label htmlFor="success-modal" style={{ opacity: 0 }}>
                Toggling Modal
            </label>
            <input
                type="checkbox"
                id="success-modal"
                className="modal-toggle"
            />
            <label
                htmlFor="success-modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <label className="modal-box w-full relative" htmlFor="">
                    <h3 className="font-bold text-lg">
                        Your password has been safely encrypted!
                    </h3>
                    <p className="py-4">
                        You can now share the link below with anyone you would
                        like. Keep in mind, the link will only be valid for{" "}
                        {secondsToDhms(validInSec)} and once opened it will be
                        erased forever.
                    </p>
                    <p className="pb-4 break-all text-blue-500">{`${
                        baseURL + "/pwd/" + uniqueID
                    }`}</p>
                    <div className="flex justify-end space-x-3">
                        <button className="btn btn-ghost" onClick={toggleModal}>
                            Okay
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => copyToClipboard(e)}
                        >
                            Copy URL
                        </button>
                    </div>
                </label>
            </label>
        </>
    );
};

export default Modal;
