import React, { useState } from "react";
import ReactGA from "react-ga";
import { useEffect } from "react";

type PasswordFormProps = {
    setUniqueID: (id: string) => void;
    setValidInSec: (validInSec: number) => void;
};

const validTimeMapping = {
    0: 600,
    25: 3600,
    50: 28800,
    75: 86400,
    100: 259200,
};

const PasswordForm: React.ElementType<PasswordFormProps> = ({
    setUniqueID,
    setValidInSec,
}) => {
    const [error, setError] = useState<string>("");
    const [charCount, setCharCount] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    const [validTime, setValidTime] = useState<number>(25);
    const [loading, setLoading] = useState<boolean>(false);

    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [passwordLength, setPasswordLength] = useState<number>(30);
    const [passwordType, setPasswordType] = useState<string>(
        "symbols and numbers"
    );
    const [lengthHintClass, setLengthHintClass] = useState<string>("");

    useEffect(() => {
        if (passwordLength <= 12) {
            setLengthHintClass("text-error");
        } else if (passwordLength < 25) {
            setLengthHintClass("text-warning");
        } else {
            setLengthHintClass("text-success");
        }
    }, [passwordLength]);

    useEffect(() => {
        setCharCount(password.length);
    }, [password]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.replace(/\s/g, ""));
        setError("");
    };

    const generatePassword = async () => {
        setIsGenerating(true);

        // Generates a random password
        const randomPassword = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/generatePassword",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    length: passwordLength,
                    type: passwordType,
                }),
            }
        ).then((res) => res.json());
        setPassword(randomPassword);

        setIsGenerating(false);
    };

    const generateLink = async () => {
        setLoading(true);

        ReactGA.event({
            category: "Home",
            action: "create_password_link",
            label: "Create Password Link",
        });

        if (password === "") {
            setLoading(false);
            return setError("Password cannot be empty");
        }

        const validInSec = validTimeMapping[validTime];

        // Hash password
        const res = await fetch("/api/encryption", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                validInSec,
            }),
        });
        const data = await res.json();
        const uniqueID = data.uniqueID;

        setUniqueID(uniqueID);
        setValidInSec(validInSec);
        setPassword("");
        setLoading(false);
    };

    return (
        <div className="w-full">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">
                                Fill in your password, or...
                            </span>
                            <button
                                onClick={() => generatePassword()}
                                className={`btn btn-primary text-xs py-0 h-8 min-h-0 ${
                                    isGenerating ? "loading" : ""
                                }`}
                            >
                                {isGenerating
                                    ? "Generating..."
                                    : "Generate password"}
                            </button>
                        </label>
                        <input
                            type="text"
                            maxLength={100}
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            placeholder="This is my super secret password"
                            disabled={loading}
                            className={`input input-bordered w-full ${
                                error ? "input-error" : ""
                            }`}
                        />
                        <label className="label pb-0">
                            <span className="label-text-alt text-error">
                                {error}
                            </span>
                            <span className="label-text-alt">
                                {charCount}/50
                            </span>
                        </label>
                    </div>

                    {/* Start password customizer */}
                    <div className="form-control">
                        <div className="form-control">
                            <label htmlFor="passwordLength" className="label">
                                <span className="label-text">
                                    Password length (
                                    <span className={lengthHintClass}>
                                        {passwordLength} characters
                                    </span>
                                    )
                                </span>
                            </label>
                            <input
                                id="passwordLength"
                                type="range"
                                min="10"
                                max="50"
                                className="range"
                                step="2"
                                disabled={loading}
                                onChange={(e) =>
                                    setPasswordLength(parseInt(e.target.value))
                                }
                                value={passwordLength}
                            />
                            <div className="w-full flex justify-between text-xs px-2">
                                <span className="mt-2">10</span>
                                <span className="mt-2">20</span>
                                <span className="mt-2">30</span>
                                <span className="mt-2">40</span>
                                <span className="mt-2">50</span>
                            </div>
                        </div>
                        <div className="form-control my-2">
                            <label className="label">
                                <span className="label-text">
                                    Special characters
                                </span>
                            </label>
                            <select
                                className="select w-full bg-slate-50"
                                value={passwordType}
                                onChange={(e) =>
                                    setPasswordType(e.target.value)
                                }
                            >
                                <option selected value="symbols and numbers">
                                    Symbols and numbers
                                </option>
                                <option>None</option>
                                <option value="symbols">Symbols</option>
                                <option value="numbers">Numbers</option>
                            </select>
                        </div>
                    </div>
                    {/* End password customizer */}

                    <div className="form-control">
                        <label htmlFor="validTime" className="label">
                            <span className="label-text">
                                How long should the link be valid?
                            </span>
                        </label>
                        <input
                            id="validTime"
                            type="range"
                            min="0"
                            max="100"
                            className="range"
                            step="25"
                            disabled={loading}
                            onChange={(e) =>
                                setValidTime(parseInt(e.target.value))
                            }
                            value={validTime}
                        />
                        <div className="w-full flex justify-between text-xs px-2">
                            <span className="-ml-6 mt-2">10 minutes</span>
                            <span className="-ml-5 mt-2">1 hour</span>
                            <span className="-ml-2 mt-2">8 hours</span>
                            <span className="mt-2">1 day</span>
                            <span className="-mr-3 mt-2">3 days</span>
                        </div>
                    </div>
                    <div className="form-control w-full mt-8">
                        <button
                            onClick={() => generateLink()}
                            className={`btn btn-primary ${
                                loading ? "loading" : ""
                            }`}
                        >
                            Generate link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordForm;
