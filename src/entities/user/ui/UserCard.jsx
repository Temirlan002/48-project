import { useEffect } from "react";
import { useUserStore } from "../model/useUserStore";
import { getProfile } from "../../../features/auth/api/authApi";

const UserCard = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    getProfile()
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [setUser]);

  return (
    <div className="card">
      <p>Email: {user?.email}</p>
      <p>Name: {user?.username}</p>
    </div>
  );
};

export default UserCard;