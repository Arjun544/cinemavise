import "./App.css";

import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Register from "./Pages/Register/Register";
import Main from "./Pages/Main";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      return JSON.parse(user);
    } else {
      return {
        isLogin: false,
        token: '',
        username: '',
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/login" element={<Register />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
