import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import NotFoundPage from "./NotFoundPage";
import Register from "./Register";
import Login from "./Login";
import PostCard from "./PostCard";
import Footer from "./Footer";
import Preloader from "./Preloader";
import { FormValidator, formSelectorsObj } from "../utils/FormValidator";
import api from "../utils/Api";
import accountApi from "../utils/AccountApi";
import LoggedInProvider from "../contexts/LoggedInProvider";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isReqSending, setIsReqSending] = React.useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState({});
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);
  const [onLoad, setOnload] = React.useState(false);
  const [isEntranceFail, setIsEntranceFail] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);

  const validateEditProfileForm = new FormValidator(
    formSelectorsObj,
    formSelectorsObj.loginFormSelector
  );
  const validateAddPlaceForm = new FormValidator(
    formSelectorsObj,
    formSelectorsObj.registerFormSelector
  );
  const validatePostCardForm = new FormValidator(
    formSelectorsObj,
    formSelectorsObj.postCardFormSelector
  );

  const location = useLocation();
  const navigate = useNavigate();

  document.documentElement.lang = "ru";

  React.useEffect(() => {
    validateEditProfileForm.enableValidation();
    validateAddPlaceForm.enableValidation();
  }, [location.pathname]);

  React.useEffect(() => {
    validatePostCardForm.enableValidation();
  }, [loggedIn]);

  function handleLoginSubmit(event) {
    setOnload(true);
    accountApi
      .auth(event)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("jwt", response.token);
          navigate('/');
          handleValidation(response.token);
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsEntranceFail(true);
        setIsInfoTooltip(true);
      })
      .finally(() => {
        setOnload(false);
      });
  }

  function handleOnLoad() {
    setOnload(true);
  }

  function handlePostCardSubmit(item) {
    setOnload(true);
    const formData = new FormData(item);
    const jsonData = JSON.stringify(Object.fromEntries(formData));
    api.postCard(formData, jsonData)
    .then(
      (response) => {
        console.log('Успешно');
      })
    .catch((err) => {
        console.log(err);
    })
    .finally(
      ()=> {
        setOnload(false);
        setIsInfoTooltip(true);
    });
  }

  React.useEffect(() => {
    if (localStorage.jwt) {
      handleValidation(localStorage.jwt);
    } else {
      setLoggedIn("NotLoggedIn");
    }
  }, [loggedIn]);

  function handleValidation(token) {
    accountApi
      .validation(token)
      .then((response) => {
        if (response) {
          setLoggedIn("LoggedIn");
        } else {
          setLoggedIn("NotLoggedIn");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegisterSubmit(event) {
    setOnload(true);
    accountApi
      .register(event)
      .then(() => {
        setIsEntranceFail(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEntranceFail(true);
      })
      .finally(() => {
        setOnload(false);
        setIsInfoTooltip(true);
      });
  }

  function closePopups() {
    setIsInfoTooltip(false);
  }

  function handleOnSuccess() {
    navigate("/sign-in");
    closePopups();
  }

  function resetValidation() {
    validateEditProfileForm.resetErrors();
    validateAddPlaceForm.resetErrors();
    validatePostCardForm.resetErrors();
  }

  return (
    <React.StrictMode>
      <LoggedInProvider.Provider value={[loggedIn, setLoggedIn]}>
        <div className="page">
          <div className="page__wrapper">
            <InfoTooltip
              isOpen={isInfoTooltip}
              onClose={closePopups}
              onFail={isEntranceFail}
              onSuccess={handleOnSuccess}
            />
            <Preloader isLoading={onLoad} />
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/sign-up"
                element={
                    <Register onSubmit={handleRegisterSubmit} />
                }
              />
              <Route
                path="/sign-in"
                element={
                    <Login onSubmit={handleLoginSubmit} />
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute setOnload={setOnload}>
                    <PostCard onLoad={onLoad} onSubmit={ (event) => { handlePostCardSubmit((event) ) } } />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </LoggedInProvider.Provider>
    </React.StrictMode>
  );
}

export default App;
