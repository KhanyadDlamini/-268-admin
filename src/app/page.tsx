"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import "react-phone-input-2/lib/style.css"; // Make sure to import the CSS for styling

export const IP = process.env.NEXT_PUBLIC_API_IP;

export default function LoginPage() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null); // State to hold the message
  const router = useRouter();

  // Background images
  const backgroundImages = [
    "https://i.ibb.co/yYhMYqT/adaptive-icon.jpg",
  ];

  useEffect(() => {
    // Auto-slide images
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 15000);

    return () => clearInterval(interval); // Clean up interval
  }, [backgroundImages.length]);

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      router.push("/administrator");
    }
  }, [router]);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!user_id || !password) {
      setMessage("Please enter both user_id and password.");
      setTimeout(() => setMessage(null), 10000); // Hide the message after 10 seconds
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_IP}/authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setMessage(data.message);
        setTimeout(() => setMessage(null), 4000); // Hide the message after 10 seconds
        router.push("/administrator");
        // Store user_id in localStorage
        localStorage.setItem("user_id", data.user.user_id);

        // Redirect based on role
        if (data.user.role === "admin") {
          router.push("/administrator");
        } else {
        }
      } else {
        // Handle invalid login attempt
        setMessage(data.error || "Login failed");
        setTimeout(() => setMessage(null), 4000); // Hide the message after 10 seconds
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
      setTimeout(() => setMessage(null), 4000); // Hide the message after 10 seconds
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("user_id");
    router.push("/login");
  };

  const texts = [
    "© 2025 All Rights Reserved. Kingdom of Eswatini",
    "+268, Live Easy Eswatini",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState("enter"); // "enter", "center", "exit"

  useEffect(() => {
    const handleAnimation = async () => {
      setAnimationState("enter");
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Enter animation duration
      setAnimationState("center");
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Wait in center
      setAnimationState("exit");
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Exit animation duration
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    };

    handleAnimation();
  }, [currentTextIndex]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Left Section */}
        <div
          className="w-1/2 flex items-center justify-center"
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 5s ease-in-out",
          }}
        ></div>

        {/* Right Section */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <div className="w-3/4">
            {/* Display the message */}
            {message && (
              <div className="bg-yellow-500 text-black text-center py-2 mb-6 rounded">
                {message}
              </div>
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-10">+268 ADMIN PORTAL</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="user_id"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  ADMIN ID
                </label>
                <div className="flex items-center border border-gray-300 rounded">
                  <div className="px-3 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    id="user_id"
                    name="user_id"
                    placeholder="Enter Admin ID"
                    className="w-full px-3 py-2 focus:outline-none"
                    value={user_id}
                    onChange={(e) => setUser_id(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="user_id"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  PASSWORD
                </label>
                <div className="flex items-center border border-gray-300 rounded">
                  <div className="px-3 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full px-3 py-2 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center mb-4">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-slate-300 text-white py-2 rounded hover:bg-blue-600"
              >
                Sign In
              </button>
              {/* Additional Links */}
              <div className="text-center mt-4 text-sm">
              </div>
              <p className="text-xs text-gray-600 mt-4">
                By clicking "Sign in now" you agree to our{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>.
              </p>
              <div className="mt-6">
                <h2 className="text-sm text-gray-700 font-semibold mb-4">
                  Live Easy Eswatini
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  <img
                    src="https://img.freepik.com/premium-vector/waving-eswatini-swaziland-flags-3d-vector-illustration-flag-eswatini_75010-17252.jpg"
                    alt="Eswatini Flag"
                    className="w-full h-auto rounded shadow"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-center py-7 h-27 relative overflow-hidden">
        {texts.map((text, index) => (
          <p
            key={index}
            className={`absolute w-full text-gray-600 text-sm transform transition-all duration-1000 ease-in-out ${index === currentTextIndex
              ? animationState === "enter"
                ? "translate-y-full opacity-0"
                : animationState === "center"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[-100%] opacity-0"
              : "hidden"
              }`}
          >
            {text}
          </p>
        ))}
      </footer>
    </div>
  );
}
