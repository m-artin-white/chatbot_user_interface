import './App.css';
import './normal.css';
import ChatMessage from './components/ChatMessage';
import SyncLoader from "react-spinners/SyncLoader";
import { useState, useEffect, useRef } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      const handleInput = () => {
        textarea.style.height = 'auto'; 
        textarea.style.height = textarea.scrollHeight + 'px'; 
      };
      textarea.addEventListener('input', handleInput);
      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, []);

  function clearChats() {
    setChatLog([]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      setChatLog([...chatLog, { user: "me", message: `${trimmedInput}` }]);
      setInput("");
      const inputField = inputRef.current;
      inputField.style.height = 'auto';
      inputField.disabled = true;
      setIsLoading(true);
  
      try {
          // Connect to your API here:
          const response = await fetch();
          const data = await response.json();
          setChatLog(prevChatLog => [...prevChatLog, { user: "gpt", message: data.response }]);
        } catch (error) {
            console.error("Error:", error);
            setChatLog(prevChatLog => [...prevChatLog, { user: "gpt", message: "There has been an error generating a response to your query. Please try again." }]);
        } finally {
            inputField.disabled = false;
            setIsLoading(false);
        }
    }
  }

  return (
    <div className='App'>
      <aside className='sidemenu'>
        <div className='container'>
          <h1 className='heading'>Chatbot UI</h1>
        </div>
        <div className='lower-side-menu'>
          <div className='side-menu-button' onClick={clearChats}>
            <span>+</span>
            New Chat
          </div>
        </div>
      </aside>
      <section className="chatbox">
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div className="loader-wrapper">
            {isLoading && <SyncLoader color="#336699" margin={10} size={15} />}
          </div>
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              rows="1"
              className='chat-input-textarea'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Message Chatbot...'
              onKeyDown={handleKeyDown}
            ></textarea>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;