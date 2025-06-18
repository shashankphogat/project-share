import Navbar from "./components/navbar";
import Projectlist from "./components/projectlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addproject from "./components/addproject";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import AboutProject from "./components/aboutProject";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const authId = useSelector((state) => state.authListener.user);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              authId ? <Projectlist /> : <Navigate to="/logIn" replace />
            }
          />
          <Route
            path="/addProject"
            element={authId ? <Addproject /> : <Navigate to="/logIn" replace />}
          />
          <Route
            path="/logIn"
            element={authId ? <Navigate to="/" replace /> : <LogIn />}
          />
          <Route
            path="/signUp"
            element={authId ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/AboutProject/:projectId"
            element={
              authId ? <AboutProject /> : <Navigate to="/logIn" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
