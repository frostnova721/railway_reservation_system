import { useEffect, useState } from "react";
import "../style/dashboard.css";
import axios from "axios";
import TrainSelectionPopup from "../components/trains";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [showPopup, setPopup] = useState(false);
  const [user, setUser] = useState({ name: "Anonymous", id: "N/A" });

  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return nav("/");

        const res = await axios.get(process.env.API + "/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({ name: res.data.name, id: res.data.id });

        sessionStorage.setItem("user", JSON.stringify(res.data))
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);


  return (
    <div className="dashboard">
         <div className="user">
            <div className="user-details">
                <div className="username">{user.name}</div>
                <div className="user-id">{user.id}</div>
            </div>
            <img src="./train.png" className="avatar"></img>
        </div>
      <div className="left">
        <div className="header">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="right">
        <div className="content">
            <p>Book a ticket now!</p>
          <div className="book-button" onClick={() => setPopup(true)}>Book Now</div>
        </div>
      </div>

      {showPopup && <div className="popup-overlay" onClick={() => setPopup(false)}>
        <div className="popup" onClick={(e) => e.stopPropagation()}><TrainSelectionPopup></TrainSelectionPopup></div>
        </div>}
    </div>
  );
};
