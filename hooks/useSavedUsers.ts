import { useState, useEffect } from "react";
import type { UserType } from "@/components/UserCard";
import {
  getSavedUsers,
  setSavedLocalUsers,
  clearSavedUsers,
  getUsers,
  setLocalUsers,
} from "@/utills/storage";

export default function useSavedUsers() {
  const [savedUsers, setSavedUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const saved = getSavedUsers();
    setSavedUsers(saved || []);
  }, []);

  const handleDelete = (email: string) => {
    const updatedSaved = savedUsers.filter((user) => user.email !== email);
    setSavedUsers(updatedSaved);
    setSavedLocalUsers(updatedSaved);

    const users = getUsers();
    if (users) {
      const updatedUsers = users.map((u: UserType) =>
        u.email === email ? { ...u, saved: false } : u
      );
      setLocalUsers(updatedUsers);
    }
  };

  const handleClearAll = () => {
    setSavedUsers([]);
    clearSavedUsers();

    const users = getUsers();
    if (users) {
      const updatedUsers = users.map((u: UserType) => ({ ...u, saved: false }));
      setLocalUsers(updatedUsers);
    }
  };

  return { savedUsers, handleDelete, handleClearAll };
}
