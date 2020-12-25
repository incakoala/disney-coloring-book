import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import ErrorNotice from "./misc/ErrorNotice";

  // Source:
  // MERN Stack Tutorial with Auth (8 part series):
  // https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function Register(){
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

  // function that submits info related to new user
  const submit = async (e) => {
    e.preventDefault();

    try{
      // newUser object is created
      const newUser = {username, password, passwordCheck};
      // calls post route to add new user to database
      await axios.post(
        "http://localhost:5000/users/add", 
        newUser
      );
      // user is logged in
      const loginRes = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      // user data including auth token is set
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      // auth token is set in local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
  } catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  // Sign Up form which takes in user input in fields 
    return(
      <section>
        <div className="container">
          <div className="user signinBx" >
            <div className="formBx">
              <form onSubmit={submit} >
                <h2>Register</h2>
                {error && (
                  <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                
                <input 
                type = "text" 
                required 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)}
                />

                
                <input 
                id="register-password" 
                type = "password" 
                placeholder="Password" 
                required
                onChange={(e) => setPassword(e.target.value)}
                />
                
                <input type = "password" 
                placeholder="Verify password" 
                required
                onChange={(e) => setPasswordCheck(e.target.value)}
                />
  
                <input type= "submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  } 
