const chatContainer = document.getElementById("chatContainer");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChat");
const exportBtn = document.getElementById("exportHistory");
const importBtn = document.getElementById("importHistory");
const themeBtn = document.getElementById("toggleTheme");
const codeModeToggle = document.getElementById("codeMode");

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

function renderChat() {
  chatContainer.innerHTML = "";
  chatHistory.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message " + msg.role;
    if (msg.role === "bot" && msg.content.includes("```")) {
      const parts = msg.content.split(/```/);
      div.innerHTML = "";
      parts.forEach((part, i) => {
        if (i % 2 === 1) {
          const code = document.createElement("pre");
          code.className = "language-js";
          code.innerHTML = "<code>" + part + "</code>";
          div.appendChild(code);
          Prism.highlightAllUnder(code);
        } else {
          div.innerHTML += part;
        }
      });
    } else {
      div.textContent = msg.content;
    }
    chatContainer.appendChild(div);
  });
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addMessage(role, content) {
  chatHistory.push({ role, content });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  renderChat();
}

sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage("user", text);
  chatInput.value = "";
  // Fake AI reply
  setTimeout(() => {
    let reply = codeModeToggle.checked
      ? "Here is some example code:\n```python\nprint('Hello, world!')\n```"
      : "This is a simulated reply.";
    addMessage("bot", reply);
  }, 500);
});

newChatBtn.addEventListener("click", () => {
  chatHistory = [];
  localStorage.removeItem("chatHistory");
  renderChat();
});

exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(chatHistory, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chat_history.json";
  a.click();
});

importBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      chatHistory = JSON.parse(reader.result);
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      renderChat();
    };
    reader.readAsText(file);
  };
  input.click();
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

renderChat();