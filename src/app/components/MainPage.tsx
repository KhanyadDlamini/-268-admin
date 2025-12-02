"use client";
import { useEffect, useState } from "react";
import { IP } from "../../config";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";

export default function MainPage() {
    const [participantsData, setParticipantsData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [message, setMessage] = useState<string | null>(null);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    // Fetch clients from backend
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${IP}/getclients`);
                const data = await response.json();
                setParticipantsData(data);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        fetchClients();
    }, []);

    const filteredData = participantsData.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value);

    const handlePagination = (page: number) => setCurrentPage(page);

    const status = "Registered";

    const handleCreateStore = async (user_id: string, email: string, name: string) => {
        setLoadingUserId(user_id);
        try {
            const response = await fetch(`${IP}/createStore`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, email, name }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Store created:", result);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setMessage(result.message);
            } else {
                alert("Failed to create store.");
            }

            setTimeout(() => setMessage(null), 4000);
        } catch (error) {
            console.error("Error creating store:", error);
            setMessage("An error occurred while creating the store.");
            setTimeout(() => setMessage(null), 4000);
        } finally {
            setLoadingUserId(null);
        }
    };

    return (
        <div className="relative">
            <Sidenav />
            <Topnav />

            <main className="ml-64 mt-16 pt-16 p-6 bg-gray-100 min-h-screen">
                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                        {message}
                    </div>
                )}

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Registered</h3>
                        <p className="text-4xl font-bold">90</p>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Sellers</h3>
                        <p className="text-4xl font-bold">160</p>
                    </div>

                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Domains</h3>
                        <p className="text-4xl font-bold">600</p>
                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Quadrant Ranking</h3>
                        <p className="text-4xl font-bold">500</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Registered Users</h2>

                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-lg w-full mb-4"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3">Client User ID</th>
                                <th className="px-6 py-3">Client Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone Number</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date Created</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((client: any, index: number) => (
                                <tr key={index} className="border-t">
                                    <td className="px-6 py-3">{client.user_id}</td>
                                    <td className="px-6 py-3">{client.name}</td>
                                    <td className="px-6 py-3">{client.email}</td>
                                    <td className="px-6 py-3">{client.phone_number}</td>
                                    <td className="px-6 py-3">{client.role}</td>
                                    <td className="px-6 py-3">{status}</td>
                                    <td className="px-6 py-3">{client.created_at}</td>

                                    <td className="px-6 py-3">
                                        <button
                                            className={`px-4 py-2 rounded-lg ${loadingUserId === client.user_id
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-500"
                                                } text-white`}
                                            onClick={() =>
                                                handleCreateStore(
                                                    client.user_id,
                                                    client.email,
                                                    client.name
                                                )
                                            }
                                            disabled={loadingUserId === client.user_id}
                                        >
                                            {loadingUserId === client.user_id ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v8z"
                                                        />
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                "Add Business"
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                                } rounded-lg`}
                            onClick={() => handlePagination(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}
