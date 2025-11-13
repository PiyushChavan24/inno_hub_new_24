/** @format */

// /** @format */

// // /** @format */

// // import React, { useEffect, useState } from "react";
// // import Navbar from "@/components/Navbar";
// // import Footer from "@/components/Footer";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Badge } from "@/components/ui/badge";

// // const ManageUsers = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const API_BASE = "/api/admin"; // ✅ Correct base URL
// //   const token = localStorage.getItem("token"); // ✅ Admin auth

// //   const fetchUsers = async () => {
// //     try {
// //       const response = await fetch(`${API_BASE}/users`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       const data = await response.json();
// //       setUsers(data.users || []);
// //     } catch (err) {
// //       console.error("Error fetching users:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteUser = async (userId) => {
// //     if (!window.confirm("Are you sure you want to delete this user?")) return;

// //     try {
// //       await fetch(`${API_BASE}/users/${userId}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       // ✅ Update UI
// //       setUsers(users.filter((u) => u._id !== userId));
// //     } catch (err) {
// //       console.error("Error deleting user:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <Navbar />

// //       <main className="flex-1 bg-muted/30 py-12">
// //         <div className="container">
// //           <Card className="gradient-card shadow-soft">
// //             <CardHeader>
// //               <CardTitle className="text-2xl font-bold">Manage Users</CardTitle>
// //               <p className="text-muted-foreground">
// //                 View and manage all registered users.
// //               </p>
// //             </CardHeader>

// //             <CardContent>
// //               {loading ? (
// //                 <p>Loading users...</p>
// //               ) : users.length === 0 ? (
// //                 <p>No users registered.</p>
// //               ) : (
// //                 <Table>
// //                   <TableHeader>
// //                     <TableRow>
// //                       <TableHead>Name</TableHead>
// //                       <TableHead>Email</TableHead>
// //                       <TableHead>Role</TableHead>
// //                       <TableHead className="text-right">Actions</TableHead>
// //                     </TableRow>
// //                   </TableHeader>

// //                   <TableBody>
// //                     {users.map((user) => (
// //                       <TableRow key={user._id}>
// //                         <TableCell className="font-medium">{user.name}</TableCell>
// //                         <TableCell>{user.email}</TableCell>
// //                         <TableCell>
// //                           <Badge variant="secondary">{user.role}</Badge>
// //                         </TableCell>

// //                         <TableCell className="text-right">
// //                           <div className="flex justify-end gap-2">
// //                             <Button size="sm" variant="outline">
// //                               Edit
// //                             </Button>

// //                             <Button
// //                               size="sm"
// //                               variant="destructive"
// //                               onClick={() => deleteUser(user._id)}
// //                             >
// //                               Delete
// //                             </Button>
// //                           </div>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default ManageUsers;

// /** @format */

// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import {
//  Card,
//  CardContent,
//  CardHeader,
//  CardTitle,
// } from "../../components/ui/card";

// import { Button } from "../../components/ui/button";
// import {
//  Table,
//  TableBody,
//  TableCell,
//  TableHead,
//  TableHeader,
//  TableRow,
// } from "../../components/ui/table";
// import { Badge } from "../../components/ui/badge";

// const ManageUsers = () => {
//  const [users, setUsers] = useState([]);
//  const [loading, setLoading] = useState(true);

//  const API_BASE = "/api/admin"; // ✅ Correct base URL
//  const token = localStorage.getItem("token"); // ✅ Admin auth

//  const fetchUsers = async () => {
//   try {
//    const response = await fetch(`${API_BASE}/users`, {
//     headers: { Authorization: `Bearer ${token}` },
//    });

//    const data = await response.json();
//    setUsers(data.users || []);
//   } catch (err) {
//    console.error("Error fetching users:", err);
//   } finally {
//    setLoading(false);
//   }
//  };

//  const deleteUser = async (userId) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;

//   try {
//    await fetch(`${API_BASE}/users/${userId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//    });

//    // ✅ Update UI
//    setUsers(users.filter((u) => u._id !== userId));
//   } catch (err) {
//    console.error("Error deleting user:", err);
//   }
//  };

//  useEffect(() => {
//   fetchUsers();
//  }, []);

//  return (
//   <div className="min-h-screen flex flex-col">
//    {/* <Navbar /> */}

//    <main className="flex-1 bg-muted/30 py-12">
//     <div className="container">
//      <Card className="gradient-card shadow-soft">
//       <CardHeader>
//        <CardTitle className="text-2xl font-bold">Manage Users</CardTitle>
//        <p className="text-muted-foreground">
//         View and manage all registered users.
//        </p>
//       </CardHeader>

