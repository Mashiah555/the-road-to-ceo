# 🚀 The Road to CEO

<p align="center">
  <a href="https://the-road-to-ceo.web.app" target="_blank">
    <img src="https://img.shields.io/badge/🎮_PLAY_GAME_LIVE-2ea44f?style=for-the-badge" alt="Play Game">
  </a>
</p>

<p align="center">
  <em>Read this document in <a href="README.he.md">Hebrew / עברית</a>.</em>
</p>

---

## 📖 About the Project
**The Road to CEO** is a cooperative, web-based simulation game designed to prepare participants for the dynamic challenges of the modern workplace. Players work together to navigate complex professional dilemmas under time pressure. Every decision impacts their corporate rank and accumulated salary. 

The game acts as a "decision-making laboratory," replacing traditional fixed pathways with a randomized, rank-based scenario engine. It is specifically engineered to test and cultivate critical 21st-century soft skills.

## 🎯 Core Skills Addressed
- **Emotional Intelligence (EQ):** Navigating interpersonal conflicts and maintaining team morale.
- **Proactivity vs. Reactivity:** Taking ownership of mistakes and initiating change rather than responding passively.
- **Growth Mindset:** Treating critical feedback and failures as learning opportunities.
- **Assertive Communication:** Establishing professional boundaries without resorting to aggression.
- **Conflict Resolution (Win-Win):** Applying the Dual Concern Model to negotiations and workplace disputes.

## ⚙️ Features
- **Rank-Based Randomization:** Scenarios are dynamically pulled from a database based on the player's current corporate rank, ensuring high replayability.
- **Time-Decay Economy:** Players start each scenario with a base salary that rapidly decays. Quick, unified team decisions are rewarded.
- **Consequential Choices:** Options carry multipliers and rank-change values. Aggressive or passive choices penalize the player, while assertive and proactive choices promote them.
- **Difficulty Settings:** A dedicated UI panel allows users to adjust base coins and decay rates.
- **Integrated TED-Style Presentation:** A built-in presentation mode provides background context and educational value before the game begins.

## 💻 Tech Stack
- **Frontend:** Vanilla HTML, CSS, JavaScript.
- **Architecture:** Modular separation of concerns (`index.html`, `theme.css`, `game_styles.css`, `game_data.js`, `game_engine.js`).
- **Deployment:** Hosted seamlessly via **Firebase Hosting**.

## 📂 Project Structure
```text
├── index.html                    # Main game interface
├── presentation.html             # Integrated TED-style documentation presentation
├── 404.html                      # The 404 page
├── css/
|   ├── theme.css                 # General theme color variables
│   ├── game_styles.css           # Game elements styling and layout
|   ├── animations.css            # Game animations
|   ├── modal_styles.css          # Popup modals styling and layout
│   ├── presentation_styles.css   # Styling for the presentation module
|   └── 404_styles.css            # Styling for the 404 page
├── js/
│   ├── data/
|   |   ├── game_data.js          # Game scenarios database
|   |   ├── presentation_data.js  # Presentation slides database
|   |   └── instructions.js       # Instructions popup content
│   ├── scripts/
|   |   ├── game_engine.js        # Core game logic, timers, and state management
│   |   └── presentation.js       # Presentation logic and slide rendering
|   └── utilities/
|       ├── theme.js              # Theme state management
|       └── utils.js              # General helper functions
├── assets/
│   └── images/
│       ├── icon.png              # Website tab icon
|       └── logo.png              # Game logo
├── firebase.json                 # Firebase hosting configuration
├── README.md                     # English documentations
└── README.he.md                  # Hebrew documentations
