import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// --- Configuration ---
// ⚠️ IMPORTANT: To make the chat work, get a free API key from 
// https://aistudio.google.com/app/apikey and paste it inside the quotes below.
const apiKey = "AIzaSyANGPi7jXLZzFf5-FLBomEFxNeMUbrxKIo"; 

// --- SVG Icons ---
const Icons = {
  Plus: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Chat: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
  Send: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Menu: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.5em" width="1.5em"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Close: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.5em" width="1.5em"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  User: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Bot: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.5em" width="1.5em"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><rect x="5" y="9" width="14" height="14" rx="4"></rect><line x1="9" y1="9" x2="9" y2="23"></line><line x1="15" y1="9" x2="15" y2="23"></line></svg>,
  RocketChat: () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.5em" width="1.5em"><path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.234-1.922.686-3.347.884-.396.056-.665-.328-.535-.689.26-.723.682-1.631.865-2.094A6.878 6.878 0 0 1 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.003-.014-.004a.94.94 0 0 0-.329-.063L6.056 6.1h-.005l-.017.002-.007.001a.757.757 0 0 0-.228.056.97.97 0 0 0-.325.216 1.815 1.815 0 0 0-.276.4 3.793 3.793 0 0 0-.218.667l-.007.037-.002.012a.666.666 0 0 0 .041.341.745.745 0 0 0 .285.345l.01.006.002.002a.757.757 0 0 0 .235.077l.013.002h.005a.952.952 0 0 0 .346-.062l.013-.005.006-.002a.78.78 0 0 0 .292-.204 1.492 1.492 0 0 0 .227-.334c.068-.135.132-.292.191-.468l.004-.012.002-.005a4.426 4.426 0 0 0 .153-.746zm1.905.105c-.066-.183-.14-.356-.222-.516a1.642 1.642 0 0 0-.236-.356 1.168 1.168 0 0 0-.38-.255.827.827 0 0 0-.328-.063h-.006l-.01.001a.692.692 0 0 0-.23.056.883.883 0 0 0-.306.205 1.706 1.706 0 0 0-.27.424c-.078.18-.152.39-.215.626l-.004.015a.735.735 0 0 0 .046.364.83.83 0 0 0 .32.368l.006.003.002.001a.782.782 0 0 0 .257.078l.01.001h.002a.972.972 0 0 0 .36-.069l.008-.003.003-.001a.885.885 0 0 0 .315-.224 1.573 1.573 0 0 0 .231-.357c.07-.142.136-.307.195-.492l.004-.012.001-.005a4.872 4.872 0 0 0 .155-.783zm1.968.163c-.07-.184-.15-.357-.234-.516a1.637 1.637 0 0 0-.244-.354 1.156 1.156 0 0 0-.388-.251.815.815 0 0 0-.323-.06h-.007l-.009.001a.684.684 0 0 0-.233.058.87.87 0 0 0-.301.208 1.737 1.737 0 0 0-.263.428c-.075.182-.146.395-.208.634l-.004.015a.735.735 0 0 0 .052.362.834.834 0 0 0 .328.364l.005.002.003.001a.784.784 0 0 0 .259.074l.01.001h.002a.968.968 0 0 0 .362-.072l.007-.002.003-.002a.88.88 0 0 0 .313-.227 1.554 1.554 0 0 0 .227-.36c.068-.142.133-.309.192-.494l.004-.012.001-.005a4.954 4.954 0 0 0 .148-.793z"></path></svg>,
  Home: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Bookmark: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>,
  ArrowUp: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>,
  // New File Icon added here
  File: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>,
  FileX: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
};

