import React from 'react';
import { useLocation, Link } from "react-router-dom";

function Header({ loggedIn, currentUserLogin, logOut, children }) {
  
  const location = useLocation();
  
  function handleLogOut() {
    logOut();
  }
                
  return (
          <header className="header">
            {children}
          </header>
  );
}

export default Header;