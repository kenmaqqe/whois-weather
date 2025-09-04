import { useState, useEffect } from "react";
import type { UserType } from "@/components/UserCard";
import {
  getUsers,
  setLocalUsers,
  getSavedUsers,
  setSavedLocalUsers,
} from "@/utills/storage";
import fetchUsers from "@/utills/fetchUser";

export default function useUsers() {
  const [users, setUsersState] = useState<UserType[]>([]);
  const [loadUserButtonIsEnable, setLoadUserButtonIsEnable] = useState(true);

  useEffect(() => {
    const savedUsers = getSavedUsers();

    async function loadUsers() {
      let usersList = getUsers() || [];
      if (usersList.length === 0) {
        usersList = await fetchUsers();
      }

      const usersWithSaved = usersList.map((u) =>
        savedUsers.some((s) => s.email === u.email) ? { ...u, saved: true } : u
      );

      setUsersState(usersWithSaved);
      if (usersWithSaved.length >= 36) setLoadUserButtonIsEnable(false);
    }

    loadUsers();
  }, []);

  const handleSave = (user: UserType) => {
    const savedUsers = getSavedUsers() || [];
    if (!savedUsers.some((u) => u.email === user.email)) {
      savedUsers.push(user);
      setSavedLocalUsers(savedUsers);
    }

    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, saved: true } : u
    );
    setUsersState(updatedUsers);
    setLocalUsers(updatedUsers);
  };

  const loadMoreUsers = async () => {
    if (!loadUserButtonIsEnable) return;
    const newUsers = await fetchUsers();
    const updated = [...users, ...newUsers];
    setUsersState(updated);
    setLocalUsers(updated);
    if (updated.length >= 36) setLoadUserButtonIsEnable(false);
  };

  return {
    users,
    handleSave,
    loadMoreUsers,
    loadUserButtonIsEnable,
  };
}
