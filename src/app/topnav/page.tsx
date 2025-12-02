import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Topnav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [roleId, setRoleId] = useState<number | null>(null);
    const [region, setRegion] = useState<string | null>(null);
    const [constituency, setConstituency] = useState<string | null>(null);
    const [chiefdom, setChiefdom] = useState<string | null>(null);
    const router = useRouter();


    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear all stored data
        alert("Session destroyed. Redirecting to login...");
        router.push("/");
    };

    return (
        <header className="bg-black text-white py-4 px-6 shadow w-full z-10 fixed top-0 left-0 flex justify-between items-center">
            {/* Dynamic Portal Title */}
            <h1 className="text-2xl font-bold">+268 ADMIN PORTAL</h1>

            {/* User Profile Section */}
            <div className="relative">
                <button
                    className="flex items-center space-x-2 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <FaUserCircle className="text-3xl" />
                    <span className="text-sm font-medium">Admin</span>
                </button>
                <div
                    className={`absolute right-0 mt-2 w-48 bg-slate-50 text-gray-800 shadow-lg transition-all duration-300 transform ${menuOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}
                    style={{
                        clipPath: "polygon(95% 0%, 100% 10%, 100% 100%, 0% 100%, 0% 0%)",
                        borderRadius: "10px",
                    }}
                >
                    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                        <FaCog className="inline-block mr-2" />
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                        <FaSignOutAlt className="inline-block mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
