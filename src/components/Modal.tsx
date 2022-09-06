import React, { useContext, useState, useEffect } from "react";
import { secondsToDhms } from "@lib/helpers";

const Modal = ({ uniqueID, validInSec }) => {
	const baseURL = process.env.BASEURL || "http://localhost:3000";

	useEffect(() => {
		if (uniqueID && validInSec) {
			document.getElementById("success-modal").checked = true;
		} else {
			document.getElementById("success-modal").checked = false;
		}
	}, [uniqueID, validInSec]);

	return (
		<>
			<input type="checkbox" id="success-modal" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Your password has been safely encrypted!
					</h3>
					<p className="py-4">
						You can now share the link below with anyone you'd like. Keep in
						mind, the link will only be valid for {secondsToDhms(validInSec)}{" "}
						and once opened it will be erased forever.
					</p>
					<p className="pb-4">
						<a
							href={`${baseURL + "/pwd/" + uniqueID}`}
							className="text-blue-500"
						>
							{`${baseURL + "/pwd/" + uniqueID}`}{" "}
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
