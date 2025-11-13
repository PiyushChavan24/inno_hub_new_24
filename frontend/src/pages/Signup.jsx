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
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { GraduationCap, User, Mail, Building2, Lock, ArrowRight } from "lucide-react";

const Register = () => {
 const navigate = useNavigate();
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [university, setUniversity] = useState("");
 const [role, setRole] = useState("student");

 const handleRegister = async (e) => {
  e.preventDefault();
  try {
   const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, university, role }),
   });
   const data = await res.json();

   if (res.ok) {
    toast.success("Registration successful! Please login.");
    navigate("/login");
   } else {
    toast.error(data.msg || "Registration failed");
   }
  } catch (err) {
   console.error(err);
   toast.error("Something went wrong!");
  }
 };

 return (
  <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
   {/* Left Column - Image Section */}
   <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
    <img
     src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
     alt="Students collaborating on projects"
     className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white z-10">
     <div className="max-w-md space-y-6">
      <div className="flex items-center gap-3 mb-4">
       <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
        <GraduationCap className="h-8 w-8" />
       </div>
       <h1 className="text-4xl font-bold">Welcome to InnoHub</h1>
      </div>
      <p className="text-lg text-white/90 leading-relaxed">
       Join thousands of students, mentors, and administrators showcasing innovative projects across universities worldwide.
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
       Create Account
      </CardTitle>
      <CardDescription className="text-base">
       Join our community and start showcasing your innovative projects
      </CardDescription>
     </CardHeader>
     <CardContent>
      <form onSubmit={handleRegister} className="space-y-5">
       {/* Name */}
       <div className="space-y-2">
        <Label htmlFor="register-name" className="text-sm font-medium flex items-center gap-2">
         <User className="h-4 w-4 text-gray-500" />
         Full Name
        </Label>
        <Input
         id="register-name"
         placeholder="John Doe"
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="h-11"
         required
        />
       </div>

       {/* Email */}
       <div className="space-y-2">
        <Label htmlFor="register-email" className="text-sm font-medium flex items-center gap-2">
         <Mail className="h-4 w-4 text-gray-500" />
         Email Address
        </Label>
        <Input
         id="register-email"
         type="email"
         placeholder="your.email@university.edu"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="h-11"
         required
        />
       </div>

       {/* University */}
       <div className="space-y-2">
        <Label htmlFor="register-university" className="text-sm font-medium flex items-center gap-2">
         <Building2 className="h-4 w-4 text-gray-500" />
         University/Institution
        </Label>
        <Input
         id="register-university"
         placeholder="MIT School of Engineering"
         value={university}
         onChange={(e) => setUniversity(e.target.value)}
         className="h-11"
         required
        />
       </div>

       {/* Role Selection */}
       <div className="space-y-2">
        <Label htmlFor="register-role" className="text-sm font-medium">
         Select Your Role
        </Label>
        <Select value={role} onValueChange={setRole}>
         <SelectTrigger id="register-role" className="h-11">
          <SelectValue placeholder="Select a role" />
         </SelectTrigger>
         <SelectContent>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="mentor">Mentor</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
         </SelectContent>
        </Select>
        {role === "admin" && (
         <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-2 mt-2">
          ⚠️ Note: Only one admin per university is allowed. If an admin already exists for your university, registration will be denied.
         </p>
        )}
       </div>

       {/* Password */}
       <div className="space-y-2">
        <Label htmlFor="register-password" className="text-sm font-medium flex items-center gap-2">
         <Lock className="h-4 w-4 text-gray-500" />
         Password
        </Label>
        <Input
         id="register-password"
         type="password"
         placeholder="••••••••"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="h-11"
         required
        />
       </div>

       {/* Submit Button */}
       <Button type="submit" variant="hero" className="w-full h-11 text-base font-semibold mt-6">
        Create Account
        <ArrowRight className="ml-2 h-4 w-4" />
       </Button>

       {/* Login Link */}
       <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
         Already have an account?{" "}
         <Link
          to="/login"
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
          Sign in
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

export default Register;

