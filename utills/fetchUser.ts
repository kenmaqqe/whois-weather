import axios from "axios";

export default async function fetchUser() {
  const res = await axios.get("/api/users");
  if (!res) throw new Error("Failed to fetch user");
  return res.data;
}