//       <CardContent>
//        {loading ? (
//         <p>Loading users...</p>
//        ) : users.length === 0 ? (
//         <p>No users registered.</p>
//        ) : (
//         <Table>
//          <TableHeader>
//           <TableRow>
//            <TableHead>Name</TableHead>
//            <TableHead>Email</TableHead>
//            <TableHead>Role</TableHead>
//            <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//          </TableHeader>

//          <TableBody>
//           {users.map((user) => (
//            <TableRow key={user._id}>
//             <TableCell className="font-medium">{user.name}</TableCell>
//             <TableCell>{user.email}</TableCell>
//             <TableCell>
//              <Badge variant="secondary">{user.role}</Badge>
//             </TableCell>

//             <TableCell className="text-right">
//              <div className="flex justify-end gap-2">
//               <Button size="sm" variant="outline">
//                Edit
//               </Button>

//               <Button
//                size="sm"
//                variant="destructive"
//                onClick={() => deleteUser(user._id)}>
//                Delete
//               </Button>
//              </div>
//             </TableCell>
//            </TableRow>
//           ))}
//          </TableBody>
//         </Table>
//        )}
//       </CardContent>
//      </Card>
//     </div>
//    </main>

//    <Footer />
//   </div>
//  );
// };

// export default ManageUsers;

/** @format */

import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import {
 Select,
 SelectTrigger,
 SelectContent,
 SelectItem,
 SelectValue,
} from "../../components/ui/select";
import {
 Users,
 Shield,
 Edit,
 Trash2,
 Loader2,
 Mail,
 User,
 GraduationCap,
 UserCheck,
 Crown,
} from "lucide-react";
import { toast } from "sonner";

