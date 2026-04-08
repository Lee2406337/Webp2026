const container = document.getElementById("container");
const typedKey = document.getElementById("typedKey");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");

function getRandomChar() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

function getRandomString(min, max) {
  const len = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = "";

  for (let i = 0; i < len; i++) {
    result += getRandomChar();
  }

  return result;
}

function renderText(text) {
  // 字元間加空格，較好觀察
  container.textContent = text.split("").join(" ");
}

function getCurrentRawText() {
  // 把畫面上的空格移掉，取回真正字串
  return container.textContent.replace(/\s/g, "");
}

function initGame() {
  const startText = getRandomString(0, 2);
  renderText(startText);
  typedKey.textContent = "-";
}

function handleKeyUp(event) {
  const key = event.key.toLowerCase();

  // 只接受 a-z
  if (!/^[a-z]$/.test(key)) {
    return;
  }

  typedKey.textContent = key;

  let currentText = getCurrentRawText();

  // 如果第一個字元相同，就刪掉第一個
  if (currentText.length > 0 && currentText[0] === key) {
    currentText = currentText.slice(1);
  }

  // 再補 1~3 個亂數字元到後面
  currentText += getRandomString(1, 3);

  renderText(currentText);
}

window.onload = function () {
  initGame();

  window.addEventListener("keyup", handleKeyUp);

  resetBtn.addEventListener("click", function () {
    initGame();
  });

  clearBtn.addEventListener("click", function () {
    renderText("");
    typedKey.textContent = "-";
  });
};