import Link from 'next/link'; // Import Link
import { useState } from 'react'; // Import useState for dropdown toggle
import { FaFile, FaHome } from 'react-icons/fa';

export default function Sidenav() {
    // Define the allowed links
    const allowedLinks = ['/main', '/register'];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

    return (
        <aside className="w-64 bg-black text-white flex flex-col h-screen fixed top-0 left-0 shadow-lg">
            {/* Sidebar Header */}
            <h2 className="text-xl font-bold py-6 px-6 border-b border-gray-700 text-gray-100">
                Admin Dashboard
            </h2>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-3 p-4">
                    {/* Image Icon */}
                    <img
                        src="https://i.ibb.co/yYhMYqT/adaptive-icon.jpg"
                        alt="Register Icon"
                        className="w-100 h-100 mb-2"
                    />
                    <li>
                        <Link href="/administrator">
                            <button
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-all flex items-center"
                            >
                                <FaHome className="w-5 h-5 mr-3" />
                                <span className="font-medium text-sm">DASHBOARDD</span>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-all flex items-center"
                        >
                            <FaFile className="w-5 h-5 mr-3" />
                            <span className="font-medium text-sm">VIEW PORTAL</span>
                            <span className="ml-auto">{isDropdownOpen ? '▲' : '▼'}</span>
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-40' : 'max-h-0'
                                }`}
                        >
                            <ul className="bg-gray-700 rounded-md mt-2 space-y-2 p-3">

                                <>
                                    <li>
                                        <Link href="/company">
                                            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm">
                                                Register Company Owners
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/company">
                                            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm">
                                                Mantain Subscriptions
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            </ul>
                        </div>
                    </li>
                    <img
                        src="https://i.ibb.co/NSjNGYj/istockphoto-1334442126-612x612-removebg-preview.png"
                        alt="Register Icon"
                        className="w-100 h-100 mb-2"
                    />
                </ul>
            </nav>
        </aside>
    );
}
