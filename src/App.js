import ChatRoom from "./components/ChatRoom";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import JoinChatRoom from "./components/JoinChatRoom";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<JoinChatRoom />} />
        <Route path="/chat/:roomName" element={<ChatRoom />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
