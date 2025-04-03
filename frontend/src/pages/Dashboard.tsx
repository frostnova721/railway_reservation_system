import { useEffect, useState } from "react";
import "../style/dashboard.css";
import axios from "axios";
import TrainSelectionPopup from "../components/trains";
import { useNavigate } from "react-router-dom";
import { API } from "../statics";

export const Dashboard = () => {
  const [showPopup, setPopup] = useState(false);
  const [user, setUser] = useState({ name: "Anonymous", id: "N/A" });
  // const [booked, setBooked] = useState(0);

  const nav = useNavigate();

  // const updateBooked = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return nav("/");
  //   const bookedRes = await axios.get(
  //     (import.meta.env.API || "https://127.0.0.1:3000") + "/book/booked",
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  // };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return nav("/");

        const res = await axios.get(
          API + "/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // const bookedRes = await axios.get(
        //   (import.meta.env.API || "http://127.0.0.1:3000") + "/book/booked",
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //   }
        // );

        // const b = bookedRes.data.length;

        setUser({ name: res.data.name, id: res.data.id });

        // setBooked(b);

        sessionStorage.setItem("user", JSON.stringify(res.data));
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
          <div className="book-button" onClick={() => setPopup(true)}>
            Book Now
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <TrainSelectionPopup></TrainSelectionPopup>
          </div>
        </div>
      )}
    </div>
  );
};
