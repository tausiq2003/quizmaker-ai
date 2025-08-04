import React from "react";
import { IoEye, IoEyeOff, IoLogoGoogle } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router";

function Login() {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");
    const navigate = useNavigate();

    const validatePassword = (pwd: string): boolean => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(pwd) && pwd !== email;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!validatePassword(password)) {
            setError(
                "Password must be at least 8 characters long, not the same as email, and contain an uppercase letter, lowercase letter, number, and special character.",
            );
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Login failed");
            } else {
                alert("Logged in successfully");
            }
        } catch {
            setError("An error occurred while logging in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-1/2 mx-auto mt-16 h-full">
            <Card className="shadow-md border bg-background text-foreground">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="text-sm text-destructive bg-destructive/10 border border-destructive rounded px-3 py-2">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute top-2.5 right-3 text-muted-foreground hover:text-foreground"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className=" rounded-full px-10 mt-4"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                    <div className="flex items-center gap-1 my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="text-sm text-gray-600">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            className="rounded-full px-20 py-5 mt-4 bg-white text-black shadow-md hover:bg-gray-100 transition-colors duration-200"
                        >
                            <IoLogoGoogle className="inline mr-2" />
                            Sign in with Google
                        </Button>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer hover:underline"
                                onClick={() => navigate("/register")}
                            >
                                Register here
                            </span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
