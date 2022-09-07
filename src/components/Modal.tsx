import { secondsToDhms } from "@lib/helpers";
import React, { useEffect } from "react";

type ModalProps = {
    uniqueID: string;
    validInSec: number;
};

const Modal: React.ElementType<ModalProps> = ({ uniqueID, validInSec }) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
            <label htmlFor="success-modal" className="hidden">
                Toggling Modal
            </label>
            <input
                type="checkbox"
                id="success-modal"
                className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Your password has been safely encrypted!
                    </h3>
                    <p className="py-4">
                        You can now share the link below with anyone you would
                        like. Keep in mind, the link will only be valid for{" "}
                        {secondsToDhms(validInSec)} and once opened it will be
                        erased forever.
                    </p>
                    <p className="pb-4">
                        <a
                            href={`${baseURL + "/pwd/" + uniqueID}`}
                            className="text-blue-500"
                        >
                            {`${baseURL + "/pwd/" + uniqueID}`}
                        </a>
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button className="btn btn-ghost">Cancel</button>
                        <button className="btn btn-primary">Copy</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
