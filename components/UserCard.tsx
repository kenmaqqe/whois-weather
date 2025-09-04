import Image from "next/image";
import { usePathname } from "next/navigation";
import { SiAccuweather } from "react-icons/si";
import { IoMdSave } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

type UserName = {
  title: string;
  first: string;
  last: string;
};

type Coordinates = {
  coordinates: {
    latitude: string;
    longitude: string;
  };
};

export interface UserType {
  name: UserName;
  gender: string;
  picture: string;
  location: Coordinates;
  email?: string;
  saveUser?: () => void;
  deleteUser?: () => void;
  checkWeather?: () => void;
  saved?: boolean;
}

const UserCard = ({
  name,
  gender,
  picture,
  location,
  email,
  saveUser,
  deleteUser,
  checkWeather,
  saved,
}: UserType) => {
  const pathname = usePathname();

  console.log(picture);
  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 m-3 flex flex-col items-center transition hover:shadow-xl">
      <Image
        src={picture}
        alt={name.first}
        width={120}
        height={120}
        className="rounded-full border-2 border-indigo-500 mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
        {name.title} {name.first} {name.last}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
        {gender}
      </p>
      <div className="text-gray-600 dark:text-gray-400 mb-2 text-center">
        <p>Latitude: {location.coordinates.latitude}</p>
        <p>Longitude: {location.coordinates.longitude}</p>
      </div>
      {email && (
        <p className="text-indigo-600 dark:text-indigo-400 font-medium break-words text-center">
          {email}
        </p>
      )}
      <span className="flex gap-4 mt-4">
        {pathname === "/users" && (
          <button
            onClick={saveUser}
            type="button"
            disabled={saved}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow transition cursor-pointer"
          >
            <IoMdSave />
            {saved ? "Saved" : "Save"}
          </button>
        )}
        {pathname === "/saved" && (
          <button
            onClick={deleteUser}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition cursor-pointer"
          >
            <MdDeleteForever />
            Delete
          </button>
        )}
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg shadow transition cursor-pointer"
          onClick={checkWeather}
        >
          <SiAccuweather />
          Weather
        </button>
      </span>
    </div>
  );
};

export default UserCard;
