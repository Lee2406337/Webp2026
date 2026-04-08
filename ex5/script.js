const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const clearBtn = document.getElementById("clearBtn");
const deleteTarget = document.getElementById("deleteTarget");
const buttonContainer = document.getElementById("buttonContainer");

// 找出目前最小缺少的按鈕編號
function getNextAvailableNumber() {
  const buttons = buttonContainer.getElementsByTagName("button");
  const usedNumbers = [];

  for (let i = 0; i < buttons.length; i++) {
    const number = parseInt(buttons[i].dataset.number);
    usedNumbers.push(number);
  }

  usedNumbers.sort(function (a, b) {
    return a - b;
  });

  let nextNumber = 1;
  for (let i = 0; i < usedNumbers.length; i++) {
    if (usedNumbers[i] === nextNumber) {
      nextNumber++;
    } else if (usedNumbers[i] > nextNumber) {
      break;
    }
  }

  return nextNumber;
}

// 更新下拉選單內容
function updateDeleteSelect() {
  deleteTarget.innerHTML = '<option value="">請先選擇按鈕</option>';

  const buttons = buttonContainer.getElementsByTagName("button");
  const buttonList = [];

  for (let i = 0; i < buttons.length; i++) {
    buttonList.push({
      id: buttons[i].id,
      text: buttons[i].textContent,
      number: parseInt(buttons[i].dataset.number)
    });
  }

  buttonList.sort(function (a, b) {
    return a.number - b.number;
  });

  for (let i = 0; i < buttonList.length; i++) {
    const option = document.createElement("option");
    option.value = buttonList[i].id;
    option.textContent = buttonList[i].text;
    deleteTarget.appendChild(option);
  }
}

// 新增按鈕
addBtn.addEventListener("click", function () {
  const number = getNextAvailableNumber();

  const newButton = document.createElement("button");
  newButton.className = "btn btn-success";
  newButton.id = "dynamicBtn" + number;
  newButton.dataset.number = number;
  newButton.textContent = "按鈕 " + number;

  buttonContainer.appendChild(newButton);
  updateDeleteSelect();
});

// 刪除指定按鈕
deleteBtn.addEventListener("click", function () {
  const targetId = deleteTarget.value;

  if (targetId === "") {
    alert("請先選擇要刪除的按鈕");
    return;
  }

  const targetButton = document.getElementById(targetId);

  if (targetButton) {
    buttonContainer.removeChild(targetButton);
    updateDeleteSelect();
  }
});

// 全部刪除
clearBtn.addEventListener("click", function () {
  buttonContainer.innerHTML = "";
  updateDeleteSelect();
});