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

const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
   const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
   });

   const data = await res.json();

   if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success("Login successful!");
    setTimeout(() => navigate("/dashboard"), 800); // ✅ Smooth redirect
   } else {
    toast.error(data.msg || "Login failed");
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
     <CardTitle className="text-2xl">Login</CardTitle>
     <CardDescription>
      Enter your credentials to access your account
     </CardDescription>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
       <Label htmlFor="login-email">Email</Label>
       <Input
        id="login-email"
        type="email"
        placeholder="your.email@university.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
       />
      </div>

      <div className="space-y-2">
       <Label htmlFor="login-password">Password</Label>
       <Input
        id="login-password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
       />
      </div>

      <Button type="submit" variant="hero" className="w-full">
       Login
      </Button>
     </form>
    </CardContent>
   </Card>
  </div>
 );
};

export default Login;
