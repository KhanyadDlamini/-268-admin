"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import CSS for styling
import { IP } from "../../../config";
import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";


export default function Register() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone_number: "",
    });

    const [message, setMessage] = useState<string | null>(null); // State for the message
    const role = "USER"; // Default role for the user
    const [userId, setUserId] = useState<string | null>(null);
    const [records, setRecords] = React.useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        setUserId(storedUserId);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (phone: string) => {
        setFormData({
            ...formData,
            phone_number: phone,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Add role dynamically to the payload
        const payload = {
            ...formData,
            role,
        };

        console.log("REGISTER COMPANY.....................", payload);

        try {
            const response = await fetch(`${IP}/registerCompany`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message); // Set success message
                setRecords([...records, payload]); // Update records with new payload
                setFormData({
                    name: "",
                    email: "",
                    phone_number: "",
                });
            } else {
                setMessage("Failed to register. Please try again."); // Set error message
            }

            // Clear the message after 4 seconds
            setTimeout(() => setMessage(null), 4000);
        } catch (error) {
            console.log("Error during registration:", error);
            setMessage("An error occurred. Please try again."); // Handle error message
            setTimeout(() => setMessage(null), 4000); // Clear message after 4 seconds
        }
    };

    return (
        <div className="relative min-h-screen">
            <Sidenav />
            <Topnav />
            <main className="ml-64 mt-16 p-6 min-h-screen">
                <form onSubmit={handleRegister} className="grid grid-cols-2 gap-8">
                    <div className="rounded-lg p-6">
                        {/* Display message if it exists */}
                        {message && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm font-medium items-center">
                                {message}
                            </div>
                        )}

                        <h2 className="text-2xl font-bold mb-6">CLIENT INFORMATION</h2>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Client Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name(s)"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Client Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Role
                            </label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-100"
                                value={role}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="phone_number"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <PhoneInput
                                country={"sz"} // Default country
                                value={formData.phone_number}
                                onChange={handlePhoneChange}
                                inputStyle={{
                                    width: "100%",
                                    padding: "1.6rem",
                                    border: "1px solid #ced4da",
                                    borderRadius: "0.25rem",
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>

                    <div className="rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">
                            +268 MANAGEMENT SYSTEM
                        </h3>
                        <div className="mt-6">
                            <h2 className="text-sm text-gray-700 font-semibold mb-4">
                                Live Easy Eswatini
                            </h2>
                            <div className="grid grid-cols-3 gap-3">
                                <img
                                    src="https://img.freepik.com/premium-vector/waving-eswatini-swaziland-flags-3d-vector-illustration-flag-eswatini_75010-17252.jpg"
                                    alt="Eswatini Coat of arms"
                                    className="w-full h-auto rounded shadow"
                                />
                                <img
                                    src="https://i.ibb.co/yYhMYqT/adaptive-icon.jpg"
                                    alt="Eswatini Flag"
                                    className="w-full h-auto rounded shadow"
                                />
                                <img
                                    src="https://i.ibb.co/ngzMF6C/pngtree-eswatini-flag-with-pole-png-image-9161665-removebg-preview.png"
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
