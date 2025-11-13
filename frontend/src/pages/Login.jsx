/** @format */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
 CardDescription,
} from "../components/ui/card";
import { toast } from "sonner";
import { GraduationCap, Mail, Lock, ArrowRight, LogIn } from "lucide-react";

const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  // Validate inputs before sending
  if (!email || !password) {
   toast.error("Please enter both email and password");
   return;
  }

  try {
   const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
     Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
   });

   // Check if response is ok before parsing JSON
   let data;
   try {
    data = await res.json();
   } catch (jsonError) {
    console.error("Failed to parse response JSON:", jsonError);
    toast.error("Server returned invalid response");
    return;
   }

   if (!res.ok) {
    toast.error(data.msg || `Login failed: ${res.status} ${res.statusText}`);
    console.error("Login error:", data);
    return;
   }

   // ✅ Store token and user
   localStorage.setItem("token", data.token);
   localStorage.setItem("user", JSON.stringify(data.user));

   const role = data.user?.role || "student";

   toast.success(`Logged in as ${role}`);

   // ✅ Redirect based on role
   setTimeout(() => {
    if (role === "admin") {
     navigate("/admin"); // ✅ Admin Dashboard
    } else if (role === "mentor") {
     navigate("/mentor"); // ✅ Mentor Dashboard
    } else {
     navigate("/dashboard"); // ✅ Student Dashboard
    }
   }, 800);
  } catch (err) {
   console.error(err);
   toast.error("Backend not reachable, check Flask server.");
  }
 };

 return (
  <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
   {/* Left Column - Image Section */}
   <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
    <img
     src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80"
     alt="Students working on projects"
     className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white z-10">
     <div className="max-w-md space-y-6">
      <div className="flex items-center gap-3 mb-4">
       <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
        <LogIn className="h-8 w-8" />
       </div>
       <h1 className="text-4xl font-bold">Welcome Back</h1>
      </div>
      <p className="text-lg text-white/90 leading-relaxed">
       Access your projects, connect with mentors, and explore innovative
       student work from universities around the world.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8">
       <div className="text-center">
        <div className="text-3xl font-bold">1000+</div>
        <div className="text-sm text-white/80">Projects</div>
       </div>
       <div className="text-center">
        <div className="text-3xl font-bold">500+</div>
        <div className="text-sm text-white/80">Students</div>
       </div>
       <div className="text-center">
        <div className="text-3xl font-bold">50+</div>
        <div className="text-sm text-white/80">Universities</div>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Right Column - Form Section */}
   <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
    <Card className="w-full max-w-md shadow-xl border-0">
     <CardHeader className="text-center space-y-2 pb-6">
      <div className="flex justify-center mb-2">
       <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
        <GraduationCap className="h-6 w-6 text-white" />
       </div>
      </div>
      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
       Sign In
      </CardTitle>
      <CardDescription className="text-base">
       Enter your credentials to access your account
      </CardDescription>
     </CardHeader>
     <CardContent>
      <form onSubmit={handleLogin} className="space-y-5">
       {/* Email */}
       <div className="space-y-2">
        <Label
         htmlFor="login-email"
         className="text-sm font-medium flex items-center gap-2">
         <Mail className="h-4 w-4 text-gray-500" />
         Email Address
        </Label>
        <Input
         id="login-email"
         type="email"
         placeholder="your.email@university.edu"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="h-11"
         required
        />
       </div>

       {/* Password */}
       <div className="space-y-2">
        <Label
         htmlFor="login-password"
         className="text-sm font-medium flex items-center gap-2">
         <Lock className="h-4 w-4 text-gray-500" />
         Password
        </Label>
        <Input
         id="login-password"
         type="password"
         placeholder="••••••••"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="h-11"
         required
        />
       </div>

       {/* Submit Button */}
       <Button
        type="submit"
        variant="hero"
        className="w-full h-11 text-base font-semibold mt-6">
        Sign In
        <ArrowRight className="ml-2 h-4 w-4" />
       </Button>

       {/* Signup Link */}
       <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
         Don't have an account?{" "}
         <Link
          to="/register"
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
          Create account
         </Link>
        </p>
       </div>
      </form>
     </CardContent>
    </Card>
   </div>
  </div>
 );
};

export default Login;
