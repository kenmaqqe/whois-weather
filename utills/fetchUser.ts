import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api?results=12");
    if (!response) throw new Error("Failed to fetch users");
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export default fetchUsers;
