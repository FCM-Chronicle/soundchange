// ============================================================
//  데이터: 각 단어의 음운 변동 단계
//  { word: 초기단어, steps: [{result: 변동결과, rule: 규칙약어}, ...] }
// ============================================================
const QUIZ_DATA = [
{ "word": "겉늙다", "steps": [{ "result": "걷늑다", "rule": "끝+단" }, { "result": "걷늑따", "rule": "된" }, { "result": "건늑따", "rule": "비" }] },
{ "word": "값있다", "steps": [{ "result": "갑읻다", "rule": "단+끝" }, { "result": "갑읻따", "rule": "된" }, { "result": "가빋따", "rule": "연" }] },
{ "word": "값없다", "steps": [{ "result": "갑업다", "rule": "단+끝" }, { "result": "갑업따", "rule": "된" }, { "result": "가법따", "rule": "연" }] },
{ "word": "넓적하다", "steps": [{ "result": "넙적하다", "rule": "단" }, { "result": "넙쩌카다", "rule": "된+축" }] },
{ "word": "넓적하니", "steps": [{ "result": "넙적하니", "rule": "단" }, { "result": "넙쩌카니", "rule": "된+축" }] },
{ "word": "굵다랗다", "steps": [{ "result": "국다라타", "rule": "단+축" }, { "result": "국따라타", "rule": "된" }] },
{ "word": "급행열차", "steps": [{ "result": "급행녈차", "rule": "ㄴ" }, { "result": "그팽녈차", "rule": "축" }] },
{ "word": "설익다", "steps": [{ "result": "설닉다", "rule": "ㄴ" }, { "result": "설릭다", "rule": "유" }, { "result": "설릭따", "rule": "된" }] },
{ "word": "낱낱이", "steps": [{ "result": "낟나티", "rule": "끝" }, { "result": "난나티", "rule": "비" }, { "result": "난나치", "rule": "구" }] },
{ "word": "놓습니다", "steps": [{ "result": "노씁니다", "rule": "축" }, { "result": "노씀니다", "rule": "비" }] },
{ "word": "내복약", "steps": [{ "result": "내복냑", "rule": "ㄴ" }, { "result": "내봉냑", "rule": "비" }] },
{ "word": "늑막염", "steps": [{ "result": "늑막념", "rule": "ㄴ" }, { "result": "능망념", "rule": "비" }] },
{ "word": "긁히다", "steps": [{ "result": "글키다", "rule": "축" }] },
{ "word": "읽혀지다", "steps": [{ "result": "일켜지다", "rule": "축" }] },
{ "word": "밝혀지다", "steps": [{ "result": "발켜지다", "rule": "축" }] },
{ "word": "짧디짧다", "steps": [{ "result": "짤디짤다", "rule": "단" }, { "result": "짤띠짤따", "rule": "된" }] },
{ "word": "넓디넓다", "steps": [{ "result": "널디널다", "rule": "단" }, { "result": "널띠널따", "rule": "된" }] },
{ "word": "흙투성이", "steps": [{ "result": "흑투성이", "rule": "단" }] },
{ "word": "낱낱이도", "steps": [{ "result": "낟나티도", "rule": "끝" }, { "result": "난나티도", "rule": "비" }, { "result": "난나치도", "rule": "구" }] },
{ "word": "끝낱이", "steps": [{ "result": "끋나티", "rule": "끝" }, { "result": "끈나티", "rule": "비" }, { "result": "끈나치", "rule": "구" }] },
{ "word": "몫없다", "steps": [{ "result": "목업다", "rule": "단+끝" }, { "result": "목업따", "rule": "된" }, { "result": "모겁따", "rule": "연" }] },
{ "word": "닭도리탕", "steps": [{ "result": "닥도리탕", "rule": "단" }, { "result": "닥또리탕", "rule": "된" }] },
{ "word": "볶음밥", "steps": [{ "result": "보끔밥", "rule": "연" }] },
{ "word": "삶히다", "steps": [{ "result": "살미다", "rule": "ㅎ탈+연" }] },
{ "word": "넋없다", "steps": [{ "result": "넉업다", "rule": "단+끝" }, { "result": "넉업따", "rule": "된" }, { "result": "너겁따", "rule": "연" }] },
{ "word": "흙일", "steps": [{ "result": "흑일", "rule": "단" }, { "result": "흑닐", "rule": "ㄴ" }, { "result": "흥닐", "rule": "비" }] },
{ "word": "닭잡다", "steps": [{ "result": "닥잡다", "rule": "단" }, { "result": "닥짭따", "rule": "된" }] },
{ "word": "맑디맑다", "steps": [{ "result": "막디막다", "rule": "단" }, { "result": "막띠막따", "rule": "된" }] },
{ "word": "읽고쓰다", "steps": [{ "result": "일고쓰다", "rule": "단" }, { "result": "일꼬쓰다", "rule": "된" }] },
{ "word": "넓죽하다", "steps": [{ "result": "넙죽하다", "rule": "단" }, { "result": "넙쭈카다", "rule": "된+축" }] },
{ "word": "밝디밝다", "steps": [{ "result": "박디박다", "rule": "단" }, { "result": "박띠박따", "rule": "된" }] },
{ "word": "굵직하다", "steps": [{ "result": "국직하다", "rule": "단" }, { "result": "국찌카다", "rule": "된+축" }] },
{ "word": "긁적거리다", "steps": [{ "result": "극적거리다", "rule": "단" }, { "result": "극쩍꺼리다", "rule": "된" }] },
{ "word": "얹히다", "steps": [{ "result": "언치다", "rule": "축" }] },
{ "word": "앉히다", "steps": [{ "result": "안치다", "rule": "축" }] },
{ "word": "훑어보다", "steps": [{ "result": "훌터보다", "rule": "연" }] },
{ "word": "핥아먹다", "steps": [{ "result": "할타먹다", "rule": "연" }, { "result": "할타먹따", "rule": "된" }] },
{ "word": "읊어대다", "steps": [{ "result": "을퍼대다", "rule": "연" }] },
{ "word": "끓여내다", "steps": [{ "result": "끄려내다", "rule": "ㅎ탈+연" }] },
{ "word": "잃어버리다", "steps": [{ "result": "이러버리다", "rule": "ㅎ탈+연" }] },
{ "word": "밟히다", "steps": [{ "result": "발피다", "rule": "축" }] },
{ "word": "곪히다", "steps": [{ "result": "골미다", "rule": "ㅎ탈+연" }] },
{ "word": "읽히다", "steps": [{ "result": "일키다", "rule": "축" }] },
{ "word": "넓혀지다", "steps": [{ "result": "널펴지다", "rule": "축" }] },
{ "word": "값나가다", "steps": [{ "result": "갑나가다", "rule": "단" }, { "result": "감나가다", "rule": "비" }] },
{ "word": "닭볶음", "steps": [{ "result": "닥볶음", "rule": "단" }, { "result": "닥뽀끔", "rule": "된+연" }] },
{ "word": "삶아먹다", "steps": [{ "result": "살마먹다", "rule": "연" }, { "result": "살마먹따", "rule": "된" }] },
{ "word": "끝맺다", "steps": [{ "result": "끋맺다", "rule": "끝" }, { "result": "끈맺다", "rule": "비" }, { "result": "끈맫따", "rule": "끝+된" }] }
];

