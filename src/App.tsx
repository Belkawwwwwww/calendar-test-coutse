import React, { FC } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import Board from "./pages/Board/Board";
import AuthRootComponent from "./pages/auth";
import Home from "./pages/Home/Home";

const App: FC = () => {
  //const dispatch = useAppDispatch();
  //const isAuth = useAppSelector(isAuthSelector);

  //   useEffect(() => {
  //
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Navbar />} />
        <Route element={<PrivateRoute />}>
          <Route path="/board" element={<Board />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<AuthRootComponent />} />
        <Route path="register" element={<AuthRootComponent />} />
      </Routes>
    </>
  );
};

export default App;
