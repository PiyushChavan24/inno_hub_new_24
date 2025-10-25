/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Register = () => {
 const navigate = useNavigate();
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [university, setUniversity] = useState("");
 const [role, setRole] = useState("student"); // ✅ Default role

 const handleRegister = async (e) => {
  e.preventDefault();
  try {
   const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
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
  <div className="min-h-screen flex items-center justify-center p-4">
   <Card className="max-w-md w-full p-6">
    <CardHeader className="text-center">
     <CardTitle className="text-2xl">Register</CardTitle>
     <CardDescription>Create a new account to get started</CardDescription>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleRegister} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
       <Label htmlFor="register-name">Full Name</Label>
       <Input
        id="register-name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
       />
      </div>

      {/* Email */}
      <div className="space-y-2">
       <Label htmlFor="register-email">Email</Label>
       <Input
        id="register-email"
        type="email"
        placeholder="your.email@university.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
       />
      </div>

      {/* University */}
      <div className="space-y-2">
       <Label htmlFor="register-university">University/Institution</Label>
       <Input
        id="register-university"
        placeholder="MIT School of Engineering"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        required
       />
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
       <Label htmlFor="register-role">Select Role</Label>
       <select
        id="register-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
        <option value="admin">Admin</option>
       </select>
      </div>

      {/* Password */}
      <div className="space-y-2">
       <Label htmlFor="register-password">Password</Label>
       <Input
        id="register-password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
       />
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="hero" className="w-full">
       Create Account
      </Button>
     </form>
    </CardContent>
   </Card>
  </div>
 );
};

export default Register;