document.addEventListener("DOMContentLoaded", () => {

// ============================================================
//  상태
// ============================================================
let currentQ = null;
let usedIndices = [];
let scoreCorrect = 0;
let scoreTotal = 0;
let streak = 0;

// ============================================================
//  DOM
// ============================================================
const startScreen  = document.getElementById("start-screen");
const quizContent  = document.getElementById("quiz-content");
const startBtn     = document.getElementById("start-btn");
const gradeBtn     = document.getElementById("grade-btn");
const skipBtn      = document.getElementById("skip-btn");
const wordChain    = document.getElementById("word-chain");
const resultMsg    = document.getElementById("result-msg");
const progressBar  = document.getElementById("progress-bar");
const infoBtn      = document.getElementById("info-btn");
const infoModal    = document.getElementById("info-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");

const elCorrect = document.getElementById("score-correct");
const elTotal   = document.getElementById("score-total");
const elStreak  = document.getElementById("score-streak");

// ============================================================
//  이벤트
// ============================================================
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizContent.style.display = "block";
  nextQuestion();
});

gradeBtn.addEventListener("click", gradeAnswers);
skipBtn.addEventListener("click", () => {
  if (skipBtn.dataset.answered === "true") {
    nextQuestion();
    skipBtn.dataset.answered = "false";
    skipBtn.textContent = "건너뛰기";
  } else {
    showAnswer();
    skipBtn.dataset.answered = "true";
    skipBtn.textContent = "다음 문제 →";
  }
});

