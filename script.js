// Load saved stats
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let currentXP = 0;

// Challenge pools
const challenges = {
  easy: [
    "Drink water slowly",
    "Stretch for 2 minutes",
    "Write one goal",
    "Clean one small area"
  ],
  medium: [
    "Draw a creative object",
    "Memorize 5 words",
    "Plan tomorrow in 5 steps",
    "Organize your backpack"
  ],
  hard: [
    "Invent a new product idea",
    "Solve 10 mental math problems",
    "Design your dream room",
    "Teach someone a new skill"
  ],
  extreme: [
    "Create a mini board game",
    "Write a 200-word story",
    "Plan a full productive day",
    "Rearrange your whole room layout"
  ]
};

// Get difficulty based on level
function getDifficulty() {
  if(level < 5) return "easy";
  if(level < 10) return "medium";
  if(level < 20) return "hard";
  return "extreme";
}

// Show new challenge
function newChallenge() {
  const difficulty = getDifficulty();
  const pool = challenges[difficulty];
  currentXP = difficulty === "easy" ? 5 :
              difficulty === "medium" ? 10 :
              difficulty === "hard" ? 20 : 35;

  const challenge = pool[Math.floor(Math.random()*pool.length)];
  document.getElementById("challengeBox").innerText = challenge;
  document.getElementById("difficulty").innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  // Show reflection section
  document.getElementById("reflectionSection").style.display = "block";
  document.getElementById("reflectionDifficulty").value = '';
  document.getElementById("reflectionText").value = '';
}

// Complete challenge
function completeChallenge() {
  xp += currentXP;
  level = Math.floor(xp / 50) + 1; // Unlimited leveling

  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);

  updateUI();
  alert("✅ Challenge completed! You gained " + currentXP + " XP");
}

// Save reflection
function saveReflection() {
  const difficulty = document.getElementById("reflectionDifficulty").value;
  const text = document.getElementById("reflectionText").value;
  if(!difficulty || !text) {
    alert("Please fill out both reflection fields");
    return;
  }

  // Load previous reflections
  let reflections = JSON.parse(localStorage.getItem("reflections") || "[]");
  reflections.push({
    level: level,
    xp: xp,
    challenge: document.getElementById("challengeBox").innerText,
    difficultyRating: difficulty,
    notes: text,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("reflections", JSON.stringify(reflections));

  alert("💾 Reflection saved!");
  document.getElementById("reflectionSection").style.display = "none";
}

// Update UI
function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("difficulty").innerText = getDifficulty().charAt(0).toUpperCase() + getDifficulty().slice(1);
}

// Initial UI
updateUI();
