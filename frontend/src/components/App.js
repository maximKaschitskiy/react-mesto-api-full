import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupAvatarEdit from './PopupAvatarEdit.js';
import PopupAddPlace from './PopupAddPlace.js';
import PopupProfileEdit from './PopupProfileEdit.js';
import PopupDeleteCard from './PopupDeleteCard.js';
import ImagePopup from './ImagePopup.js';
import Login from '../components/Login.js';
import Register from '../components/Register.js';
import InfoTooltip from '../components/InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import addApi from '../utils/Api.js';
import addAccountApi from '../utils/AccountApi.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
const [isEditProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState(null);
const [currentUser, setCurrentUser] = React.useState({});
const [cards, setCards] = React.useState([]);
const [onLoad, setOnload] = React.useState(false);
const [loggedIn, setLoggedIn] = React.useState(false);
const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
const [isEntranceFail, setIsEntranceFail] = React.useState(false);
const [currentUserLogin, setCurrentUserLogin] = React.useState({});

const navigate = useNavigate();

function closePopups() {
  setIsAddPlacePopupOpen(false);
  setIsAvatarPopupOpen(false);
  setIsProfilePopupOpen(false);
  setIsImagePopupOpen(false);
  setIsDeleteCardPopupOpen(false);
  setIsInfoTooltip(false);
  setSelectedCard(null);
}

function handleCardClick(props) {
    setIsImagePopupOpen(true);
    setSelectedCard(props);
  }

function handleEditAvatarClick() {
  setIsAvatarPopupOpen(true);
}

function handleEditProfileClick() {
  setIsProfilePopupOpen(true);
}

function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}

function handleCardDel(props) {
  setIsDeleteCardPopupOpen(true);
  setSelectedCard(props);
}

function handleEscKeydown (event) {
  if ((isEditAvatarPopupOpen || isDeleteCardPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen) && event.keyCode === 27) {
    closePopups();
  }
}

const changeLikeCardStatus = async function (card, isLiked) {
  if (isLiked) {
    let res = await addApi.unLikeCard(card)
    return res;
  } else {
    let res= await addApi.likeCard(card);
    return res;
  }
}

const handleCardLike = function (event) {
  const isLiked = event.likes.some((item) =>
    item === currentUser._id
  );
  changeLikeCardStatus(event._id, isLiked)
    .then((newCard) => {
      const newCards = cards.map((card) =>
        card._id === event._id ? newCard : card
      );
      setCards(newCards);
    })
    .catch(err => console.error(err));
}

function handleUpdateUser(event) {
    setOnload(true);
    addApi.setUserInfo(event.name, event.about)
    .then(
      (response) => {
        setCurrentUser(response);
      })
    .then(
      () => {
        closePopups();
      })
    .catch((err) => {
        console.log(err);
    })
    .finally(
      ()=> {
        setOnload(false);
    });
  }

function handleAddCard(event) {
    setOnload(true);
    addApi.postCard(event)
    .then(
      (response) => {
        setCards([ response,
          ...cards
        ]);
      })
    .then(
      () => {
        closePopups();
      })
    .catch((err) => {
        console.log(err);
    })
    .finally(
      ()=> {
        setOnload(false);
    });
  }

function handleDeleteCard(event) {
    setOnload(true);
    addApi.deleteCard(event._id)
    .then(() => {
      setCards(cards.filter((c) =>
        c._id !== event._id
       ));
      })
    .then(
      () => {
        closePopups();
      })
    .catch((err) => {
        console.log(err);
      })
    .finally(
      ()=> {
        setOnload(false);
    }); 
  }

function hadleEditUserpic(event) {
    setOnload(true);
    addApi.setUserPic(event.avatar)
    .then(
      (response) => {
        setCurrentUser(response);
      })
    .then(
      () => {
        closePopups();
      })
    .catch((err) => {
        console.log(err);
      })
    .finally(
      ()=> {
        setOnload(false);
    });
  }

function handleLoginSubmit(event) {
  setOnload(true);
  addAccountApi.auth(event)
  .then(
    (response) => {
      if (response.token) {
        localStorage.setItem('jwt', response.token);
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
  .finally(
    ()=> {
      setOnload(false);
  });
}

function handleValidation(token) {
  addAccountApi.validation(token)
  .then(
    (response) => {
      if (response) {
        setCurrentUserLogin(response.email);
        setLoggedIn(true);
        navigate('/');
    } else {
      return;
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleRegisterSubmit(event) {
  setOnload(true);
  addAccountApi.register(event)
  .then(
    () => {
      setIsEntranceFail(false);
  })
  .catch((err) => {
    console.log(err);
    setIsEntranceFail(true);
  })
  .finally(
    ()=> {
      setOnload(false);
      setIsInfoTooltip(true);
  });
}

function handleLogOut() {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
  navigate('/sign-in');
}

React.useEffect(() => {
  if(loggedIn) {
    addApi.getUserInfo()
      .then(
        (response) => {
          setCurrentUser(response);
        })
      .catch((err) => {
        console.log(err);
      })
  }
}, [loggedIn]);

React.useEffect(() => {
  if(loggedIn) {
    addApi.getCards()
      .then(
        (response) => {
          setCards(response);
        })
      .catch((err) => {
        console.log(err);
      })
  }
}, [loggedIn]);

React.useEffect(() => {
  if (localStorage.jwt) {
    addAccountApi.validation(localStorage.jwt)
    .then(
      (response) => {
        if (response) {
          setCurrentUserLogin(response.email);
          setLoggedIn(true);
          navigate('/');
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    setLoggedIn(false);
  }
}, [loggedIn]);

  return (
    <React.StrictMode>
      <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
        <div className="page" tabIndex="0" onKeyDown={(event)=>{handleEscKeydown(event)}}>
            <Header loggedIn={loggedIn} currentUserLogin={currentUserLogin} logOut={handleLogOut}/>
            <InfoTooltip isOpen={isInfoTooltip} onClose={closePopups} onFail={isEntranceFail} />
              <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route path="/sign-up" element={<Register onSubmit={handleRegisterSubmit} onLoad={onLoad} />} />
                <Route path="/sign-in" element={<Login onSubmit={handleLoginSubmit} onLoad={onLoad} />} />
                <Route path="/" element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Main
                      isEditAvatarPopupOpen={handleEditAvatarClick}
                      isEditProfilePopupOpen={handleEditProfileClick}
                      isAddPlacePopupOpen={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardDel={handleCardDel}
                      cards={cards}
                      setCards={setCards}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }/>
              </Routes>
          <Footer />
          <PopupDeleteCard isOpen={isDeleteCardPopupOpen} onClose={closePopups} card={selectedCard} onDeleteCard={handleDeleteCard} onLoad={onLoad} />
          <PopupAvatarEdit isOpen={isEditAvatarPopupOpen} onClose={closePopups} onChangeUserpic={hadleEditUserpic} onLoad={onLoad} />
          <PopupProfileEdit isOpen={isEditProfilePopupOpen} onClose={closePopups} onUpdateUser={handleUpdateUser} onLoad={onLoad}/>
          <PopupAddPlace isOpen={isAddPlacePopupOpen} onClose={closePopups} onAddPlace={handleAddCard} onLoad={onLoad}/>
          <ImagePopup isOpen={isImagePopupOpen} onClose={closePopups} card={selectedCard} />
        </div>
      </CurrentUserContext.Provider>
    </React.StrictMode>
  );
}

export default App;
