import logo from './logo.svg';
import './App.css';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
function App() {
  return (
    <div className="App">
     {/* <div className="sidebar">
      <div className="upperside">
        <div className="upperSideTop"><img src=" " alt=" " className="logo"/><span className="brand">Chatgpt-5.0</span></div>
        <button className="midBtn"><img src="" alt="" className="addBtn"/>New Chat</button>
        <div></div>
      </div>
      <div className="lowerside">

      </div>
     </div>
     <div className="main"></div> */}
    <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;
