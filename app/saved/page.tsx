"use client";
import { useEffect, useState } from "react";
import type { UserType } from "@/components/UserCard";
import UserCard from "@/components/UserCard";
import Image from "next/image";

const SavedPage = () => {
  const [savedUsers, setSavedUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("savedUsers");
    if (savedUsers) {
      setSavedUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleDelete = (email: string) => {
    const updatedSaved = savedUsers.filter((user) => user.email !== email);
    setSavedUsers(updatedSaved);
    localStorage.setItem("savedUsers", JSON.stringify(updatedSaved));

    const users = localStorage.getItem("users");
    if (users) {
      const parsedUsers = JSON.parse(users).map((u: UserType) =>
        u.email === email ? { ...u, saved: false } : u
      );
      localStorage.setItem("users", JSON.stringify(parsedUsers));
    }
  };

  const handleClearAll = () => {
    setSavedUsers([]);
    localStorage.removeItem("savedUsers");
    const users = localStorage.getItem("users");
    if (users) {
      const parsedUsers = JSON.parse(users).map((u: UserType) => ({
        ...u,
        saved: false,
      }));
      localStorage.setItem("users", JSON.stringify(parsedUsers));
    }
  };
  return (
    <div className="p-5">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {savedUsers.map((user) => (
          <UserCard
            key={user.email}
            name={user.name}
            gender={user.gender}
            picture={user.picture}
            location={user.location}
            email={user.email}
            deleteUser={() => handleDelete(user.email?.toString() ?? "")}
          />
        ))}
      </div>
      <button
        type="button"
        className="
    fixed bottom-10 left-1/2
    transform -translate-x-1/2
    z-50
    bg-red-600 text-white
    px-4 py-2 rounded
    flex items-center gap-2
    shadow-lg
    hover:bg-red-700
    cursor-pointer
  "
        onClick={handleClearAll}
      >
        <Image
          src="https://www.svgrepo.com/show/369884/clear-inverse-reflect-horizontal.svg"
          alt="clear-image"
          width={30}
          height={30}
        />
        Clear all
      </button>
    </div>
  );
};

export default SavedPage;
