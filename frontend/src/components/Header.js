import React from 'react';
import { useLocation, Link } from "react-router-dom";
import headerLogo from '../images/header/header__logo.svg';

function Header({ loggedIn, currentUserLogin, logOut }) {
  
  const location = useLocation();

  const entranceButtonsText = { registration: "Зарегистрироваться",
                                login: "Войти",
                                signOut: "Выйти" };

  const urls = { signUp: '/sign-up',
                 signIn: '/sign-in' }

  
  function handleLogOut() {
    logOut();
  }
                
  return (
          <header className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип Mesto Russia" />
            <Link to={'/'} className="header__profile-button">{ loggedIn ? `${currentUserLogin}` : null }</Link>
            { (loggedIn) ?
              <Link to={'/'} className="header__entrance-button" onClick={handleLogOut}>{entranceButtonsText.signOut}</Link> :
              <Link className="header__entrance-button" to={
                (location.pathname === urls.signUp) ? `${urls.signIn}` :
                (location.pathname === urls.signIn) ? `${urls.signUp}` :
                (loggedIn) ? `${entranceButtonsText.signOut}` :
                entranceButtonsText.login
              }>{ 
                (location.pathname === urls.signUp) ? `${entranceButtonsText.login}` :
                (location.pathname === urls.signIn) ? `${entranceButtonsText.registration}` :
                (loggedIn) ? `${entranceButtonsText.signOut}`:
                entranceButtonsText.login
                }
              </Link>
            }
          </header>
  );
}

export default Header;