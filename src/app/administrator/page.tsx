"use client";
import { useEffect, useState } from "react";
import { IP } from "../../../config";
import Sidenav from "../sidenav/page";
import Topnav from "../topnav/page";

export default function MainPage({ clients }: { clients: { user_id: string; email: string; name: string }[] | undefined }) {
    const [participantsData, setParticipantsData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [message, setMessage] = useState<string | null>(null);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
    useEffect(() => {
        console.log(clients); // Debugging: Check if `clients` is fetched or passed correctly
    }, [clients]);
    // Fetch data from the server
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${IP}/getclients`); // Adjust the URL if needed
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
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value);
    const handlePagination = (page: number) => setCurrentPage(page);

    const status = "Registered"


    const handleCreateStore = async (user_id: string, email: string, name: string) => {
        setLoadingUserId(user_id);
        try {
            const response = await fetch(`${IP}/createStore`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, email, name }), // Send only user_id
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Store created successfully:", result);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setMessage(result.message);
            } else {
                console.error("Failed to create store:", response.statusText);
                alert("Failed to create store.");
            }
            setTimeout(() => setMessage(null), 4000);
        } catch (error) {
            console.error("Error creating store:", error);
            setMessage("An error occurred while creating the store.");
            setTimeout(() => setMessage(null), 4000);
        } finally {
            setLoadingUserId(null); // Hide loading indicator
        }
    };





    return (
        <div className="relative">
            <Sidenav />
            <Topnav />

            {/* Main content with padding to prevent overlap */}
            <main className="ml-64 mt-16 pt-16 p-6 bg-gray-100 min-h-screen">
                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm font-medium items-center">
                        {message}
                    </div>
                )}
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Registered Users Card */}
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Registered</h3>
                        <p className="text-4xl font-bold">90 </p>
                    </div>

                    {/* Other cards */}
                    {/* Example for another card */}
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Registered</h3>
                        <p className="text-4xl font-bold">160</p>
                    </div>

                    {/* Total Sub-Domains Card */}
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Registered</h3>
                        <p className="text-4xl font-bold">600</p>
                    </div>

                    {/* Quadrant Rating Card */}
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Total Registered</h3>
                        <p className="text-4xl font-bold">500</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Registered Users</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border rounded-lg w-full"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client User ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date Created</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((client, index) => (
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
                                            key={client.user_id}
                                            className={`px-4 py-2 rounded-lg ${loadingUserId === client.user_id ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                                                } text-white`}
                                            onClick={() => handleCreateStore(client.user_id, client.email, client.name)}
                                            disabled={loadingUserId === client.user_id} // Disable only the clicked button
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
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v8z"
                                                        ></path>
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

                {/* Pagination */}
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
