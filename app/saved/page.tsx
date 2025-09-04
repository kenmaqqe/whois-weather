"use client";
import UserCard, { UserType } from "@/components/UserCard";
import { FaDeleteLeft } from "react-icons/fa6";
import useSavedUsers from "@/hooks/useSavedUsers";

const SavedPage = () => {
  const { savedUsers, handleDelete, handleClearAll } = useSavedUsers();

  return (
    <div className="min-h-screen bg-black text-white p-5">
      {savedUsers.length === 0 ? (
        <div className="flex justify-center items-center h-full text-xl font-semibold">
          No saved users
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedUsers.map((user: UserType) => (
              <UserCard
                key={user.email}
                name={user.name}
                gender={user.gender}
                picture={user.picture}
                location={user.location}
                email={user.email}
                deleteUser={() => handleDelete(user.email as string)}
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
            <FaDeleteLeft />
            Clear all
          </button>
        </>
      )}
    </div>
  );
};

export default SavedPage;
