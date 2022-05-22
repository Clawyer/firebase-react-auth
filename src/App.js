import "the-new-css-reset/css/reset.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import SignUpModal from "./components/Modal/SignUpModal";
import SignInModal from "./components/Modal/SignInModal";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import SignUpSignOut from "./pages/SignUp-SignIn/SignUpSignOut";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<SignUpSignOut />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