infoBtn.addEventListener("click", () => {
  infoModal.setAttribute("aria-hidden", "false");
  infoModal.classList.add("active");
});
modalCloseBtn.addEventListener("click", closeModal);
infoModal.addEventListener("click", (e) => { if (e.target === infoModal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

function closeModal() {
  infoModal.setAttribute("aria-hidden", "true");
  infoModal.classList.remove("active");
}

// ============================================================
//  퀴즈 로직
// ============================================================
function getRandomQuestion() {
  if (usedIndices.length === QUIZ_DATA.length) usedIndices = [];
  let idx;
  do { idx = Math.floor(Math.random() * QUIZ_DATA.length); }
  while (usedIndices.includes(idx));
  usedIndices.push(idx);
  return QUIZ_DATA[idx];
}

function nextQuestion() {
  resultMsg.textContent = "";
  resultMsg.className = "result-msg";
  currentQ = getRandomQuestion();
  renderChain(currentQ);
  gradeBtn.disabled = false;
  gradeBtn.textContent = "채점하기";
  skipBtn.dataset.answered = "false";
  skipBtn.textContent = "건너뛰기";
  updateProgress();
}

function renderChain(q) {
  wordChain.innerHTML = "";

  // 초기 단어
  const startNode = document.createElement("div");
  startNode.className = "chain-node origin";
  startNode.innerHTML = `<span class="word-text">${q.word}</span><span class="word-label">원래 단어</span>`;
  wordChain.appendChild(startNode);

  // 각 단계
  q.steps.forEach((step, i) => {
    // 화살표
    const arrow = document.createElement("div");
    arrow.className = "chain-arrow";
    arrow.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    wordChain.appendChild(arrow);

    // 입력 노드
    const node = document.createElement("div");
    node.className = "chain-node input-node";

    const wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.className = "word-input";
    wordInput.setAttribute("data-step", i);
    wordInput.setAttribute("autocomplete", "off");
    wordInput.setAttribute("autocorrect", "off");
    wordInput.setAttribute("spellcheck", "false");
    wordInput.placeholder = "발음";
    wordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") gradeAnswers();
    });

    const ruleInput = document.createElement("span");
    ruleInput.className = "rule-badge";
    ruleInput.textContent = step.rule;

    const label = document.createElement("span");
    label.className = "word-label";
    label.textContent = `${i + 1}단계`;

    node.appendChild(wordInput);
    node.appendChild(ruleInput);
    node.appendChild(label);
    wordChain.appendChild(node);
  });
}

function gradeAnswers() {
  if (!currentQ) return;
  const wordInputs = wordChain.querySelectorAll(".word-input");

  let allCorrect = true;
  let anyAnswered = false;

  currentQ.steps.forEach((step, i) => {
    const wi = wordInputs[i];
    const wordVal = wi.value.trim();

    if (wordVal) anyAnswered = true;

    const wordOk = wordVal === step.result;

    wi.classList.remove("correct", "wrong", "empty");
    if (!wordVal) {
      wi.classList.add("empty");
      allCorrect = false;
    } else if (wordOk) {
      wi.classList.add("correct");
    } else {
      wi.classList.add("wrong");
      allCorrect = false;
    }
  });

  if (!anyAnswered) {
    showResult("빈칸을 채워주세요!", "warn");
    return;
  }

  scoreTotal++;
  elTotal.textContent = scoreTotal;

  if (allCorrect) {
    scoreCorrect++;
    streak++;
    elCorrect.textContent = scoreCorrect;
    elStreak.textContent = streak;
    showResult("🎉 완벽해요! 모두 정답입니다!", "success");
    gradeBtn.disabled = true;
    setTimeout(() => nextQuestion(), 1600);
  } else {
    streak = 0;
    elStreak.textContent = 0;
    showResult("틀린 칸이 있어요. 다시 확인해보세요.", "error");
  }
}

function showAnswer() {
  if (!currentQ) return;
  const wordInputs = wordChain.querySelectorAll(".word-input");
  currentQ.steps.forEach((step, i) => {
    wordInputs[i].value = step.result;
    wordInputs[i].classList.add("revealed");
  });
  showResult("정답을 확인하세요.", "info");
}

function showResult(msg, type) {
  resultMsg.textContent = msg;
  resultMsg.className = "result-msg " + type;
}

function updateProgress() {
  const pct = (usedIndices.length / QUIZ_DATA.length) * 100;
  progressBar.style.width = pct + "%";
}

}); // end DOMContentLoaded
