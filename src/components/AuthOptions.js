// in order to access user
import React, { Fragment, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Link } from 'react-router-dom';

  // Source:
  // MERN Stack Tutorial with Auth (8 part series):
  // https://www.youtube.com/watch?v=4_ZiJGY5F38

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    // takes user to respective pages when button is clicked
    const register = () => history.push("/signUp");
    const login = () => history.push("/signIn");

    // if user clicks log out, set user data to undefined, remove the auth token in local storage, and send the user to login
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/");
    };
    // shows different options in the navbar based on if a verified user is logged in or not
    return (
        <Fragment>
            {userData.user ? (
                <>
                    <Link to="/userGallery" class="nav-link">My Gallery </Link>
                    <Link to="/imageGallery" class="nav-link">Image Gallery </Link>
                    <Link to="/showcase" class="nav-link">Showcase</Link>
                    <a class="nav-link" href="#" onClick={logout}>Log Out</a>

                </>
            ) : (
                    <>
                        <Link to="/imageGallery" class="nav-link">Image Gallery </Link>
                        <a class="nav-link" href="#" onClick={register}>Sign Up</a>
                        <a class="nav-link" href="#" onClick={login}>Sign In</a>
                    </>
                )}
        </Fragment>
    )
}