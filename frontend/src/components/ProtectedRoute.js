import React from "react";
import { Navigate } from "react-router-dom";
import LoggedInProvider from "../contexts/LoggedInProvider";
import Preloader from "./Preloader";

function ProtectedRoute({children, setOnload }) {

    const [loggedIn] = React.useContext(LoggedInProvider);

    if (loggedIn === undefined) {
      return <Preloader isLoading={true} />
    }
  
    return loggedIn === "LoggedIn"
      ? children
      : <Navigate to="/sign-in" replace />;
  }

export default ProtectedRoute; 