const getCalcBtn = document.getElementById("calc-btn"),
      getResultWrap = document.getElementById("result-div-wrap");

/*

才能開花段階	必要ピース数
星1⇒星2	50
星2⇒星3	100
星3⇒星4	200
星4⇒星5	300

*/

// 女神像計算機能
function remainningCount() {

  // 入力情報の取得
  const getLevel = document.getElementById("level-select"),
        getRate = document.getElementById("rate-select"),
        getHave = document.getElementById("have"),
        getRem = document.getElementById("remaining-select");

  const level = Number(getLevel.value);

  let have = Number(getHave.value),          // 所持しているピースの数
      remaining = Number(getRem.value),      // 現在のレート = 女神像の交換済み数
      needS = 0,                             // トータルで必要な女神像の数（S = Statue 銅像）
      changeRate = Number(getRate.value);    // ピース1個との交換に必要な、女神像の数

  let count = 0,
      star2 = 0,
      star3 = 0,
      star4 = 0,
      star5 = 0;

  let needP = 0;    // 必要なピースの数

  console.log("Level = " + level + " needP = " + needP);

  const needPCalc = () => {
    if (level === 1) {
      needP = 650;
      console.log("if50")
    }else if (level === 2) {
      needP = 600;
    }else if (level === 3) {
      needP = 500;
    }else if (level === 4) {
      needP = 300;
    }
  }
  needPCalc();

  console.log("needP = " + needP)

  console.log("Rate = " + changeRate);
  console.log("Have = " + have);
  console.log("Remaining = " + remaining);


  while (have < needP) {
    count++;
    have++;
    remaining--;
    needS += changeRate;
    if (remaining === 0 && changeRate < 5) {
      remaining = 25;
      changeRate += 1;
      console.log("------ レート " + (changeRate - 1) + " ⇒ " + changeRate + " ------");
    }

    if (level === 1) {
      if (have === 50) {
        star2 = needS;
      }else if (have === 150) {
        star3 = needS;
      }else if (have === 350) {
        star4 = needS;
      }else if (have >= 650) {
        star5 = needS;
      }
    }else if (level === 2) {
      if (have === 100) {
        star3 = needS;
      }else if (have === 300) {
        star4 = needS;
      }else if (have === 600) {
        star5 = needS;
      }
    }else if (level === 3) {
      if (have === 200) {
        star4 = needS;
      }else if (have === 500) {
        star5 = needS;
      }
    }else if (level === 4) {
      if (have === 300) {
        star5 = needS;
      }
    }
  }
  console.log("Start level = " + level)
  console.log("have = " + have)
  console.log("needS = " + needS)

  const createH5 = num => {
    const createResultH5 = document.createElement("h5");
    createResultH5.id = "result-" + num;
    createResultH5.classList.add("result-h5");
    return getResultWrap.appendChild(createResultH5);
  }

  const createSpan = num => {
    const getCreH5 = createH5(num);
    const creSpan = document.createElement("span");
    getCreH5.innerText = "★" + (num + 1) + "に必要な女神像の個数は ";
    creSpan.id = "result-span-" + num;
    creSpan.style.color = "red";
    return getCreH5.appendChild(creSpan);
  }

  if (level < 2) {
    // console.log("★2に必要な女神像の個数は " + star2 + "個 です");
    createSpan(1).innerText = star2 + "個";
  }

  if (level < 3) {
    // console.log("★3に必要な女神像の個数は " + star3 + "個 です");
    createSpan(2).innerText = star3 + "個";
  }

  if (level < 4) {
    // console.log("★4に必要な女神像の個数は " + star4 + "個 です");
    createSpan(3).innerText = star4 + "個";
  }

  if (level < 5) {
    // console.log("★5に必要な女神像の個数は " + star5 + "個 です");
    createSpan(4).innerText = star5 + "個";
  }
}

getCalcBtn.onclick = (() => {
  // ResultWrapの中をリセット
  while (getResultWrap.firstChild) {
    getResultWrap.removeChild(getResultWrap.firstChild);
  }
  console.clear();
  remainningCount();
})