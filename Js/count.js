class StatueCalculator
{
  constructor() {
    this.execute();
  }

  /**
   * 才能開花に必要なピース数を下記記載の才能開花段階に応じて計算する。
   * execute
   *
   * 才能開花段階	必要ピース数
   * 星1⇒星2	50
   * 星2⇒星3	100
   * 星3⇒星4	200
   * 星4⇒星5	300
   *
   */
  execute() {
    // 現在の才能開花レベル
    const level = Number(document.getElementById("level-select").value);
    // 画面からのパラメータを用いて、才能開花に必要な女神像の数を計算する。
    const needStatue = this.calcNeedStatue(level);

    for(let count = 1; count <= (5 - level); count++) {
      const needStatueKey = "level" + (level + count);
      this.createSpan(level, needStatue[needStatueKey], count);
    }
  }

  /**
   * 才能開花に必要な女神像の数を計算して返す。
   * 計算は女神像の交換レートと保有ピースを基に計算する。
   * calcNeedStatue
   *
   * @param {int} level  現在の才能開花レベル
   * @return {array} レベル2~4までの必要な女神像の数
   */
  calcNeedStatue(level) {
    // 才能開花に必要なレベル毎の目標ピース数
    const targetPiece = {1:650, 2:600, 3:500, 4:300};

    // 所持しているピースの数
    let have = Number(document.getElementById("have").value);
    // 現在の交換レート（ピース1個との交換に必要な、女神像の数）
    let exchangeRate = Number(document.getElementById("rate-select").value);
    // 現在の交換レートで、ピースと女神像の交換可能な残り回数
    let exchangeRemaining = Number(document.getElementById("remaining-select").value);

    let needStatue = {"level2":0, "level3":0, "level4":0, "level5":0};

    let StatueCount = 0;

    for (have += 1; have <= targetPiece[level]; have++) {
      StatueCount += exchangeRate;
      exchangeRemaining--;
      // 交換可能な残り回数が0回かつ交換レートが5未満の場合、残り回数を25回にリセットして交換レートを1つ上げる。
      if (exchangeRemaining === 0 && exchangeRate < 5) {
        exchangeRemaining = 25;
        exchangeRate += 1;
      }

      switch (level) {
        case 1:
          if (have === 50) {
            needStatue["level2"] = StatueCount;
          }else if (have === 150) {
            needStatue["level3"] = StatueCount;
          }else if (have === 350) {
            needStatue["level4"] = StatueCount;
          }else if (have === 650) {
            needStatue["level5"] = StatueCount;
          }
          break;
        case 2:
          if (have === 100) {
            needStatue["level3"] = StatueCount;
          }else if (have === 300) {
            needStatue["level4"] = StatueCount;
          }else if (have === 600) {
            needStatue["level5"] = StatueCount;
          }
          break;
        case 3:
          if (have === 200) {
            needStatue["level4"] = StatueCount;
          }else if (have === 500) {
            needStatue["level5"] = StatueCount;
          }
          break;
        case 4:
          if (have === 300) {
            needStatue["level5"] = StatueCount;
          }
          break;
      }
    }
    return needStatue;
  }

  createSpan(level, needStatue, count) {
    const targetLevel = level + count;
    console.log("targetLevel = " + targetLevel + ", needStatue = " + needStatue);
    // spanタグを作成
    const creSpan = document.createElement("span");
    creSpan.id = "result-span-" + targetLevel;
    creSpan.style.color = "red";
    // H5タグを作成
    const getCreH5 = this.createH5(targetLevel);
    getCreH5.innerText = "★" + targetLevel + "に必要な女神像の個数は ";
    getCreH5.appendChild(creSpan).innerText = needStatue + "個";
  }

  createH5(targetLevel) {
    const createResultH5 = document.createElement("h5");
    createResultH5.id = "result-" + targetLevel;
    createResultH5.classList.add("result-h5");
    return getResultWrap.appendChild(createResultH5);
  }

}

const getCalcBtn = document.getElementById("calc-btn"),
      getResultWrap = document.getElementById("result-div-wrap");

getCalcBtn.onclick = () => {
  const StatueCalculatorClass = new StatueCalculator();
  // ResultWrapの中をリセット
  while (getResultWrap.firstChild) {
    getResultWrap.removeChild(getResultWrap.firstChild);
  }
  console.clear();
  StatueCalculatorClass.execute();
}