import type { UserType } from "@/components/UserCard";

const USERS_KEY = "users";
const SAVED_USERS_KEY = "savedUsers";

export const getUsers = (): UserType[] => {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? (JSON.parse(saved) as UserType[]) : [];
  } catch {
    return [];
  }
};

export const setLocalUsers = (users: UserType[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getSavedUsers = (): UserType[] => {
  try {
    const saved = localStorage.getItem(SAVED_USERS_KEY);
    return saved ? (JSON.parse(saved) as UserType[]) : [];
  } catch {
    return [];
  }
};

export const setSavedLocalUsers = (users: UserType[]) =>
  localStorage.setItem(SAVED_USERS_KEY, JSON.stringify(users));

export const clearSavedUsers = () => localStorage.removeItem(SAVED_USERS_KEY);
