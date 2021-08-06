import "./Account.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotateSpinner } from "react-spinners-kit";
import BottomNav from "../../../components/BottomNav/BottomNav";
import usrIMG from "../../../assets/logo/userIMG.svg";
import StatusModal from "./StatusModal/Modal";
import { MdInfo } from "react-icons/md";
import PasswordModal from "./PasswordModal/PasswordModal";
import NameModal from "./NameModal/NameModal";
import { FiChevronRight } from "react-icons/fi";
import { IoCamera } from "react-icons/io5";
import Source from "./source/source";
import useTitle from "../../../utils/useTitle";
import Learn from "./LearningModal/Learn";
import AuthContext from "../../../components/Auth/AuthContext";
import { useContext } from "react";

const Account = ({ user }) => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  useTitle("Account | Apexwallet");
  const apiURL = "https://api.apexwallet.app/v1";
  const [imageModal, setImageModal] = useState(false);

  useEffect(() => {
    if (loggedIn === false) {
      history.push("/login");
    }
  }, [loggedIn, history]);

  //log the user out
  const handleLogOut = async () => {
    try {
      await axios
        .post(`${apiURL}/auth/logout`)
        .then(await getLoggedIn())
        .then(history.push("/login"))
        .then(window.location.reload())
        .catch(async (err) => {
          await toast.error(`${err.response.data}`, {});
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  //update the user's display pic.
  const apiEndpoint = "https://api.apexwallet.app/v1/user/image";

  const handleImageSwitch = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file.size > 3145728) {
      toast.error(`Image size is too large, max size allowed is 3MB`, {});
    } else {
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .put(apiEndpoint, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(`${res.data}`, {});
            setImageModal(!imageModal);
          }
        })
        .catch(async (err) => {
          toast.error(`${err.response.data}`, {});
        });
    }
  };

  return (
    <div className="account">
      <BottomNav />
      <div className="container">
        <p className="header">Account</p>
        {user ? (
          <div className="accountInfo">
            <div className="userDetails">
              <div className="nameAndImage">
                <div className="image">
                  <img
                    src={user.image ? user.image : usrIMG}
                    alt={user.username}
                  />
                  <div
                    onClick={() => setImageModal(!imageModal)}
                    className="cameraIcon"
                  >
                    <input
                      name="file-input"
                      id="file-input"
                      type="file"
                      onChange={(e) => handleImageSwitch(e)}
                      accept="image/*"
                    />
                    <label htmlFor="file-input">
                      <IoCamera />
                    </label>
                  </div>
                </div>
                <div className="nameAndStatus">
                  <p style={{ textTransform: user.name ? "" : "capitalize" }}>
                    {user.name ? user.name : user.username + " 🚀"}
                  </p>
                  <p>{user.username}</p>
                </div>
              </div>
              <NameModal user={user} />
              <div className="personalFieldEmail">
                <div className="nameAndDisplay">
                  <p className="displayLabel">Email</p>
                  <p className="displayValue">{user.email}</p>
                </div>
              </div>
              <PasswordModal user={user} />

              <StatusModal user={user} />

              <Learn />

              <Source />

              <div
                onClick={() => history.push("/about")}
                className="aboutUsField"
              >
                <div className="accountIcons">
                  <MdInfo />
                </div>
                <p>About Us</p>
                <div className="editIcon">
                  <FiChevronRight />
                </div>
              </div>
            </div>

            {/* button to log the user out */}
            <button onClick={handleLogOut} className="signOut">
              Sign Out
            </button>

            <p className="walletVersion">v2 - stable 🚀</p>
            <p className="copyright">
              from <br />
              <a
                href="https://decover.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Decover
              </a>
            </p>
          </div>
        ) : (
          <div className="loading">
            <RotateSpinner size={40} color="#080809" />
          </div>
        )}
      </div>
      <ToastContainer hideProgressBar autoClose={3000} />
    </div>
  );
};

export default Account;
