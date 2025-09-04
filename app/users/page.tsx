"use client";
import UserCard from "@/components/UserCard";
import WeatherModal from "@/components/WeatherModal";
import { MdPersonAdd } from "react-icons/md";
import useUsers from "@/hooks/useUsers";
import { useState } from "react";

const UsersPage = () => {
  const { users, handleSave, loadMoreUsers, loadUserButtonIsEnable } =
    useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: "", lon: "" });

  const checkWeather = (lat: string, lon: string) => {
    setIsModalOpen(true);
    setUserLocation({ lat, lon });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserLocation({ lat: "", lon: "" });
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
