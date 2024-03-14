'use client'
import styles from './chat.module.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import InputLabel from './InputLabel';
import Button from './utils/Button';
import { usePathname, useRouter } from 'next/navigation';


function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const user = useSelector((state) => state.user.value);
  const messagesEndRef = useRef(null);
  const pathname = usePathname();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

    
    useEffect(() => {
      // Code pour charger les messages du groupe depuis la base de données ou le service de messagerie instantanée
      fetch('http://localhost:5500/chat/recuperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { token: user.token, idTrip: currentTrip._id, } )
      }).then(response => response.json())
      .then(data => {
        if(data)
        // console.log('chatData', data.chatData)
        setMessages(data.chatData)
        if (pathname === '/chat') {
          scrollToBottom()
        }
      })

    }, [user.token, currentTrip]);
  
    const handleSendMessage = () => {
      // console.log('click to send')
      // console.log('token',user.token, 'message', inputValue, 'idTrip', currentTrip._id)
      if (inputValue.trim() !== '') {
        // Code pour envoyer le message au backend et le diffuser à tous les membres du groupe
        fetch('http://localhost:5500/chat/sendmsg', { 
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( { token: user.token, idTrip: currentTrip._id, message: inputValue } )
        }).then(response => response.json())
        .then(data => {
          // console.log('data.chat after sending', data.chat)
          setMessages(data.chat);
        })
        setInputValue('');
        scrollToBottom();
      }
    };

    return (
      <div className={styles.mainContainer}> <h2>Messages :</h2>
        <div className={styles.allMsgContainer}>
          {messages.map((message, index) => (
          <div className={`${styles.messagesContainer} ${message.author === user.username ? styles.userMessagesContainer : styles.otherMessagesContainer}`} key={index}>
            <div className={`${styles.messagesRow} ${message.author === user.username ? styles.userMessage : styles.otherMessage}`} key={index}>
              <div className={styles.author}>{message.author === user.username ? 'Moi' : message.author} : </div>
              <div className={styles.msgContent}>{message.message}</div>
            </div>
          </div>
          ))}
          <div ref={messagesEndRef}></div>
          {messages.length === 0  && <div className={styles.empty}> Démarre la discussion !</div>}
        </div >
        <div className={styles.inputContainer}>
        <InputLabel style={{width: "100%"}} type="text-area" onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Ton message" placeholder="Saisis ton message !" />
        {/* <button className={styles.button} onClick={handleSendMessage}> Envoyer </button> */}
        <Button buttonClass="primary" text="Envoyer" onClick={() => handleSendMessage()} />
        </div>
        
      </div>
    );
  
}

export default GroupChat;