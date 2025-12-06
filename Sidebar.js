import React from 'react';
import './App.css';
import { 
  FaPlus, 
  FaHome, 
  FaBookmark, 
  FaArrowUp, 
  FaRocketchat 
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaRocketchat className="logo" />
        <span>ChatGPT</span>
      </div>

      <button className="new-chat-btn">
        <FaPlus /> New Chat
      </button>

      <div className="chat-history">
        <div className="history-item">What is Programming?</div>
        <div className="history-item">How to use API?</div>
      </div>

      <div className="sidebar-footer">
        <div className="menu-item"><FaHome /> Home</div>
        <div className="menu-item"><FaBookmark /> Saved</div>
        <div className="menu-item"><FaArrowUp /> Upgrade to Pro</div>
      </div>
    </div>
  );
};

export default Sidebar;
