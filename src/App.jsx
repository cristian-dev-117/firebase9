import { useContext } from "react";
import {Routes, Route} from "react-router-dom";
import { UserContext } from "./context/UserProvider";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Home from "./routes/home";

const App = () => {

  const {user} = useContext(UserContext);

  if(user === false) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }/>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}
export default App
