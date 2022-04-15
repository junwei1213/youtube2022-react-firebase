import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../../firebase";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)

  console.log(currentUser.uid)

  const [data, setData] = useState([]);
  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "users"), where("uid", "==", currentUser.uid),
      (snapShot) => {
        let users = [];
        snapShot.docs.forEach((doc) => {
          users = doc.data();
          console.log(users);
        });
        setData(users);
      },
      (error) => {
        console.log(error);
      }
    )

    return () => {
      unsub();
    };
  }, []);



  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">Welcome, {data.displayName}</div>
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <div className="item">
            <img
              src={data.img}
              alt=""
              className="avatar"
            />
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
