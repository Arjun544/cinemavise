import "./App.css";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Main from "./Pages/Main";
import WidgetLoader from "./Components/WidgetLoader";

const Register = lazy(() => import("./Pages/Register/Register"));

export const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      return JSON.parse(user);
    } else {
      return {
        isLogin: false,
        token: "",
        username: "",
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
          <Route
            path="/login"
            element={
              <Suspense fallback={<WidgetLoader />}>
                <Register />
              </Suspense>
            }
          />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
