"use client";
import fetchUsers from "@/utills/fetchUser";
import { useEffect, useState } from "react";
import type { UserType } from "@/components/UserCard";
import UserCard from "@/components/UserCard";

const UsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("savedUsers");
    const savedArray: UserType[] = savedUsers ? JSON.parse(savedUsers) : [];

    async function loadUsers() {
      try {
        const localUsers = localStorage.getItem("users");
        let usersList: UserType[] = localUsers ? JSON.parse(localUsers) : [];

        if (usersList.length === 0) {
          // Якщо в localStorage пусто — fetch
          usersList = await fetchUsers();
        }

        // Позначаємо збережених користувачів
        const usersWithSaved = usersList.map((u) =>
          savedArray.some((s) => s.email === u.email)
            ? { ...u, saved: true }
            : u
        );

        setUsers(usersWithSaved);
        localStorage.setItem("users", JSON.stringify(usersWithSaved));
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers();
  }, []);

  const handleSave = (user: UserType) => {
    const savedUsers = localStorage.getItem("savedUsers");
    const usersArray: UserType[] = savedUsers ? JSON.parse(savedUsers) : [];

    const exists = usersArray.some((u) => u.email === user.email);
    if (!exists) {
      usersArray.push(user);
      localStorage.setItem("savedUsers", JSON.stringify(usersArray));
    }

    const updatedUsers = users.map((u) => {
      if (u.email === user.email) {
        return { ...u, saved: true };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-5">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <UserCard
            key={user.email}
            name={user.name}
            gender={user.gender}
            picture={user.picture}
            location={user.location}
            email={user.email}
            saveUser={() => handleSave(user)}
            saved={user.saved}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
