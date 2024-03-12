'use client'
import styles from './chat.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoCurrentTrip from './missingInfos/NoCurrentTrip';


function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const currentTrip = useSelector((state) => state.user.value.currentTrip);
  const user = useSelector((state) => state.user.value);

  
    if (!user.currentTrip) {
      return <NoCurrentTrip title="Dashboard" />
  } else {
    useEffect(() => {
      // Code pour charger les messages du groupe depuis la base de données ou le service de messagerie instantanée
      fetch('http://localhost:5500/chat/recuperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { token: user.token, idTrip: currentTrip._id, } )
      }).then(response => response.json())
      .then(data => {
        // console.log('chatData', data.chatData)
        setMessages(data.chatData)
      })
    }, []);
  
    const handleSendMessage = () => {
      console.log('click to send')
      console.log('token',user.token, 'message', inputValue, 'idTrip', currentTrip._id)
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
      }
    };

    return (
      <div className={styles.mainContainer}>
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div className={`${styles.messagesRow} ${message.author === user.username ? styles.userMessage : styles.otherMessage}`} key={index}>
              <div className={styles.author}>{message.author === user.username ? 'Moi' : message.author}</div>
              <div className={styles.msgContent}>{message.message}</div>
            </div>
          ))}
        </div>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.button} onClick={handleSendMessage}> Send </button>
      </div>
    );
  }
}

export default GroupChat;