class StatueCalculator
{
  // 現在の才能開花レベル
  level = Number(document.getElementById("level-select").value);
  // ピース1個との交換に必要な、女神像の数
  changeRate = Number(document.getElementById("rate-select").value);
  // 所持しているピースの数
  have = Number(document.getElementById("have").value);
  // 現在のレート = 女神像の交換済み数
  remaining = Number(document.getElementById("remaining-select").value);
  // 才能開花に必要なレベル毎の目標ピース数
  targetPiece = {1:650, 2:600, 3:500, 4:300}

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
    // 画面からのパラメータを用いて、才能開花に必要なピース数を計算する。
    const needPieces = this.calcNeedStatue(this.have, this.changeRate, this.remaining, this.targetPiece[this.level]);
    for(let count = 1; count <= (5 - this.level); count++) {
      const needPiecesKey = "level" + (this.level + count);
      this.createSpan(this.level, needPieces[needPiecesKey], count);
    }

    console.log("Level = " + this.level + " targetPiece = " + this.targetPiece[this.level]);
    console.log("Rate = " + this.changeRate);
    console.log("Have = " + this.have);
    console.log("Remaining = " + this.remaining);
  }

  /**
   * 才能開花に必要なピース数を計算して返す。
   * 計算は女神像の交換レートと保有ピースを基に計算する。
   * calcNeedStatue
   *
   * @param {int} have  保有ピース数
   * @param {int} changeRate  ピース1個との交換に必要な、女神像の数
   * @param {int} remaining 現在のレートで女神像とピースを交換可能な残り回数
   * @param {int} targetPiece 指定されたレベルへの才能開花に必要な目標ピース数
   * @return {array} レベル2~4までの必要な女神像の数
   */
  calcNeedStatue(have, changeRate, remaining, targetPiece) {
    let needPieces = {"level2":0, "level3":0, "level4":0, "level5":0};
    let count = 0;
    // トータルで必要な女神像の数（S = Statue 銅像）
    let needS = 0;
    while (have < targetPiece) {
      count++;
      have++;
      remaining--;
      needS += changeRate;
      if (remaining === 0 && changeRate < 5) {
        remaining = 25;
        changeRate += 1;
      }

      if (this.level === 1) {
        if (have === 50) {
          needPieces["level2"] = needS;
        }else if (have === 150) {
          needPieces["level3"] = needS;
        }else if (have === 350) {
          needPieces["level4"] = needS;
        }else if (have >= 650) {
          needPieces["level5"] = needS;
        }
      }else if (this.level === 2) {
        if (have === 100) {
          needPieces["level3"] = needS;
        }else if (have === 300) {
          needPieces["level4"] = needS;
        }else if (have === 600) {
          needPieces["level5"] = needS;
        }
      }else if (this.level === 3) {
        if (have === 200) {
          needPieces["level4"] = needS;
        }else if (have === 500) {
          needPieces["level5"] = needS;
        }
      }else if (this.level === 4) {
        if (have === 300) {
          needPieces["level5"] = needS;
        }
      }
    }
    return needPieces;
  }

  createSpan(level, needPiece, count) {
    const targetLevel = level + count;
    console.log("targetLevel = " + targetLevel + ", needPiece = " + needPiece);
    // spanタグを作成
    const creSpan = document.createElement("span");
    creSpan.id = "result-span-" + targetLevel;
    creSpan.style.color = "red";
    // H5タグを作成
    const getCreH5 = this.createH5(targetLevel);
    getCreH5.innerText = "★" + targetLevel + "に必要な女神像の個数は ";
    getCreH5.appendChild(creSpan).innerText = needPiece + "個";
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

getCalcBtn.onclick = (() => {
  const StatueCalculatorClass = new StatueCalculator();
  // ResultWrapの中をリセット
  while (getResultWrap.firstChild) {
    getResultWrap.removeChild(getResultWrap.firstChild);
  }
  console.clear();
  StatueCalculatorClass.execute();
})