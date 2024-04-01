import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/apiRoutes';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      const fetchData = async () => {
        try {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      
      fetchData();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromself: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receieved', (msg) => {
        setArrivalMessage({ fromself: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev , arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className="grid grid-rows-10% 80% 10% gap-0.1rem overflow-hidden">
          <div className="flex justify-between items-center px-8 chat-header">
            <div className="flex items-center space-x-4 user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="px-8 chat-messages overflow-auto scrollbar-hide">
            {messages.map((message) => (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromself ? 'sended' : 'received'}`}>
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;
