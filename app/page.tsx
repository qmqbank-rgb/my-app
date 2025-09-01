"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase.from<User>("users").select("*");
      if (error) {
        console.error("Fetch error:", error.message, error.details, error.hint);
        setErrorMsg(error.message);
        setUsers([]);
        return;
      }
      setUsers(data || []);
    } catch (err: any) {
      console.error("Unexpected fetch error:", err);
      setErrorMsg(err.message || "Unknown error");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const usersChannel = supabase
      .channel("public:users")
      .on("postgres_changes", { event: "*", schema: "public", table: "users" }, (payload) => {
        const newRow = payload.new;
        const oldRow = payload.old;

        switch (payload.eventType) {
          case "INSERT":
            if (newRow) setUsers((prev) => [...prev, newRow]);
            break;
          case "UPDATE":
            if (newRow)
              setUsers((prev) =>
                prev.map((u) => (u.id === newRow.id ? newRow : u))
              );
            break;
          case "DELETE":
            if (oldRow) setUsers((prev) => prev.filter((u) => u.id !== oldRow.id));
            break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(usersChannel);
    };
  }, []);

  const addUser = async () => {
    const name = prompt("Enter user name");
    const email = prompt("Enter user email");
    if (!name || !email) return;
    const { error } = await supabase.from("users").insert({ name, email });
    if (error) console.error("Insert error:", error.message);
  };

  const updateUser = async (user: User) => {
    const name = prompt("Update name", user.name);
    const email = prompt("Update email", user.email);
    if (!name || !email) return;
    const { error } = await supabase.from("users").update({ name, email }).eq("id", user.id);
    if (error) console.error("Update error:", error.message);
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) console.error("Delete error:", error.message);
  };

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p style={{ color: "red" }}>Error: {errorMsg}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Users Table (Real-time CRUD)</h1>
      <button onClick={addUser} style={{ marginBottom: "1rem" }}>Add User</button>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border={1} cellPadding={10} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => updateUser(user)}>Edit</button>{" "}
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
