'use client'
import * as React from 'react'
import { Box, Stack, Input, Button } from '@mui/joy'
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function AssistantChat() {
  const [search, setSearch] = React.useState("");

  const callAssistant = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            recipes: search
        })
    });

    const json = await response.json();
    console.log(json);
  }

  React.useEffect(() => {
    const initButtonClose = document.querySelector(".init-button__close");
    const initButtonOpen = document.querySelector(".init-button__open");
    const btnArrow = document.querySelector(".chat-admin-options .btn-arrow");
    const chat = document.querySelector(".chat");
    const chatBody = document.querySelector(".chat-body");
    const chatInput = document.querySelector(".chat-input input");


    const chatBodyScroll = () => {
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    initButtonClose.addEventListener("click", () => {
      chatBodyScroll();
      initButtonClose.style.transform = "translateX(-50%)";
      initButtonOpen.style.transform = "translateX(-50%)";
      chat.classList.add("show");
    });

    btnArrow.addEventListener("click", () => {
      initButtonClose.style.transform = "translateX(50%)";
      initButtonOpen.style.transform = "translateX(50%)";
      chat.classList.remove("show");
    });

    initButtonOpen.addEventListener("click", () => {
      if (chatInput.value == "") {
        chatInput.classList.add("wrong");
        setTimeout(() => {
          chatInput.classList.remove("wrong");
        }, 1000);
      } else {
        const newSend = document.createElement("div");
        newSend.classList.add("send");
        newSend.innerText = chatInput.value;
        chatBody.appendChild(newSend);
        chatBodyScroll();

        const writeReceive = document.createElement("div");
        writeReceive.classList.add("receive");
        writeReceive.classList.add("write");
        writeReceive.innerText = "Ecrit ...";
        chatBody.appendChild(writeReceive);
        chatBodyScroll();

        const newReceive = document.createElement("div");
        newReceive.classList.add("receive");
        newReceive.innerHTML =
          "Je comprends pas ce que tu dis ... Tu peux visiter mon portfolio <a href='https://lndev.me'>https://lndev.me</a>";

        setTimeout(() => {
          chatBody.appendChild(newReceive);
          chatBodyScroll();
          chatBody.removeChild(writeReceive);
          chatBodyScroll();
        }, 1500);

        chatInput.value = "";
      }
    });
  }, []);



  return (
    <div className="chatbot">
      <div className="chat">
        <div className="chat-header">
          <div className="chat-admin">
            <img src="./assets/img/user_logo.png" alt="ln" />
            <div className="chat-admin-text">
              <h3>Discuter avec</h3>
              <h2>ChatBot</h2>
            </div>
            <div className="chat-admin-options">
              <button className="btn-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="chat-welcome">
            <span></span>
            <p>
              Nous répondons généralement dans un délai de quelques minutes.
            </p>
          </div>
          <img className="chat-wave" src="/assets/img/wave.svg" alt="wave" />
        </div>
        <div className="chat-body">
          <div className="send">
            Yo LN, tu as pu realiser le challenge de Benjamin code ?
          </div>
          <div className="receive">Yes bien sur :)</div>
          <div className="send">Comment tu l'as trouvé ?</div>
          <div className="receive">Tres chouette c'etait cooool ...</div>
          <div className="send">Bon courage pour la suite !</div>
          <div className="receive">Merci, C'est gentil :)</div>
          <div className="receive">
            J'espere que tu assistera a mon speech sur tailwind pendant l'
            Asynconf 2022
          </div>
          <div className="send">Ouii normalement !</div>
          <div className="receive">Ok nice, Ciao.</div>
        </div>
        <div className="chat-footer">
          <div className="chat-input">
            <input type="text" placeholder="Ecrivez votre message ..." />
          </div>
        </div>
      </div>
      <div className="init">
        <div className="init-button">
          <div className="init-button__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffffff"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgba(88,88,88,1)"
                className="w-6 h-6"
              >
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                />
              </svg>
            </span>
          </div>
          <div className="init-button__open">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffffff"
              className="w-6 h-6"
            >
              <path
                d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
              />
            </svg>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgba(88,88,88,1)"
                className="w-6 h-6"
              >
                <path
                  d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
