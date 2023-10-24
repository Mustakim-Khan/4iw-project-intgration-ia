const initButtonClose = document.querySelector(".init-button__close");
const initButtonOpen = document.querySelector(".init-button__open");
const btnArrow = document.querySelector(".chat-admin-options .btn-arrow");
const chat = document.querySelector(".chat");
const initText = document.querySelector(".init-text");
const chatBody = document.querySelector(".chat-body");
const chatInput = document.querySelector(".chat-input input");

const chatBodyScroll = () => {
  chatBody.scrollTop = chatBody.scrollHeight;
};

initButtonClose.addEventListener("click", () => {
  chatBodyScroll();
  initButtonClose.style.transform = "translateX(-50%)";
  initButtonOpen.style.transform = "translateX(-50%)";
  initText.style.display = "none";
  chat.classList.add("show");
});

btnArrow.addEventListener("click", () => {
  initButtonClose.style.transform = "translateX(50%)";
  initButtonOpen.style.transform = "translateX(50%)";
  initText.style.display = "flex";
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