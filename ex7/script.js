const container = document.getElementById("container");
const typedKey = document.getElementById("typedKey");
const wrongCountText = document.getElementById("wrongCount");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");

let wrongCount = 0;

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
  container.textContent = text.split("").join(" ");
}

function getCurrentRawText() {
  return container.textContent.replace(/\s/g, "");
}

function updateWrongCount() {
  wrongCountText.textContent = wrongCount;
}

function initGame() {
  const startText = getRandomString(0, 2);
  renderText(startText);
  typedKey.textContent = "-";
  wrongCount = 0;
  updateWrongCount();
}

function handleKeyUp(event) {
  const key = event.key.toLowerCase();

  // 只接受 a-z
  if (!/^[a-z]$/.test(key)) {
    return;
  }

  typedKey.textContent = key;

  let currentText = getCurrentRawText();

  if (currentText.length > 0 && currentText[0] === key) {
    // 打對：刪掉第一個字元，錯誤次數歸零
    currentText = currentText.slice(1);
    wrongCount = 0;
  } else {
    // 打錯：累加錯誤次數
    wrongCount++;
  }

  // 原本就要補 1~3 個亂數字元
  currentText += getRandomString(1, 3);

  // 連續打錯 3 次，再額外增加 3 個亂數字元
  if (wrongCount === 3) {
    currentText += getRandomString(3, 3);
    wrongCount = 0;
  }

  renderText(currentText);
  updateWrongCount();
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
    wrongCount = 0;
    updateWrongCount();
  });
};