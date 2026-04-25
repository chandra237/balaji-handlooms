import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthModal({ onClose, onSuccess }) {

    const [mode, setMode] = useState("login");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white p-6 pt-8 rounded-xl w-[380px] relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-lg"
                >
                    ✕
                </button>

                {/* Toggle */}
                <div className="flex my-4">
                    <button
                        onClick={() => setMode("login")}
                        className={`flex-1 py-2 rounded-lg ${
                            mode === "login" ? "bg-black text-white" : "border"
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setMode("signup")}
                        className={`flex-1 py-2 rounded-lg ${
                            mode === "signup" ? "bg-black text-white" : "border"
                        }`}
                    >
                        Signup
                    </button>
                </div>

                {/* Forms */}
                {mode === "login" ? (
                    <LoginForm onSuccess={onSuccess} />
                ) : (
                    <SignupForm onSuccess={() => setMode("login")} />
                )}
            </div>
        </div>
    );
}

export default AuthModal;