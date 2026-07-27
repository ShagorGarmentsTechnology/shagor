<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Joke Generator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            transition: 0.3s;
        }

        body.dark-mode {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.5s ease-out;
        }

        body.dark-mode .container {
            background: #2d2d44;
            color: #e0e0e0;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 32px;
            color: #667eea;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        body.dark-mode .header h1 {
            color: #8b9dff;
        }

        .theme-toggle {
            background: #667eea;
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            transition: 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            background: #764ba2;
        }

        .joke-container {
            background: #f5f7fa;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border: 2px solid #667eea;
            position: relative;
            overflow: hidden;
        }

        body.dark-mode .joke-container {
            background: #3d3d54;
            border-color: #8b9dff;
        }

        .joke-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shine 2s infinite;
        }

        @keyframes shine {
            0% {
                left: -100%;
            }
            50% {
                left: 100%;
            }
            100% {
                left: 100%;
            }
        }

        .joke-text {
            font-size: 18px;
            line-height: 1.6;
            color: #333;
            z-index: 1;
            position: relative;
        }

        body.dark-mode .joke-text {
            color: #e0e0e0;
        }

        .joke-loading {
            display: none;
            align-items: center;
            justify-content: center;
            gap: 10px;
            z-index: 1;
            position: relative;
        }

        .joke-loading.active {
            display: flex;
        }

        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        button {
            padding: 14px 25px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .btn-generate {
            background: #667eea;
            color: white;
            grid-column: 1 / -1;
        }

        .btn-generate:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-copy {
            background: #4ecdc4;
            color: white;
        }

        .btn-copy:hover {
            background: #3db8af;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(78, 205, 196, 0.3);
        }

        .btn-share {
            background: #f8b500;
            color: white;
        }

        .btn-share:hover {
            background: #e0a300;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(248, 181, 0, 0.3);
        }

        body.dark-mode button:hover {
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        }

        .category-section {
            margin-bottom: 25px;
        }

        .category-label {
            font-size: 14px;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 10px;
            display: block;
        }

        body.dark-mode .category-label {
            color: #8b9dff;
        }

        .category-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 8px;
        }

        .category-btn {
            padding: 10px 15px;
            background: #f0f0f0;
            border: 2px solid transparent;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            color: #333;
        }

        body.dark-mode .category-btn {
            background: #3d3d54;
            color: #e0e0e0;
        }

        .category-btn:hover {
            border-color: #667eea;
            background: #e8ebf8;
        }

        body.dark-mode .category-btn:hover {
            background: #4d4d64;
        }

        .category-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .joke-counter {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }

        body.dark-mode .joke-counter {
            color: #777;
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4ecdc4;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease-out;
            z-index: 1000;
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @media (max-width: 600px) {
            .container {
                padding: 25px;
            }

            .header h1 {
                font-size: 24px;
            }

            .joke-text {
                font-size: 16px;
            }

            .buttons {
                grid-template-columns: 1fr;
            }

            .btn-copy, .btn-share {
                grid-column: 1 / -1;
            }

            .category-buttons {
                grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>
            <i class="fas fa-laugh-beam"></i>
            Joke Generator
        </h1>
        <button class="theme-toggle" id="themeToggle" title="Toggle Dark Mode">
            <i class="fas fa-moon"></i>
        </button>
    </div>

    <div class="category-section">
        <label class="category-label">Select Category:</label>
        <div class="category-buttons">
            <button class="category-btn active" data-category="any">Any</button>
            <button class="category-btn" data-category="programming">Programming</button>
            <button class="category-btn" data-category="knock-knock">Knock Knock</button>
            <button class="category-btn" data-category="general">General</button>
        </div>
    </div>

    <div class="joke-container" id="jokeContainer">
        <div class="joke-text">Click the button to get a joke!</div>
        <div class="joke-loading" id="jokeLoading">
            <div class="spinner"></div>
            <span>Loading joke...</span>
        </div>
    </div>

    <div class="buttons">
        <button class="btn-generate" id="generateBtn">
            <i class="fas fa-redo"></i>
            Get Joke
        </button>
        <button class="btn-copy" id="copyBtn">
            <i class="fas fa-copy"></i>
            Copy
        </button>
        <button class="btn-share" id="shareBtn">
            <i class="fas fa-share-alt"></i>
            Share
        </button>
    </div>

    <div class="joke-counter">
        <p>Jokes generated: <span id="jokeCount">0</span></p>
    </div>
</div>

<script>
    // ==================== STATE ====================
    let currentJoke = "";
    let jokeCount = 0;
    let selectedCategory = "any";
    const API_URL = "https://v2.jokeapi.dev/joke";

    // ==================== DARK MODE ====================
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("jokeTheme") || "light";
    
    if(currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("jokeTheme", theme);
        themeToggle.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // ==================== CATEGORY SELECTION ====================
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", function(){
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            selectedCategory = this.getAttribute("data-category");
        });
    });

    // ==================== FETCH JOKE ====================
    async function getJoke() {
        const jokeContainer = document.getElementById("jokeContainer");
        const jokeText = jokeContainer.querySelector(".joke-text");
        const jokeLoading = document.getElementById("jokeLoading");
        const generateBtn = document.getElementById("generateBtn");

        jokeLoading.classList.add("active");
        generateBtn.disabled = true;

        try {
            const url = selectedCategory === "any" 
                ? `${API_URL}/Any` 
                : `${API_URL}/${selectedCategory}`;

            const response = await fetch(url);
            
            if(!response.ok) throw new Error("Failed to fetch joke");
            
            const data = await response.json();

            // Format joke
            if(data.type === "single") {
                currentJoke = data.joke;
            } else {
                currentJoke = `${data.setup}\n\n${data.delivery}`;
            }

            jokeText.textContent = currentJoke;
            jokeCount++;
            document.getElementById("jokeCount").textContent = jokeCount;

        } catch(error) {
            jokeText.textContent = "Oops! Couldn't fetch a joke. Please try again.";
            console.error("Error:", error);
        } finally {
            jokeLoading.classList.remove("active");
            generateBtn.disabled = false;
        }
    }

    // ==================== COPY JOKE ====================
    document.getElementById("copyBtn").addEventListener("click", function(){
        if(!currentJoke) {
            showNotification("No joke to copy!");
            return;
        }

        navigator.clipboard.writeText(currentJoke).then(() => {
            showNotification("Joke copied to clipboard! 😄");
        }).catch(err => {
            console.error("Error copying:", err);
        });
    });

    // ==================== SHARE JOKE ====================
    document.getElementById("shareBtn").addEventListener("click", function(){
        if(!currentJoke) {
            showNotification("No joke to share!");
            return;
        }

        const text = `Check out this joke: ${currentJoke}`;
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappURL, "_blank");
    });

    // ==================== GENERATE BUTTON ====================
    document.getElementById("generateBtn").addEventListener("click", getJoke);

    // ==================== NOTIFICATION ====================
    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // ==================== KEYBOARD SHORTCUT ====================
    document.addEventListener("keydown", function(e){
        if(e.code === "Space" && e.target === document.body) {
            e.preventDefault();
            document.getElementById("generateBtn").click();
        }
    });

    // Load first joke on page load
    window.addEventListener("load", getJoke);
</script>

</body>
</html>
