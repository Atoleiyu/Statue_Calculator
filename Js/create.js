// レート Optionタグ生成
const creRateOp = () => {
  const getRateSelect = document.getElementById("rate-select");
  for (let i = 0; i < 5; i++) {
    const creOption = document.createElement("option");
    let int = i + 1;
    creOption.value = int;
    creOption.innerText = int;
    getRateSelect.appendChild(creOption);
  }
}
creRateOp();

// 必要数 Optionタグ生成
const creRemainOp = () => {
  const getRemainSelect = document.getElementById("remaining-select");
  for (let i = 25; i > 0; i--) {
    const creOption = document.createElement("option");
    creOption.value = i;
    creOption.innerText = "あと" + i + "回";
    getRemainSelect.appendChild(creOption);
  }
}
creRemainOp();