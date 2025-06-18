import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Addproject = lazy(() => import("./components/addproject"));
const LogIn = lazy(() => import("./components/logIn"));
const SignUp = lazy(() => import("./components/signUp"));
const AboutProject = lazy(() => import("./components/aboutProject"));
const Projectlist=lazy(()=>import("./components/projectlist"))
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function App() {
  const authId = useSelector((state) => state.authListener.user);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
