// ============================================================
//  데이터: 각 단어의 음운 변동 단계
//  { word: 초기단어, steps: [{result: 변동결과, rule: 규칙약어}, ...] }
// ============================================================
const QUIZ_DATA = [
  { "word": "겉늙다", "steps": [{ "result": "걷늑다", "rule": "끝+단" }, { "result": "걷늑따", "rule": "된소리되기" }, { "result": "건늑따", "rule": "비음화" }] },
  { "word": "값있다", "steps": [{ "result": "갑읻다", "rule": "단+끝" }, { "result": "가빋따", "rule": "된소리되기" }] },
  { "word": "값없다", "steps": [{ "result": "갑업다", "rule": "단+끝" }, { "result": "가법따", "rule": "된소리되기" }] },
  { "word": "넓적하다", "steps": [{ "result": "넙적하다", "rule": "자음군단순화" }, { "result": "넙쩌카다", "rule": "된+축" }] },
  { "word": "넓적하니", "steps": [{ "result": "넙적하니", "rule": "자음군단순화" }, { "result": "넙쩌카니", "rule": "된+축" }] },
  { "word": "굵다랗다", "steps": [{ "result": "국다라타", "rule": "단+축" }, { "result": "국따라타", "rule": "된소리되기" }] },
  { "word": "급행열차", "steps": [{ "result": "급행녈차", "rule": "ㄴ첨가" }, { "result": "그팽녈차", "rule": "거센소리되기" }] },
  { "word": "설익다", "steps": [{ "result": "설닉다", "rule": "ㄴ첨가" }, { "result": "설릭다", "rule": "유음화" }, { "result": "설릭따", "rule": "된소리되기" }] },
  { "word": "낱낱이", "steps": [{ "result": "낟나티", "rule": "끝소리변화" }, { "result": "난나티", "rule": "비음화" }, { "result": "난나치", "rule": "구개음화" }] },
  { "word": "놓습니다", "steps": [{ "result": "노씁니다", "rule": "거센소리되기" }, { "result": "노씀니다", "rule": "비음화" }] },
  { "word": "내복약", "steps": [{ "result": "내복냑", "rule": "ㄴ첨가" }, { "result": "내봉냑", "rule": "비음화" }] },
  { "word": "늑막염", "steps": [{ "result": "늑막념", "rule": "ㄴ첨가" }, { "result": "능망념", "rule": "비음화" }] },
  { "word": "긁히다", "steps": [{ "result": "글키다", "rule": "거센소리되기" }] },
  { "word": "읽혀지다", "steps": [{ "result": "일켜지다", "rule": "거센소리되기" }] },
  { "word": "밝혀지다", "steps": [{ "result": "발켜지다", "rule": "거센소리되기" }] },
  { "word": "짧디짧다", "steps": [{ "result": "짤디짤다", "rule": "자음군단순화" }, { "result": "짤띠짤따", "rule": "된소리되기" }] },
  { "word": "넓디넓다", "steps": [{ "result": "널디널다", "rule": "자음군단순화" }, { "result": "널띠널따", "rule": "된소리되기" }] },
  { "word": "흙투성이", "steps": [{ "result": "흑투성이", "rule": "자음군단순화" }] },
  { "word": "낱낱이도", "steps": [{ "result": "낟나티도", "rule": "끝소리변화" }, { "result": "난나티도", "rule": "비음화" }, { "result": "난나치도", "rule": "구개음화" }] },
  { "word": "끝낱이", "steps": [{ "result": "끋나티", "rule": "끝소리변화" }, { "result": "끈나티", "rule": "비음화" }, { "result": "끈나치", "rule": "구개음화" }] },
  { "word": "몫없다", "steps": [{ "result": "목업다", "rule": "단+끝" }, { "result": "모겁따", "rule": "된소리되기" }] },
  { "word": "닭도리탕", "steps": [{ "result": "닥도리탕", "rule": "자음군단순화" }, { "result": "닥또리탕", "rule": "된소리되기" }] },
  { "word": "볶음밥", "steps": [{ "result": "보끔밥", "rule": "끝소리변화" }] },
  { "word": "삶히다", "steps": [{ "result": "살미다", "rule": "ㅎ탈락" }] },
  { "word": "넋없다", "steps": [{ "result": "넉업다", "rule": "단+끝" }, { "result": "너겁따", "rule": "된소리되기" }] },
  { "word": "흙일", "steps": [{ "result": "흑일", "rule": "자음군단순화" }, { "result": "흑닐", "rule": "ㄴ첨가" }, { "result": "흥닐", "rule": "비음화" }] },
  { "word": "닭잡다", "steps": [{ "result": "닥잡다", "rule": "자음군단순화" }, { "result": "닥짭따", "rule": "된소리되기" }] },
  { "word": "맑디맑다", "steps": [{ "result": "막디막다", "rule": "자음군단순화" }, { "result": "막띠막따", "rule": "된소리되기" }] },
  { "word": "읽고쓰다", "steps": [{ "result": "일고쓰다", "rule": "자음군단순화" }, { "result": "일꼬쓰다", "rule": "된소리되기" }] },
  { "word": "넓죽하다", "steps": [{ "result": "넙죽하다", "rule": "자음군단순화" }, { "result": "넙쭈카다", "rule": "된+축" }] },
  { "word": "밝디밝다", "steps": [{ "result": "박디박다", "rule": "자음군단순화" }, { "result": "박띠박따", "rule": "된소리되기" }] },
  { "word": "굵직하다", "steps": [{ "result": "국직하다", "rule": "자음군단순화" }, { "result": "국찌카다", "rule": "된+축" }] },
  { "word": "긁적거리다", "steps": [{ "result": "극적거리다", "rule": "자음군단순화" }, { "result": "극쩍꺼리다", "rule": "된소리되기" }] },
  { "word": "얹히다", "steps": [{ "result": "언치다", "rule": "거센소리되기" }] },
  { "word": "앉히다", "steps": [{ "result": "안치다", "rule": "거센소리되기" }] },
  { "word": "훑어보다", "steps": [{ "result": "훌터보다", "rule": "-" }] },
  { "word": "핥아먹다", "steps": [{ "result": "할타먹따", "rule": "된소리되기" }] },
  { "word": "읊어대다", "steps": [{ "result": "을퍼대다", "rule": "-" }] },
  { "word": "끓여내다", "steps": [{ "result": "끄려내다", "rule": "ㅎ탈락" }] },
  { "word": "잃어버리다", "steps": [{ "result": "이러버리다", "rule": "ㅎ탈락" }] },
  { "word": "밟히다", "steps": [{ "result": "발피다", "rule": "거센소리되기" }] },
  { "word": "읽히다", "steps": [{ "result": "일키다", "rule": "거센소리되기" }] },
  { "word": "넓혀지다", "steps": [{ "result": "널펴지다", "rule": "거센소리되기" }] },
  { "word": "값나가다", "steps": [{ "result": "갑나가다", "rule": "자음군단순화" }, { "result": "감나가다", "rule": "비음화" }] },
  { "word": "닭볶음", "steps": [{ "result": "닥뽀끔", "rule": "단+된" }] },
  { "word": "삶아먹다", "steps": [{ "result": "살마먹따", "rule": "된소리되기" }] },
  { "word": "끝맺다", "steps": [{ "result": "끋맺다", "rule": "끝소리변화" }, { "result": "끈맺다", "rule": "비음화" }, { "result": "끈맫따", "rule": "끝+된" }] },
  { "word": "꽃잎", "steps": [{ "result": "꼳잎", "rule": "끝소리변화" }, { "result": "꼳닙", "rule": "ㄴ+끝" }, { "result": "꼰닙", "rule": "비음화" }] },
  { "word": "물약", "steps": [{ "result": "물냑", "rule": "ㄴ첨가" }, { "result": "물략", "rule": "유음화" }] },
  { "word": "막일", "steps": [{ "result": "막닐", "rule": "ㄴ첨가" }, { "result": "망닐", "rule": "비음화" }] },
  { "word": "색연필", "steps": [{ "result": "색년필", "rule": "ㄴ첨가" }, { "result": "생년필", "rule": "비음화" }] },
  { "word": "홑이불", "steps": [{ "result": "혿이불", "rule": "끝소리변화" }, { "result": "혿니불", "rule": "ㄴ첨가" }, { "result": "혼니불", "rule": "비음화" }] },
  { "word": "밭이랑", "steps": [{ "result": "받이랑", "rule": "끝소리변화" }, { "result": "받니랑", "rule": "ㄴ첨가" }, { "result": "반니랑", "rule": "비음화" }] },
  { "word": "여덟만", "steps": [{ "result": "여덜만", "rule": "자음군단순화" }] },
  { "word": "값어치", "steps": [{ "result": "가버치", "rule": "자음군단순화" }] },
  { "word": "맛있다", "steps": [{ "result": "맏읻다", "rule": "끝소리변화" }, { "result": "마딛따", "rule": "된소리되기" }] },
  { "word": "겉옷", "steps": [{ "result": "거돋", "rule": "끝소리변화" }] },
  { "word": "굳히다", "steps": [{ "result": "구티다", "rule": "거센소리되기" }, { "result": "구치다", "rule": "구개음화" }] },
  { "word": "닫히다", "steps": [{ "result": "다티다", "rule": "거센소리되기" }, { "result": "다치다", "rule": "구개음화" }] },
  { "word": "묻히다", "steps": [{ "result": "무티다", "rule": "거센소리되기" }, { "result": "무치다", "rule": "구개음화" }] },
  { "word": "맞히다", "steps": [{ "result": "마치다", "rule": "거센소리되기" }] },
  { "word": "꽂히다", "steps": [{ "result": "꼬치다", "rule": "거센소리되기" }] },
  { "word": "넓히다", "steps": [{ "result": "널피다", "rule": "거센소리되기" }] },
  { "word": "발야구", "steps": [{ "result": "발냐구", "rule": "ㄴ첨가" }, { "result": "발랴구", "rule": "유음화" }] },
  { "word": "백로", "steps": [{ "result": "백노", "rule": "비음화" }, { "result": "뱅노", "rule": "비음화" }] },
  { "word": "독립", "steps": [{ "result": "독닙", "rule": "비음화" }, { "result": "동닙", "rule": "비음화" }] },
  { "word": "법률", "steps": [{ "result": "법뉼", "rule": "비음화" }, { "result": "범뉼", "rule": "비음화" }] },
  { "word": "대관령", "steps": [{ "result": "대괄령", "rule": "유음화" }] },
  { "word": "광한루", "steps": [{ "result": "광할루", "rule": "유음화" }] },
  { "word": "신라", "steps": [{ "result": "실라", "rule": "유음화" }] },
  { "word": "협력", "steps": [{ "result": "협녁", "rule": "비음화" }, { "result": "혐녁", "rule": "비음화" }] },
  { "word": "막론", "steps": [{ "result": "막논", "rule": "비음화" }, { "result": "망논", "rule": "비음화" }] },
  { "word": "결단력", "steps": [{ "result": "결딴력", "rule": "된소리되기" }, { "result": "결딴녁", "rule": "비음화" }] },
  { "word": "입원료", "steps": [{ "result": "이붠뇨", "rule": "비음화" }] },
  { "word": "동원령", "steps": [{ "result": "동원녕", "rule": "비음화" }] },
  { "word": "맨입", "steps": [{ "result": "맨닙", "rule": "ㄴ첨가" }] },
  { "word": "담요", "steps": [{ "result": "담뇨", "rule": "ㄴ첨가" }] },
    { "word": "솜이불", "steps": [{ "result": "솜니불", "rule": "ㄴ 첨가" }] },
  { "word": "한여름", "steps": [{ "result": "한녀름", "rule": "ㄴ 첨가" }] },
  { "word": "삯일", "steps": [{ "result": "삭일", "rule": "자음군 단순화" }, { "result": "삭닐", "rule": "ㄴ 첨가" }, { "result": "상닐", "rule": "비음화" }] },
  { "word": "잎사귀", "steps": [{ "result": "입사귀", "rule": "음절의 끝소리 규칙" }, { "result": "입싸귀", "rule": "된소리되기" }] },
  { "word": "읊조리다", "steps": [{ "result": "읍조리다", "rule": "자음군 단순화" }, { "result": "읍쪼리다", "rule": "된소리되기" }] },
  { "word": "옷고름", "steps": [{ "result": "옫고름", "rule": "음절의 끝소리 규칙" }, { "result": "옫꼬름", "rule": "된소리되기" }] },
  { "word": "빗물", "steps": [{ "result": "빋물", "rule": "음절의 끝소리 규칙" }, { "result": "빈물", "rule": "비음화" }] },
  { "word": "젖먹이", "steps": [{ "result": "젇머기", "rule": "음절의 끝소리 규칙" }, { "result": "전머기", "rule": "비음화" }] },
  { "word": "꽃망울", "steps": [{ "result": "꼳망울", "rule": "음절의 끝소리 규칙" }, { "result": "꼰망울", "rule": "비음화" }] },
  { "word": "십육", "steps": [{ "result": "십뉵", "rule": "ㄴ 첨가" }, { "result": "심뉵", "rule": "비음화" }] },
  { "word": "깻잎", "steps": [{ "result": "깯잎", "rule": "음절의 끝소리 규칙" }, { "result": "깯닙", "rule": "ㄴ 첨가 및 음절의 끝소리 규칙" }, { "result": "깬닙", "rule": "비음화" }] },
  { "word": "나뭇잎", "steps": [{ "result": "나묻잎", "rule": "음절의 끝소리 규칙" }, { "result": "나묻닙", "rule": "ㄴ 첨가 및 음절의 끝소리 규칙" }, { "result": "나문닙", "rule": "비음화" }] },
  { "word": "헛웃음", "steps": [{ "result": "허두슴", "rule": "음절의 끝소리 규칙 및 연음" }] },
  { "word": "맛없다", "steps": [{ "result": "맏업다", "rule": "음절의 끝소리 규칙 및 자음군 단순화" }, { "result": "마덥따", "rule": "된소리되기 및 연음" }] },
  { "word": "멋있다", "steps": [{ "result": "멷읻다", "rule": "음절의 끝소리 규칙 및 자음군 단순화" }, { "result": "머딛따", "rule": "된소리되기 및 연음" }] },
  { "word": "덮개", "steps": [{ "result": "덥개", "rule": "음절의 끝소리 규칙" }, { "result": "덥깨", "rule": "된소리되기" }] },
  { "word": "핥다", "steps": [{ "result": "할다", "rule": "자음군 단순화" }, { "result": "할따", "rule": "된소리되기" }] },
  { "word": "닳지", "steps": [{ "result": "달치", "rule": "거센소리되기" }] },
  { "word": "많다", "steps": [{ "result": "만타", "rule": "거센소리되기" }] },
  { "word": "않음", "steps": [{ "result": "아늠", "rule": "ㅎ 탈락" }] },
  { "word": "벼훑이", "steps": [{ "result": "벼훌치", "rule": "구개음화" }] },
  { "word": "해돋이", "steps": [{ "result": "해도지", "rule": "구개음화" }] },
  { "word": "맑게", "steps": [{ "result": "말게", "rule": "자음군 단순화" }, { "result": "말께", "rule": "된소리되기" }] },
  { "word": "늙지", "steps": [{ "result": "늑지", "rule": "자음군 단순화" }, { "result": "늑찌", "rule": "된소리되기" }] },
  { "word": "밟소", "steps": [{ "result": "밥소", "rule": "자음군 단순화" }, { "result": "밥쏘", "rule": "된소리되기" }] },
  { "word": "서울역", "steps": [{ "result": "서울녁", "rule": "ㄴ 첨가" }, { "result": "서울력", "rule": "유음화" }] },
  { "word": "권력", "steps": [{ "result": "궐력", "rule": "유음화" }] },
  { "word": "앓는", "steps": [{ "result": "알는", "rule": "자음군 단순화" }, { "result": "알른", "rule": "유음화" }] },
  { "word": "대통령", "steps": [{ "result": "대통녕", "rule": "비음화" }] },
  { "word": "깎다", "steps": [{ "result": "깍다", "rule": "음절의 끝소리 규칙" }, { "result": "깍따", "rule": "된소리되기" }] },
  { "word": "흙일", "steps": [{ "result": "흑일", "rule": "자음군 단순화" }, { "result": "흑닐", "rule": "ㄴ 첨가" }, { "result": "흥닐", "rule": "비음화" }] },
  { "word": "설익다", "steps": [{ "result": "설닉다", "rule": "ㄴ 첨가" }, { "result": "설릭다", "rule": "유음화" }, { "result": "설릭따", "rule": "된소리되기" }] },
  { "word": "칡잎", "steps": [{ "result": "칙잎", "rule": "자음군 단순화" }, { "result": "칙입", "rule": "음절의 끝소리 규칙" }, { "result": "칙닙", "rule": "ㄴ 첨가" }, { "result": "칭닙", "rule": "비음화" }] },
  { "word": "값있는", "steps": [{ "result": "갑읻는", "rule": "자음군 단순화 및 음절의 끝소리 규칙" }, { "result": "갑인는", "rule": "비음화" }, { "result": "가빈는", "rule": "연음" }] },
  { "word": "겉넓이", "steps": [{ "result": "겯넓이", "rule": "음절의 끝소리 규칙" }, { "result": "겯널비", "rule": "자음군 단순화 및 연음" }, { "result": "견널비", "rule": "비음화" }] },
  { "word": "넓죽하다", "steps": [{ "result": "넙죽하다", "rule": "자음군 단순화" }, { "result": "넙쭈카다", "rule": "된소리되기 및 거센소리되기" }] },
  { "word": "꽃잎", "steps": [{ "result": "꼳입", "rule": "음절의 끝소리 규칙" }, { "result": "꼳닙", "rule": "ㄴ 첨가" }, { "result": "꼰닙", "rule": "비음화" }] },
  { "word": "막론", "steps": [{ "result": "막논", "rule": "비음화" }, { "result": "망논", "rule": "비음화" }] },
  { "word": "백로", "steps": [{ "result": "백노", "rule": "비음화" }, { "result": "뱅노", "rule": "비음화" }] },
  { "word": "불여우", "steps": [{ "result": "불녀우", "rule": "ㄴ 첨가" }, { "result": "불려우", "rule": "유음화" }] },
  { "word": "물약", "steps": [{ "result": "물냑", "rule": "ㄴ 첨가" }, { "result": "물략", "rule": "유음화" }] },
  { "word": "부엌문", "steps": [{ "result": "부억문", "rule": "음절의 끝소리 규칙" }, { "result": "부엉문", "rule": "비음화" }] },
  { "word": "읊는", "steps": [{ "result": "읍는", "rule": "자음군 단순화" }, { "result": "음는", "rule": "비음화" }] },
  { "word": "영업용", "steps": [{ "result": "영업뇽", "rule": "ㄴ 첨가" }, { "result": "영엄뇽", "rule": "비음화" }] },
  { "word": "색연필", "steps": [{ "result": "색년필", "rule": "ㄴ 첨가" }, { "result": "생년필", "rule": "비음화" }] },
  { "word": "핥이다", "steps": [{ "result": "할티다", "rule": "연음" }, { "result": "할치다", "rule": "구개음화" }] },
  { "word": "여덟 권", "steps": [{ "result": "여덜 권", "rule": "자음군 단순화" }, { "result": "여덜 꿘", "rule": "된소리되기" }] },
  { "word": "닭갈비", "steps": [{ "result": "닥갈비", "rule": "자음군 단순화" }, { "result": "닥깔비", "rule": "된소리되기" }] },
  { "word": "못잊어", "steps": [{ "result": "몯읻어", "rule": "음절의 끝소리 규칙" }, { "result": "모디저", "rule": "연음" }] },
  { "word": "꽃여름", "steps": [{ "result": "꼳여름", "rule": "음절의 끝소리 규칙" }, { "result": "꼳녀름", "rule": "ㄴ 첨가" }, { "result": "꼰녀름", "rule": "비음화" }] }

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
