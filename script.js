
function go(n) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));
  document
    .getElementById('s' + n)
    .classList.add('active');
  window.scrollTo(0, 0);
}



const clickedSecurityOptions = new Set();
function security(opt, button) {
  const feedback = document.getElementById("secFeedback");
  if (opt === "A") {
    feedback.innerHTML =
      "Hmm.<br>Technically correct.<br>But incomplete.";
  }
  else if (opt === "B") {
    feedback.innerHTML =
      "Correct in the broadest sense.";
  }
  else if (opt === "C") {
    feedback.innerHTML =
      "That also seems to be true.";
  }
  else if (opt === "D") {
    feedback.innerHTML =
      "That is an accurate piece of information.";
  }
  // 记录这个选项已经被点击过
  clickedSecurityOptions.add(opt);
  // 给已经点过的按钮增加一个 class
  button.classList.add("visited");
  // 如果 A B C D 全部点过
  if (clickedSecurityOptions.size === 4) {
    document
      .getElementById("secNext")
      .classList.remove("hidden");
  }
}

const clickedRelationshipOptions = new Set();
function relationship(opt, button) {
  const feedback =
    document.getElementById("relationshipFeedback");
  if (opt === "A") {
    feedback.innerHTML = "Possibly.";
  }
  else if (opt === "B") {
    feedback.innerHTML = "That sounds suspiciously accurate.";
  }
  else if (opt === "C") {
    feedback.innerHTML = "Very convenient answer.";
  }
  else if (opt === "D") {
    feedback.innerHTML = "At least that's honest.";
  }
  clickedRelationshipOptions.add(opt);
  button.classList.add("visited");
  if (clickedRelationshipOptions.size >= 4) {
    setTimeout(() => {
      feedback.innerHTML = "Processing all answers...";
    }, 500);
    setTimeout(() => {
      feedback.innerHTML = "Still confused...";
    }, 1100);
    setTimeout(() => {
      feedback.innerHTML =
        "<strong>Classification failed.</strong><br>Please continue anyway.";
      document
        .getElementById("relationshipNext")
        .classList.remove("hidden");
    }, 1700);
  }
}

let openedMemories = 0;
function openMemory(button, text) {

  // 如果已经点开过，就不重复计算
  if (button.classList.contains("opened")) {
    return;
  }
  button.classList.add("opened");
  button.innerText = text;
  openedMemories++;
  document
    .getElementById("memoryProgress")
    .innerText =
    openedMemories + " / 9 discovered";
  if (openedMemories === 9) {
    document
      .getElementById("memoryConclusion")
      .classList.remove("hidden");

    document
      .getElementById("memoryNext")
      .classList.remove("hidden");
  }
}

let attachmentCalculationRunning = false;
function startAttachmentCalculation() {
  // 防止重复点 START
  if (attachmentCalculationRunning) {
    return;
  }
  attachmentCalculationRunning = true;
  const bar =
    document.getElementById("attachmentBar");
  const number =
    document.getElementById("attachmentNumber");
  const status =
    document.getElementById("attachmentStatus");
  const startButton =
    document.getElementById("calculateButton");
  const result =
    document.getElementById("attachmentResult");
  const next =
    document.getElementById("attachmentNext");
  // 点击后隐藏开始按钮
  startButton.classList.add("hidden");

  let value = 0;
  status.innerText =
    "Calculating current attachment level...";
  // 第一阶段：0 → 100
  const firstCalculation =
    setInterval(() => {
      value++;
      bar.style.width =
        value + "%";
      number.innerText =
        value + "%";
      if (value >= 100) {
        clearInterval(firstCalculation);
        status.innerText =
          "Something seems wrong.";
        // 停顿一下，再重新计算
        setTimeout(() => {
          status.innerText =
            "Recalculating...";
          secondCalculation();
        }, 1200);
      }
    }, 25);

  function secondCalculation() {
    const second =
      setInterval(() => {
        value++;
        /*
        这里不能真的让宽度超过容器，
        所以视觉上最多保持100%
        */
        bar.style.width =
          Math.min(value, 100) + "%";
        number.innerText =
          value + "%";
        if (value >= 137) {
          clearInterval(second);
          number.classList.add("overload");
          status.innerText =
            "Calculation complete.";
          result.classList.remove("hidden");
          next.classList.remove("hidden");
        }
      }, 45);
  }
}






const noBtn = document.getElementById("noBtn");
function moveNoButton() {

  const container =
    document.getElementById("yesno");
  const containerRect =
    container.getBoundingClientRect();
  const buttonRect =
    noBtn.getBoundingClientRect();
  const maxX =
    containerRect.width - buttonRect.width;
  const maxY =
    containerRect.height - buttonRect.height;
  const randomX =
    Math.random() * maxX;
  const randomY =
    Math.random() * maxY;
  noBtn.style.left =
    randomX + "px";
  noBtn.style.top =
    randomY + "px";
}

// 电脑：鼠标移入时逃跑
noBtn.addEventListener(
  "mouseenter",
  moveNoButton
);

// 手机：触摸时逃跑
noBtn.addEventListener(
  "touchstart",
  function(event) {
    event.preventDefault();
    moveNoButton();

  }
);

// 保险：普通点击时也逃跑
noBtn.addEventListener(
  "click",
  function(event) {
    event.preventDefault();
    moveNoButton();

  }
);


function yesChoice(){
  document.getElementById('yesFeedback').innerHTML='Good choice.<br><span class="muted">Not that you had one.</span>';
  document.getElementById('yesNext').classList.remove('hidden');
}

const openedGifts = new Set();


function openGift(button, giftNumber, title, description) {

  // 如果已经打开过，就不重复计算
  if (openedGifts.has(giftNumber)) {
    return;
  }
  // 记录已经打开的礼物
  openedGifts.add(giftNumber);
  // 改变卡片内容
  button.innerHTML = `
    <strong class="gift-title">
      ${title}
    </strong>

    <span class="tiny">
      ${description}
    </span>
  `;

  button.classList.add("revealed");


  // 更新计数
  document
    .getElementById("giftProgress")
    .innerText =
    openedGifts.size + " / 4 opened";

  // 如果全部打开
  if (openedGifts.size === 4) {

    document
      .getElementById("giftConclusion")
      .classList.remove("hidden");

    document
      .getElementById("giftNext")
      .classList.remove("hidden");
  }
}