"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    const [verify, setVerify] = useState<string[]>(Array(6).fill(""));


    // Background images
    const backgroundImages = [
        "https://media.istockphoto.com/id/176203653/photo/elephant-push-marula-tree.jpg?s=612x612&w=0&k=20&c=YWkEPs6P7JI7UbE8fnuFclK_GNCTVeU0s63J1lsKWdk=",
        "https://pbs.twimg.com/media/GHSJ3LxWEAAXdoJ?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/ELrVlM7WwAULvcf.jpg",
        "https://eswatinipositivenews.com/wp-content/uploads/2022/09/trtrr.png",
    ];

    useEffect(() => {
        // Set up an interval to auto-slide images
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 15000); // Change every 15 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [backgroundImages.length]);


    const handleInputChange = (value: string, index: number) => {
        if (value.length <= 1) {
            const updatedVerify = [...verify];
            updatedVerify[index] = value;
            setVerify(updatedVerify);

            // Automatically move to the next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) (nextInput as HTMLInputElement).focus();
            }
        }
    };

    const handleVerify = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const code = verify.join(""); // Combine all input values
        console.log("Verify Email Code:", code);

        if (code.length === 6) {
            router.push("/main");
        } else {
            alert("Please complete the verification code.");
        }
    };

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
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">TEMASIKO MANAGEMENT SYSTEM</h1>
                        <form onSubmit={handleVerify}>
                            {/* Email Verification Fields */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Phone SMS Verification
                                </label>
                                <div className="flex space-x-2 justify-center">
                                    {verify.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`code-${index}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleInputChange(e.target.value, index)}
                                            className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-slate-300 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Verify now
                            </button>
                            {/* Additional Links */}
                            <div className="text-center mt-4 text-sm">
                                <a href="#" className="text-blue-500 hover:underline">
                                    Forgot Password?
                                </a>
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
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-200 text-center py-4">
                <p className="text-gray-600 text-sm">
                    © {new Date().getFullYear()} All Rights Reserved. Powered By RSTP
                </p>
            </footer>
        </div>
    );
}
