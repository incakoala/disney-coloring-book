import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import ErrorNotice from "./misc/ErrorNotice";

// Source:
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  
  const {setUserData} = useContext(UserContext);
  const history = useHistory();

  // submit function
  const submit = async (e) => {
    try{
      // new loginUser object is created
      e.preventDefault();
      // new loginUser object is created
      const loginUser = {username, password};
      const loginRes = await axios.post("http://localhost:5000/users/login", loginUser);
      // sets userData object with auth token and user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      // sets token in local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
  } catch(err){
    err.response.data.msg && setError(err.response.data.msg);
  }
  };

  // login form
  return(
    <section>
      <div className="container">
        <div className="user signinBx" >
          <div className="formBx">
            <form onSubmit={submit} >
              <h2>Sign In</h2>
              {error && (
                  <ErrorNotice message={error} clearError={() => setError(undefined)} />
              )}
              <input type="text" 
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username" />

              <input type="password" 
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" />

              <input type= "submit" value="Log In" />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 