import "./editproduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [pdata, getData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"), where("uid", "==", id),
      (snapShot) => {
        let products = [];
        snapShot.docs.forEach((doc) => {
          products = doc.data();
          console.log(products);
        });
        getData(products);
      },
      (error) => {
        console.log(error);
      }
    );

    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile() && unsub();
  }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value});
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Add a new document with a generated id
const newProductRef = doc(db, "products",id);
// later...
await updateDoc(newProductRef, data )
navigate(`/products/${id}`)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : pdata.img
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

                <div className="formInput" key={"title"}>
                  <label>Title:</label>
                  <input
                    id={"title"}
                    type="text"
                    placeholder= {pdata.title}
                    onChange={handleInput}
                  />
                </div>
                <div className="formInput" key={"description"}>
                  <label>Description</label>
                  <input
                    id={"description"}
                    type="text"
                    placeholder= {pdata.description}
                    onChange={handleInput}
                  />
                </div>
                <div className="formInput" key={"category"}>
                  <label>Category</label>
                  <input
                    id={"category"}
                    type="text"
                    placeholder= {pdata.category}
                    onChange={handleInput}
                  />
                </div>
                <div className="formInput" key="price">
                  <label>Price</label>
                  <input
                    id="price"
                    type="text"
                    placeholder= {pdata.price}
                    onChange={handleInput}
                  />
                </div>
                <div className="formInput" key="quantity">
                  <label>Quantity</label>
                  <input
                    id={"quantity"}
                    type="text"
                    placeholder= {pdata.quantity}
                    onChange={handleInput}
                  />
                </div>
                <div className="formInput" key="stock">
                  <label>Stock</label>
                  <select id={"stock"} value={pdata.stock} onChange={handleInput}>
                  <option value="In Stock">In Stock</option>
                  <option value="No Stock">No Stock</option>
                  </select>
                </div>
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