const ManageUsers = () => {
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);

 const [selectedUser, setSelectedUser] = useState(null); // user we edit

 const API_BASE = "/api/admin";
 const token = localStorage.getItem("token");

 // ✅ Fetch Users
 const fetchUsers = async () => {
  try {
   const res = await fetch(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
   });

   const data = await res.json();
   setUsers(data.users || []);
  } catch (err) {
   console.error("Fetch Users Error:", err);
  } finally {
   setLoading(false);
  }
 };

 // ✅ Update user details
 const updateUser = async () => {
  if (!selectedUser) return;

  // ✅ Validate required fields
  if (!selectedUser.name || !selectedUser.email) {
   toast.error("Name and email are required");
   return;
  }

  try {
   const res = await fetch(`${API_BASE}/users/${selectedUser._id}`, {
    method: "PUT",
    headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     name: selectedUser.name,
     email: selectedUser.email,
     role: selectedUser.role,
    }),
   });

   const data = await res.json();

   if (res.ok) {
    // ✅ Update UI without reload
    setUsers((prev) =>
     prev.map((u) => (u._id === selectedUser._id ? { ...selectedUser } : u))
    );
    setSelectedUser(null); // Close dialog by clearing selected user
    toast.success("User updated successfully!");
   } else {
    toast.error(data.msg || "Failed to update user");
   }
  } catch (err) {
   console.error("Update User Error:", err);
   toast.error("Failed to update user");
  }
 };

 // ✅ Delete user
 const deleteUser = async () => {
  if (
   !window.confirm(
    "Are you sure you want to delete this user? This action cannot be undone."
   )
  )
   return;

  try {
   const res = await fetch(`${API_BASE}/users/${selectedUser._id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
   });

   if (res.ok) {
    setUsers(users.filter((u) => u._id !== selectedUser._id));
    setSelectedUser(null); // Close dialog by clearing selected user
    toast.success("User deleted successfully!");
   } else {
    const errorData = await res.json().catch(() => ({}));
    toast.error(errorData.msg || "Failed to delete user");
   }
  } catch (err) {
   console.error("Delete User Error:", err);
   toast.error("Failed to delete user");
  }
 };

 useEffect(() => {
  fetchUsers();
 }, []);

 const getRoleIcon = (role) => {
  switch (role) {
   case "student":
    return GraduationCap;
   case "mentor":
    return UserCheck;
   case "admin":
    return Crown;
   default:
    return User;
  }
 };

 const getRoleColor = (role) => {
  switch (role) {
   case "student":
    return "bg-purple-100 text-purple-700 border-purple-300";
   case "mentor":
    return "bg-green-100 text-green-700 border-green-300";
   case "admin":
    return "bg-blue-100 text-blue-700 border-blue-300";
   default:
    return "bg-gray-100 text-gray-700 border-gray-300";
  }
 };

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* ✅ Beautiful Header Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <Users className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Manage Users
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        View, edit, and manage all registered users. Update user details, roles,
        and permissions.
       </p>
      </div>
     </div>
    </section>

    {/* ✅ Users Table Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      <Card className="border-0 shadow-xl">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
           <Shield className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
           All Users
          </CardTitle>
         </div>
         <Badge className="bg-blue-100 text-blue-700 border-blue-300">
          {users.length} {users.length === 1 ? "user" : "users"}
         </Badge>
        </div>
       </CardHeader>

       <CardContent className="pt-6">
        {loading ? (
         <div className="text-center py-12">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
           <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading users...</p>
         </div>
        ) : users.length === 0 ? (
         <div className="text-center py-12 px-4">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
           <Users className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-700 mb-2">
           No Users Found
          </p>
          <p className="text-gray-600">No users have been registered yet.</p>
         </div>
        ) : (
         <div className="overflow-x-auto">
          <Table>
           <TableHeader>
            <TableRow className="bg-gray-50">
             <TableHead className="font-semibold text-gray-700">User</TableHead>
             <TableHead className="font-semibold text-gray-700">
              Email
             </TableHead>
             <TableHead className="font-semibold text-gray-700">Role</TableHead>
             <TableHead className="text-right font-semibold text-gray-700">
              Actions
             </TableHead>
            </TableRow>
           </TableHeader>

           <TableBody>
            {users.map((user) => {
             const RoleIcon = getRoleIcon(user.role);
             return (
              <TableRow
               key={user._id}
               className="hover:bg-blue-50/50 transition-colors">
               <TableCell>
                <div className="flex items-center gap-3">
                 <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <User className="h-4 w-4 text-white" />
                 </div>
                 <span className="font-semibold text-gray-900">
                  {user.name}
                 </span>
                </div>
               </TableCell>
               <TableCell>
                <div className="flex items-center gap-2">
                 <Mail className="h-4 w-4 text-gray-400" />
                 <span className="text-gray-700">{user.email}</span>
                </div>
               </TableCell>
               <TableCell>
                <Badge
                 className={`${getRoleColor(
                  user.role
                 )} border font-semibold flex items-center gap-1.5 w-fit`}>
                 <RoleIcon className="h-3 w-3" />
                 {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) ||
                  "Unknown"}
                </Badge>
               </TableCell>

               <TableCell className="text-right">
                <Dialog
                 open={selectedUser?._id === user._id}
                 onOpenChange={(open) => {
                  if (!open) setSelectedUser(null);
                 }}>
                 <DialogTrigger asChild>
                  <Button
                   size="sm"
                   variant="outline"
                   className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                   onClick={() => setSelectedUser({ ...user })}>
                   <Edit className="h-4 w-4" />
                   Edit
                  </Button>
                 </DialogTrigger>

                 <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                   <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                     <Edit className="h-5 w-5 text-white" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                     Edit User
                    </DialogTitle>
                   </div>
                   <DialogDescription>
                    Modify user details and save changes.
                   </DialogDescription>
                  </DialogHeader>

                  {selectedUser && (
                   <div className="space-y-4 pt-4">
                    {/* Name */}
                    <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                     </label>
                     <Input
                      value={selectedUser.name || ""}
                      onChange={(e) =>
                       setSelectedUser({
                        ...selectedUser,
                        name: e.target.value,
                       })
                      }
                      className="h-11"
                     />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                     </label>
                     <Input
                      type="email"
                      value={selectedUser.email || ""}
                      onChange={(e) =>
                       setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                       })
                      }
                      className="h-11"
                     />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Role
                     </label>
                     <Select
                      value={selectedUser.role || "student"}
                      onValueChange={(val) =>
                       setSelectedUser({
                        ...selectedUser,
                        role: val,
                       })
                      }>
                      <SelectTrigger className="h-11">
                       <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                       <SelectItem value="student">
                        <div className="flex items-center gap-2">
                         <GraduationCap className="h-4 w-4" />
                         Student
                        </div>
                       </SelectItem>
                       <SelectItem value="mentor">
                        <div className="flex items-center gap-2">
                         <UserCheck className="h-4 w-4" />
                         Mentor
                        </div>
                       </SelectItem>
                       <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                         <Crown className="h-4 w-4" />
                         Admin
                        </div>
                       </SelectItem>
                      </SelectContent>
                     </Select>
                    </div>

                    <div className="flex justify-between gap-3 pt-4 border-t">
                     {/* Delete User */}
                     <Button
                      variant="destructive"
                      onClick={deleteUser}
                      className="flex items-center gap-2 hover:bg-red-600">
                      <Trash2 className="h-4 w-4" />
                      Delete User
                     </Button>

                     {/* Save Changes */}
                     <Button
                      onClick={updateUser}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                      Save Changes
                     </Button>
                    </div>
                   </div>
                  )}
                 </DialogContent>
                </Dialog>
               </TableCell>
              </TableRow>
             );
            })}
           </TableBody>
          </Table>
         </div>
        )}
       </CardContent>
      </Card>
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
};

export default ManageUsers;
