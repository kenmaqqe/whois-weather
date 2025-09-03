"use client";
import fetchUsers from "@/utills/fetchUser";
import { useEffect, useState } from "react";
import type { UserType } from "@/components/UserCard";
import UserCard from "@/components/UserCard";
import WeatherModal from "@/components/WeatherModal";
import { MdPersonAdd } from "react-icons/md";

const UsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: string;
    lon: string;
  }>({ lat: "", lon: "" });
  const [loadUserButtonIsEnable, setLoadUserButtonIsEnable] = useState(true);

  useEffect(() => {
    const savedUsers = localStorage.getItem("savedUsers");
    const savedArray: UserType[] = savedUsers ? JSON.parse(savedUsers) : [];

    async function loadUsers() {
      try {
        const localUsers = localStorage.getItem("users");
        let usersList: UserType[] = localUsers ? JSON.parse(localUsers) : [];

        if (usersList.length === 0) {
          usersList = await fetchUsers();
        }

        const usersWithSaved = usersList.map((u) =>
          savedArray.some((s) => s.email === u.email)
            ? { ...u, saved: true }
            : u
        );

        setUsers(usersWithSaved);

        if (usersWithSaved.length >= 36) {
          setLoadUserButtonIsEnable(false);
        }

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

  const checkWeather = (lat: string, lon: string) => {
    setIsModalOpen(true);
    setUserLocation({ lat: lat, lon: lon });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserLocation({ lat: "", lon: "" });
  };

  const loadMoreUsers = async () => {
    if (!loadUserButtonIsEnable) return;
    try {
      const usersList = await fetchUsers();
      setUsers((prevUsers) => {
        const updated = [...prevUsers, ...usersList];
        localStorage.setItem("users", JSON.stringify(updated));
        if (updated.length >= 36) setLoadUserButtonIsEnable(false);
        return updated;
      });
    } catch (error) {
      console.error(error);
    }
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
            checkWeather={() =>
              checkWeather(
                user.location.coordinates.latitude,
                user.location.coordinates.longitude
              )
            }
            saved={user.saved}
          />
        ))}
        <WeatherModal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          lat={userLocation.lat}
          lon={userLocation.lon}
        />
      </div>
      <button
        type="button"
        onClick={loadMoreUsers}
        className={`${
          loadUserButtonIsEnable ? "fixed" : "hidden"
        } bottom-5 left-1/2 -translate-x-1/2 bg-blue-500 flex items-center gap-2 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition cursor-pointer`}
      >
        <MdPersonAdd /> Load more users
      </button>
    </div>
  );
};

export default UsersPage;
