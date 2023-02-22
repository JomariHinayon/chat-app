import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup/Signup";
import Chat from "./pages/Chat";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/chat" element={<Chat />}/>
    </Routes>
  </BrowserRouter>;
}

export default App;