// --- Helper: Message Formatter ---
const formatMessage = (text) => {
  if (!text) return null;

  // Helper: Handles both **Bold** and `Inline Code`
  const processText = (str) => {
    // 1. Split by single backticks first (`)
    const parts = str.split(/`([^`]+)`/); 

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is INLINE CODE (was inside backticks)
        // We render it with a nice background and color, no backticks
        return (
          <code key={index} style={{ 
            background: '#3e3f4b', 
            color: '#e0e0e0', 
            padding: '2px 5px', 
            borderRadius: '4px',
            fontFamily: 'monospace' 
          }}>
            {part}
          </code>
        );
      } else {
        // This is REGULAR TEXT (check for bolding inside here)
        return part.split(/\*\*(.*?)\*\*/g).map((chunk, i) => 
          (i % 2 === 1) ? <strong key={i}>{chunk}</strong> : chunk
        );
      }
    });
  };

  // 1. Split by Code Blocks (Triple Backticks ```)
  const parts = text.split(/```/);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // --- BLOCK CODE LOGIC (Large code box) ---
      const cleanPart = part.trim().replace(/^[a-z]+\n/, ""); 
      return (
        <div key={index} className="code-block">
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
            <code>{cleanPart}</code>
          </pre>
        </div>
      );
    } else {
      // --- REGULAR TEXT, TABLES, HEADERS ---
      const lines = part.split('\n');
      const elements = [];
      let tableBuffer = [];
      let inTable = false;

      const flushTable = () => {
        if (tableBuffer.length > 0) {
          const headers = tableBuffer[0].split('|').map(c => c.trim()).filter(c => c);
          const rows = tableBuffer.slice(2).map(row => 
            row.split('|').map(c => c.trim()).filter(c => c)
          );
          
          elements.push(
            <div key={`table-${elements.length}`} style={{ overflowX: 'auto', margin: '15px 0' }}>
              <table className="chat-table">
                <thead>
                  <tr>
                    {headers.map((h, i) => <th key={i}>{processText(h)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((c, i) => <td key={i}>{processText(c)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          tableBuffer = [];
          inTable = false;
        }
      };

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Table Detection
        const isTableLine = line.includes('|') && (line.startsWith('|') || line.endsWith('|') || line.includes('---'));

        if (isTableLine) {
          inTable = true;
          tableBuffer.push(line);
        } else {
          if (inTable) flushTable();
          if (!line) continue;

          // Bullet Points
          if (line.startsWith('* ') || line.startsWith('- ')) {
            const content = line.substring(2); 
            elements.push(
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', margin: '6px 0' }}>
                <span style={{ marginRight: '8px', fontSize: '1.2em', lineHeight: '1' }}>•</span>
                <span>{processText(content)}</span>
              </div>
            );
          }
          // Headers
          else if (line.match(/^#{1,6}\s/)) {
            const match = line.match(/^(#{1,6})\s+(.*)/);
            const level = match[1].length;
            const content = match[2];
            const fontSize = ['1.5em', '1.3em', '1.2em', '1.1em', '1em', '0.9em'][level - 1];
            
            elements.push(
              <div key={i} style={{ fontSize: fontSize, fontWeight: 'bold', margin: '15px 0 8px 0' }}>
                {processText(content)}
              </div>
            );
          }
          // Horizontal Rule
          else if (line === '---' || line === '***') {
             elements.push(<hr key={i} className="chat-divider" />);
          }
          // Regular Paragraph
          else {
             elements.push(
               <p key={i} style={{ margin: '8px 0', lineHeight: '1.6' }}>
                 {processText(line)}
               </p>
             );
          }
        }
      }
      if (inTable) flushTable();

      return <div key={index}>{elements}</div>;
    }
  });
};

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I am Gemini, a large language model. I'm designed to help you with code, questions, and creative tasks. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for the attached file
  const [attachedFile, setAttachedFile] = useState(null); 

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handler for file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    } else {
      setAttachedFile(null);
    }
  };

  // Handler to clear the attached file
  const clearAttachedFile = () => {
    setAttachedFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = null; // Clear the input field
    }
  };


  const handleSend = async () => {
    // A message is valid if it has text OR an attached file
    if (!input.trim() && !attachedFile || isTyping) return;

    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "🚨 API Key Missing! Please check the top of App.jsx." 
      }]);
      return;
    }
    
    // 1. Prepare the user's message/content
    const userText = input;
    const userMessage = { role: 'user', text: userText };

    // 2. Start loading and clear input/file states
    setInput('');
    setIsTyping(true);
    setMessages(prev => [...prev, userMessage]); // Optimistically add the text message

    let fileContent = '';
    if (attachedFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            fileContent = `\n\n--- Start of File: ${attachedFile.name} ---\n${text}\n--- End of File ---`;
            // Call the main API logic inside the reader's onload
            await sendToGemini(userText, fileContent);
        };
        reader.onerror = () => {
            setMessages(prev => [...prev, { role: 'bot', text: "Error reading file." }]);
            setIsTyping(false);
            clearAttachedFile();
        };
        reader.readAsText(attachedFile);
        
        clearAttachedFile(); // Clear the file state immediately
    } else {
        // If no file is attached, just send the text
        await sendToGemini(userText, fileContent);
    }

  };
  
  // New function to handle the API call logic
  const sendToGemini = async (userText, fileContent) => {
      const fullPrompt = userText + fileContent;
      
      const history = messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
      }));
      // Add the final combined user part
      history.push({ role: 'user', parts: [{ text: fullPrompt }] });
      
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
      const fetchWithRetry = async (url, options, retries = 3) => {
          for (let i = 0; i < retries; i++) {
              try {
                  const res = await fetch(url, options);
                  if (res.status === 429) throw new Error("429 Too Many Requests");
                  return res;
              } catch (err) {
                  if (i === retries - 1) throw err;
                  await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
              }
          }
      };
  
      try {
          const response = await fetchWithRetry(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: history })
          });
  
          if (!response.ok) {
             const errText = await response.text();
             throw new Error(`${response.status} ${response.statusText} - ${errText}`);
          }
  
          const data = await response.json();
          const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't get a response.";
  
          setMessages(prev => [...prev.slice(0, -1), { role: 'bot', text: botResponse }]); // Re-insert user message correctly with file info if needed
  
      } catch (error) {
          let errorMsg = `Error: ${error.message}`;
          if (error.message.includes("400") || error.message.includes("key")) {
              errorMsg = "Error 400: Invalid API Key. Please check your App.jsx file.";
          }
          setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
      } finally {
          setIsTyping(false);
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  

  return (
    <>
<input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} accept="..." />
<button className="file-btn" onClick={() => fileInputRef.current.click()} disabled={isTyping}>
    <Icons.File />
</button>
<div className="app-container">
        {/* --- Sidebar --- */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <Icons.RocketChat className="logo" />
            <span>ChatGPT</span>
          </div>

          <button className="new-chat-btn" onClick={() => setMessages([])}>
            <Icons.Plus />
            New Chat
          </button>

          <div className="chat-history">
             <div style={{padding: '10px 12px', fontSize: '0.75rem', color: '#8e8ea0', fontWeight: 'bold'}}>Today</div>
             <button className="history-item"><Icons.Chat /> What is React?</button>
             <button className="history-item"><Icons.Chat /> HTML & CSS Help</button>
          </div>

          <div className="sidebar-footer">
             <div className="menu-item"><Icons.Home /> Home</div>
             <div className="menu-item"><Icons.Bookmark /> Saved</div>
             <div className="menu-item"><Icons.ArrowUp /> Upgrade to Pro</div>
          </div>
        </div>

        {/* --- Main Chat --- */}
        <div className="main-chat">
          <div className="mobile-header">
             <button style={{background:'none', border:'none', color:'white'}} onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <Icons.Close /> : <Icons.Menu />}
             </button>
             <span>ChatGPT Clone</span>
             <div style={{width: 24}}></div>
          </div>

          <div className="messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-row ${msg.role}`}>
                <div className="message-content">
                   <div className={`avatar ${msg.role}`}>
                      {msg.role === 'bot' ? <Icons.Bot /> : <Icons.User />}
                   </div>
                   <div className="message-text">
                      {formatMessage(msg.text)}
                   </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
               <div className="message-row bot">
                 <div className="message-content">
                    <div className="avatar bot"><Icons.Bot /></div>
                    <div style={{display:'flex', alignItems:'center'}}>
                       <span className="typing-dot"></span>
                       <span className="typing-dot"></span>
                       <span className="typing-dot"></span>
                    </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} style={{height: 1}} />
          </div>

          <div className="input-area">
             {attachedFile && (
                <div className="attached-file-preview">
                    <span>Attached: **{attachedFile.name}**</span>
                    <button onClick={clearAttachedFile} className="clear-file-btn">
                        <Icons.FileX />
                    </button>
                </div>
             )}
             <div className="input-container">
                {/* File Input and Button */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: 'none' }} // Hide the actual input
                    accept=".txt,.js,.jsx,.ts,.tsx,.json,.md,.html,.css" // Recommended for text/code analysis
                />
                <button 
                    className="file-btn" 
                    onClick={() => fileInputRef.current.click()} // Trigger click on hidden input
                    disabled={isTyping}
                >
                    <Icons.File />
                </button>
                
                <textarea 
                  className="chat-input" 
                  rows="1" 
                  placeholder="Send a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                />
                <button 
                  className="send-btn" 
                  onClick={handleSend}
                  disabled={(!input.trim() && !attachedFile) || isTyping} // Disable if no text AND no file
                >
                  <Icons.Send />
                </button>
             </div>
             <div className="disclaimer">
                Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
