"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import CSS for styling
import { IP } from "../../../config";
import Sidenav from "../sidenav/page";
import Topnav from "../topnav/page";

export default function Register() {
    const [formData, setFormData] = React.useState({
        pin: "",
        first_name: "",
        surname: "",
        gender: "",
        dob: "",
        phone_number: "",
        next_of_kin_name: "",
        region: "",
        constituency: "",
        chiefdom: "",
        next_of_kin_phone_number: "",
        relation: "",
        userId: "",
    });

    const [phone_number, setPhone_number] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [region, setRegion] = useState<string>("");
    const [constituency, setConstituency] = useState<string>("");
    const [chiefdom, setChiefdom] = useState<string>("");
    const [records, setRecords] = React.useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        setUserId(storedUserId);

        if (storedUserId) {
            fetchUserInfo(storedUserId);
        }
    }, []);

    const fetchUserInfo = async (userId: string) => {
        try {
            const response = await fetch(`${IP}/getUserInfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (response.ok) {
                const data = await response.json();
                setRegion(data.region);
                setConstituency(data.constituency);
                setChiefdom(data.chiefdom);
            } else {
                console.error("Failed to fetch user info");
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            phone_number,
            region,
            constituency,
            chiefdom,
            userId,
        };

        try {
            const response = await fetch(`${IP}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                alert("Registration successful!");

                setRecords([...records, payload]);
                setFormData({
                    pin: "",
                    first_name: "",
                    surname: "",
                    gender: "",
                    dob: "",
                    phone_number: "",
                    next_of_kin_name: "",
                    region: "",
                    constituency: "",
                    chiefdom: "",
                    next_of_kin_phone_number: "",
                    relation: "",
                    userId: "",
                });
                setPhone_number("");
                console.log("checking user_id....", formData)
            } else {
                alert("Failed to register. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="relative min-h-screen">
            <Sidenav />
            <Topnav />
            <main className="ml-64 mt-16 p-6 min-h-screen flex gap-8">
                <form onSubmit={handleRegister} className="w-1/2 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">PARTICIPANT INFORMATION</h2>
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            ID Number
                        </label>
                        <input
                            type="text"
                            id="pin"
                            name="pin"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your pin number"
                            value={formData.pin}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                            Name(s)
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name(s)"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                            Surname
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="M or F"
                            value={formData.gender}
                            onChange={(e) => {
                                const input = e.target.value;

                                // Regex to match M or F only
                                const regex = /^[MF]$/;

                                if (regex.test(input.toUpperCase())) { // Convert input to uppercase for case insensitivity
                                    setFormData((prev) => ({ ...prev, gender: input.toUpperCase() }));
                                }
                            }}
                        // required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="text"
                            id="dob"
                            name="dob"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="YYYY-MM-DD"
                            value={formData.dob}
                            onChange={(e) => {
                                const input = e.target.value;

                                // Regex to match YYYY-MM-DD format
                                const regex = /^\d{0,4}(-\d{0,2}(-\d{0,2})?)?$/;

                                if (regex.test(input)) {
                                    setFormData((prev) => ({ ...prev, dob: input }));
                                }
                            }}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <PhoneInput
                            country={'sz'} // Default country
                            value={phone_number}
                            onChange={(phone) => setPhone_number(phone)}
                            inputStyle={{
                                width: '100%',
                                padding: '1.6rem',
                                border: '1px solid #ced4da',
                                borderRadius: '0.25rem'
                            }}
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-4">LOCATION INFORMATION</h3>

                    <div className="mb-4">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Region | Sifundza
                        </label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Region"
                            value={region.toUpperCase()}
                            onChange={handleInputChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="constituency" className="block text-sm font-medium text-gray-700">
                            Constituency | Inkhundla
                        </label>
                        <input
                            type="text"
                            id="constituency"
                            name="constituency"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Constituency"
                            value={constituency.toUpperCase()}
                            onChange={handleInputChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="chiefdom" className="block text-sm font-medium text-gray-700">
                            Chiefdom | Umphakatsi
                        </label>
                        <input
                            type="text"
                            id="chiefdom"
                            name="chiefdom"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Chiefdom"
                            value={chiefdom.toUpperCase()}
                            onChange={handleInputChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className="w-1/2 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">NEXT OF KIN INFORMATION</h3>

                        <div className="mb-4">
                            <label htmlFor="next_of_kin_name" className="block text-sm font-medium text-gray-700">
                                Next Of Kin Name
                            </label>
                            <input
                                type="text"
                                id="next_of_kin_name"
                                name="next_of_kin_name"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Next Of Kin Name"
                                value={formData.next_of_kin_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="next_of_kin_phone_number" className="block text-sm font-medium text-gray-700">
                                Next Of Kin Phone Number
                            </label>
                            <input
                                type="text"
                                id="next_of_kin_phone_number"
                                name="next_of_kin_phone_number"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Next Of Kin Phone Number"
                                value={formData.next_of_kin_phone_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="relation" className="block text-sm font-medium text-gray-700">
                                Relation
                            </label>
                            <input
                                type="text"
                                id="relation"
                                name="relation"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Relation"
                                value={formData.relation}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button><br></br><br></br><br></br>
                        <h3 className="text-xl font-bold mb-4">TEMASIKO MANAGEMENT SYSTEM</h3>
                        {/* Sponsored Images Section */}
                        <div className="mt-6">
                            <h2 className="text-sm text-gray-700 font-semibold mb-4">
                                Imihambo nemasiko Eswatini
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp4Tcg71IEIm3jhh8tBXxAVFiSezvyslpi5Q&s"
                                    alt="Eswatini Coat of arms"
                                    className="w-full h-auto rounded shadow"
                                />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Eswatini_with_Lighter_Colors.svg/158px-Flag_of_Eswatini_with_Lighter_Colors.svg.png"
                                    alt="Eswatini Flag"
                                    className="w-full h-auto rounded shadow"
                                />
                            </div>
                        </div>
                    </div>
                </form>

            </main>
        </div>
    );
}
