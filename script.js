<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>음운 변동 퀴즈</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body>

  <!-- 배경 장식 -->
  <div class="bg-deco">
    <div class="circle c1"></div>
    <div class="circle c2"></div>
    <div class="circle c3"></div>
  </div>

  <!-- 정보 모달 -->
  <div id="info-modal" class="modal-overlay" aria-hidden="true">
    <div class="modal-box">
      <button class="modal-close" id="modal-close-btn" aria-label="닫기">✕</button>
      <h2 class="modal-title">음운 변동 기호 안내</h2>
      <div class="legend-grid">
        <div class="legend-item">
          <span class="tag-badge">끝</span>
          <div>
            <strong>끝소리 규칙</strong>
            <p>받침에서 발음될 수 있는 자음은 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ 7개뿐. 그 외 받침은 이 7개 중 하나로 바뀜.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">단</span>
          <div>
            <strong>자음군 단순화</strong>
            <p>겹받침(ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ 등)이 음절 말에서 하나의 자음으로 줄어드는 현상.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">된</span>
          <div>
            <strong>된소리되기 (경음화)</strong>
            <p>예사소리(ㄱ ㄷ ㅂ ㅅ ㅈ)가 특정 환경에서 된소리(ㄲ ㄸ ㅃ ㅆ ㅉ)로 바뀌는 현상.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">비</span>
          <div>
            <strong>비음화</strong>
            <p>파열음(ㄱ ㄷ ㅂ)이 비음(ㄴ ㅁ) 앞에서 같은 위치의 비음(ㅇ ㄴ ㅁ)으로 바뀌는 현상.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">유</span>
          <div>
            <strong>유음화</strong>
            <p>ㄴ이 ㄹ의 앞 또는 뒤에서 ㄹ로 바뀌는 현상 (ㄹ + ㄴ → ㄹ + ㄹ, ㄴ + ㄹ → ㄹ + ㄹ).</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">구</span>
          <div>
            <strong>구개음화</strong>
            <p>ㄷ, ㅌ이 'ㅣ' 모음 앞에서 ㅈ, ㅊ으로 바뀌는 현상.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">축</span>
          <div>
            <strong>축약 (거센소리되기)</strong>
            <p>ㅎ과 예사소리(ㄱ ㄷ ㅂ ㅈ)가 만나 거센소리(ㅋ ㅌ ㅍ ㅊ)로 합쳐지는 현상.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">ㄴ</span>
          <div>
            <strong>ㄴ 첨가</strong>
            <p>합성어·파생어에서 앞말이 자음으로 끝나고 뒷말이 모음 'ㅣ'나 반모음 'ㅣ'로 시작할 때 ㄴ이 첨가되는 현상.</p>
          </div>
        </div>
        <div class="legend-item">
          <span class="tag-badge">ㅎ탈</span>
          <div>
            <strong>ㅎ 탈락</strong>
            <p>ㅎ 받침이 모음으로 시작하는 어미 앞에서 발음되지 않고 탈락하는 현상.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 메인 -->
  <main class="container">
    <header class="site-header">
      <div class="header-top">
        <span class="site-label">한국어</span>
        <button class="info-btn" id="info-btn" aria-label="기호 설명">i</button>
      </div>
      <h1 class="site-title">음운 변동 퀴즈</h1>
      <p class="site-sub">단어의 음운 변동 과정을 순서대로 채워보세요</p>
    </header>

    <!-- 점수판 -->
    <div class="scoreboard">
      <div class="score-item">
        <span class="score-num" id="score-correct">0</span>
        <span class="score-label">정답</span>
      </div>
      <div class="score-divider"></div>
      <div class="score-item">
        <span class="score-num" id="score-total">0</span>
        <span class="score-label">시도</span>
      </div>
      <div class="score-divider"></div>
      <div class="score-item">
        <span class="score-num" id="score-streak">0</span>
        <span class="score-label">연속</span>
      </div>
    </div>

    <!-- 퀴즈 카드 -->
    <div class="quiz-card" id="quiz-card">
      <div class="start-screen" id="start-screen">
        <div class="start-icon">가</div>
        <p class="start-msg">음운 변동의 단계별 과정을<br>맞혀보세요!</p>
        <button class="btn-start" id="start-btn">문제 풀기</button>
      </div>

      <div class="quiz-content" id="quiz-content" style="display:none;">
        <div class="progress-bar-wrap">
          <div class="progress-bar" id="progress-bar"></div>
        </div>

        <div class="word-chain" id="word-chain">
          <!-- JS로 동적 생성 -->
        </div>

        <div class="btn-row">
          <button class="btn-grade" id="grade-btn">채점하기</button>
          <button class="btn-skip" id="skip-btn">건너뛰기</button>
        </div>

        <div class="result-msg" id="result-msg"></div>
      </div>
    </div>

    <footer class="site-footer">
      <span>음운 변동 학습 도구 · 국어 문법</span>
    </footer>
  </main>

  <script src="script.js"></script>
</body>
</html>
