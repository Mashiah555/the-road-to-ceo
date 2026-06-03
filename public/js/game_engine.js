// --- Core Game Variables ---
let globalTimeInSeconds = 0;
let globalTimerInterval = null;
let currentScenarioCoins = 10000;
let scenarioTimerInterval = null;
let totalSalary = 0;

// Game Difficulty Settings
let baseInitialCoins = 10000;
let baseCoinDecay = 50;

// Logic Variables
const rankHierarchy = Object.keys(gameData);
let currentRankIndex = 0;
let playedScenarios = {};
let pendingAction = null;

// --- Game Logic ---

// Note: Making functions global by attaching to window so HTML inline handlers can access them
window.startGame = function () {
    globalTimeInSeconds = 0;
    totalSalary = 0;
    currentRankIndex = 0;
    playedScenarios = {};

    document.getElementById('total-salary').innerText = totalSalary;
    document.getElementById('current-rank').innerText = rankHierarchy[currentRankIndex];

    showScreen('scenario-screen');
    document.getElementById('feedback-box').style.display = 'none';
    document.getElementById('options-container').style.display = 'flex';

    // Initiate global timer
    if (globalTimerInterval) clearInterval(globalTimerInterval);
    globalTimerInterval = setInterval(() => {
        globalTimeInSeconds++;
        document.getElementById('global-timer').innerText = formatTime(globalTimeInSeconds);
    }, 1000);

    loadRandomScenario();
};

function loadRandomScenario() {
    const currentRankName = rankHierarchy[currentRankIndex];
    const rankScenarios = gameData[currentRankName];
    const allScenarioIds = Object.keys(rankScenarios);

    // Initialize tracking array for this rank if it doesn't exist
    if (!playedScenarios[currentRankName]) {
        playedScenarios[currentRankName] = [];
    }

    // Filter to find IDs that haven't been played yet in this match
    let availableIds = allScenarioIds.filter(id => !playedScenarios[currentRankName].includes(id));

    // Reset tracking for this rank if all questions have been exhausted
    if (availableIds.length === 0) {
        playedScenarios[currentRankName] = [];
        availableIds = allScenarioIds;
    }

    // Pick a random unplayed scenario
    const randomId = availableIds[Math.floor(Math.random() * availableIds.length)];

    // Mark as played
    playedScenarios[currentRankName].push(randomId);

    // Fetch the actual scenario data
    const scenario = rankScenarios[randomId];

    // Reset UI for new scenario
    document.getElementById('feedback-box').style.display = 'none';
    document.getElementById('options-container').style.display = 'flex';
    document.getElementById('scenario-text').innerText = scenario.text;

    // Reset scenario coins and start decay timer
    currentScenarioCoins = baseInitialCoins;
    document.getElementById('current-coins').innerText = currentScenarioCoins;

    if (scenarioTimerInterval) clearInterval(scenarioTimerInterval);
    scenarioTimerInterval = setInterval(() => {
        // Floor limit is relative to 10% of base coins
        let minFloor = Math.floor(baseInitialCoins * 0.1);

        if (currentScenarioCoins > minFloor) {
            currentScenarioCoins -= baseCoinDecay;
            if (currentScenarioCoins < minFloor) currentScenarioCoins = minFloor;
            document.getElementById('current-coins').innerText = currentScenarioCoins;
        }
    }, 1000);

    // Populate choice buttons
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    scenario.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option.text;
        btn.onclick = () => handleChoice(option);
        optionsContainer.appendChild(btn);
    });
}

function handleChoice(option) {
    // Stop scenario decay timer
    clearInterval(scenarioTimerInterval);

    // Hide options, show feedback
    document.getElementById('options-container').style.display = 'none';
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.style.display = 'block';

    // Calculate coins earned based on time left and choice quality
    const earnedCoins = Math.floor(currentScenarioCoins * option.coinMultiplier);
    totalSalary += earnedCoins;

    // Prevent salary from going below 0
    if (totalSalary < 0) totalSalary = 0;
    document.getElementById('total-salary').innerText = totalSalary;

    // Handle Rank progression
    currentRankIndex += option.rankChange;

    // Bound the rank index within array limits
    if (currentRankIndex < 0) currentRankIndex = 0;

    // Determine the next flow (Does the player continue or win the game?)
    // If the player goes BEYOND the final rank (or completed a scenario AT the final rank positively)
    if (currentRankIndex >= rankHierarchy.length) {
        currentRankIndex = rankHierarchy.length - 1; // Keep the UI showing the top rank
        pendingAction = "end";
    } else {
        pendingAction = "next";
    }

    document.getElementById('current-rank').innerText = rankHierarchy[currentRankIndex];

    // Build formatting for feedback box
    let feedbackHtml = `<strong>${option.feedback}</strong><br><br>`;
    if (earnedCoins >= 0) {
        feedbackHtml += `הרווחתם: ${earnedCoins} ₪. `;
        feedbackBox.className = '';
    } else {
        feedbackHtml += `הפסדתם: ${Math.abs(earnedCoins)} ₪. `;
        feedbackBox.className = 'error';
    }

    document.getElementById('feedback-text').innerHTML = feedbackHtml;

    if (pendingAction === "end") {
        document.getElementById('next-btn').innerText = "סיימתם! המשיכו לתוצאות";
    } else {
        document.getElementById('next-btn').innerText = "המשך לסיטואציה הבאה";
    }
}

window.proceedToNext = function () {
    if (pendingAction === "end") {
        endGame();
    } else {
        loadRandomScenario();
    }
};

function endGame() {
    clearInterval(globalTimerInterval);
    clearInterval(scenarioTimerInterval);

    showScreen('end-screen');

    const isCEO = currentRankIndex === rankHierarchy.length - 1;
    document.getElementById('end-title').innerText = isCEO ? "ברכות! הגעתם לכס המנכ\"ל!" : "המשחק הסתיים.";
    document.getElementById('end-message').innerText = isCEO
        ? "הפגנתם מיומנויות רכות מעולות, תקשורת אסרטיבית ולמידה מתמדת."
        : "כדי להתקדם בעולם העבודה החדש, חשוב לפתח אינטליגנציה רגשית ולהגיב באופן פרואקטיבי לאתגרים. נסו לשחק מחדש, והפעם תפעלו על פי מיומנויות התעסוקה במאה ה-21.";

    document.getElementById('final-time').innerText = formatTime(globalTimeInSeconds);
    document.getElementById('final-salary').innerText = totalSalary;
    document.getElementById('final-rank').innerText = rankHierarchy[currentRankIndex];

    // Save and retrieve high score (Total Salary) using LocalStorage
    let bestScore = localStorage.getItem('workplaceGameBestScore');

    if (!bestScore || totalSalary > parseInt(bestScore)) {
        localStorage.setItem('workplaceGameBestScore', totalSalary);
        bestScore = totalSalary;
    }

    document.getElementById('best-score').innerText = bestScore;
}

window.resetGame = function () {
    // Clear timers if user manually aborts during a scenario
    if (globalTimerInterval) clearInterval(globalTimerInterval);
    if (scenarioTimerInterval) clearInterval(scenarioTimerInterval);

    showScreen('start-screen');
};