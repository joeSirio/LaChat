"use client";

import React, { useState, useEffect, useRef } from "react";
import APIService from "@/services/APIService";

let nextId = 0;

export default function Home() {
  const [user_input, set_user_input] = useState("");
  const [message_history, set_message_history] = useState<any[]>([]);

  const messageEndRef =  useRef<null | HTMLDivElement>(null); 

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [message_history]);


  function onKeyPressed(e:  React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === "Enter"|| e.key === "NumpadEnter"){
      getJoke();
    }
  }

  function getJoke(){
    APIService.getInstance().GetJoke(user_input).then((result) => {
      let data = JSON.parse(result);

      let message_entry = {
        request: data.input,
        joke: data.joke
      };

      handleMessageHistory(message_entry);
    })
    set_user_input("");
  }

  function handleMessageHistory(message: any){
    set_message_history([...message_history, message])
  }

  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    set_user_input(e.target.value);
  }

  return (
    <div className='content-wrapper'>
      <header className='header'>
        <div className='header-upper'>
          <img src='/cat_logo.svg' />
          <br/>
          <h1>LaughChat</h1> 
        </div>
        <div className='header-lower'>
          <a href='#'>How It Works</a>
          <a href='#'>Settings</a>
          <a href='#'>Logout</a>
        </div>
      </header>
      <main>
        <div className='content'>
          <div className='message-history-wrapper'>
            <div id="MessageHistory" className='message-history'>
              {message_history.map(message => (
                <div key={nextId++}>
                  <div className="message-history-item user-input-entry">
                    <div className='profile-img'>
                        <img src='/user_profile.svg' />
                    </div>
                    <div className='history-item-text'>{message.request}</div>
                  </div>
                  <div className="message-history-item chat-gpt-response">
                    <div className='profile-img'>
                      <img src='/kitty_profile.svg' />
                    </div>
                    <div className='history-item-text'>{message.joke}</div>
                  </div>

                  <div ref={messageEndRef} />
                </div>
              ))}
            </div>
          </div>
          <div className='user-input-wrapper'>
            <input className='user-text-input' placeholder='What would you like to ask me?'
              value={user_input} onChange={onChange} onKeyDown={onKeyPressed} />
            <button className='user-submit-btn' onClick={getJoke}></button>
          </div>
        </div>
      </main>
    </div>
  )
}
