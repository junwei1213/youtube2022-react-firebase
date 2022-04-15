import "./profile.scss";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"

const Profile = () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
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
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
                <div className="details">
              <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              </div>
              <div className="details">
                <h1 className="itemTitle">Name : {data.displayName}</h1>
                <div className="detailItem">
                  <span className="itemTitle">Email: </span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemTitle">Phone: </span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemTitle">Address: </span>
                  <span className="itemValue">
                    {data.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemTitle">Country: </span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
