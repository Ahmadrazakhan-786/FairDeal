import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      localStorage.setItem("token", token);

      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

        navigate("/");
      } catch (err) {
        navigate("/login");
      }
    };

    loginUser();
  }, []);

  return <div>Logging in...</div>;
}