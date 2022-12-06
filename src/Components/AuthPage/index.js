import { Button } from "@mui/material";
import React, { useContext } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import sideImage from "./images/sideImage.png";
import Authentication from "./images/authentication.png";
import "./index.css";
import { ReactComponent as Google } from "./Google.svg";

function AuthPage({ type }) {
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "SET_USER", payload: user });
        const docRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userInfo = docSnap.data();
          const userType = userInfo.type;
          // localStorage.setItem('userinfo',JSON.stringify(userInfo))
          dispatch({ type: "SET_USER_INFO", payload: userInfo });

          if (type === "candidate") {
            if (userType === type) {
              navigate("/candidate/profile");
            } else {
              alert("You are already onboarded as employer");
              return;
            }
          } else {
            if (userType === type) {
              navigate("/employer/profile");
            } else {
              alert("You are already onboarded as candidate");
              return;
            }
          }
          console.log("Document data:", docSnap.data());
        } else {
          if (type === "candidate") {
            navigate("/candidate/onboarding");
          } else {
            navigate("/employer/onboarding");
          }
        }

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  };

  return (

    <>


<div className="wrapper-container">
      <div className="side-image-container">
        <img src={sideImage} alt="Girl"></img>
      </div>
      <div className="signin-container">
        <h2>
          Welcome <span>{type}</span>
        </h2>
        <img src={Authentication} alt="auth"></img>
        <h1>Sign IN</h1>
        <button onClick={signIn}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </span>
          Signup with Google
        </button>
      </div>
    </div>
    </>






    // <div>
    //   <h1>Welcome {type} please SignIn</h1>
    //   <h3>SignIn with google</h3>
    //   <Button onClick={signIn}> SignIn</Button>
    // </div>
  );
}

export default AuthPage;
// type
// onboarding when user is now
// profile we have  user's data
