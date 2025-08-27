document.addEventListener('DOMContentLoaded', function() {
    // AdSense Configuration
    const AD_CLIENT = 'ca-pub-3606732388400135';
    const AD_SLOTS = {
        HEADER: '3819780687',
        PRE_QUIZ: '6222582746',
        RESULTS: '5558553558'
    };

    // Check if AdSense is properly configured
    const isAdSenseConfigured = AD_CLIENT && AD_SLOTS.HEADER && AD_SLOTS.PRE_QUIZ && AD_SLOTS.RESULTS;

    // Function to load ads
    function loadAd(containerId, slot) {
        if (!isAdSenseConfigured) return;

        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="${AD_CLIENT}"
                     data-ad-slot="${slot}"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            `;
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }

    // Load ads
    loadAd("ad-container-1", AD_SLOTS.HEADER);
    loadAd("ad-container-2", AD_SLOTS.PRE_QUIZ);
    loadAd("ad-container-3", AD_SLOTS.RESULTS);

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // DOM Elements
    const nameInput = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    const introContainer = document.getElementById('intro-container');
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const mernBar = document.getElementById('mern-bar');
    const pythonBar = document.getElementById('python-bar');
    const roadmapSteps = document.getElementById('roadmap-steps');
    const restartBtn = document.getElementById('restart-btn');

    // Quiz state
    let currentQuestion = 0;
    let answers = [];
    let userName = "";

    // Quiz questions
    const questions = [{
            question: "When building something new, do you prefer structured approaches or flexible creativity?",
            example: "MERN: Like building with LEGO - flexible and creative. Python: Like following a recipe - structured and reliable.",
            options: ["Structured (Python)", "Flexible (MERN)"]
        },
        {
            question: "Do you enjoy working with data analysis and scientific computing?",
            example: "Python: Great for data science with libraries like Pandas and NumPy. MERN: More focused on building applications.",
            options: ["Yes (Python)", "No (MERN)"]
        },
        {
            question: "Are you more interested in building fast, scalable web applications or content-heavy sites?",
            example: "MERN: Excellent for real-time applications like chat apps. Python: Great for content sites like blogs or news portals.",
            options: ["Fast web apps (MERN)", "Content sites (Python)"]
        },
        {
            question: "Do you prefer a language that's easy to learn for beginners with simple syntax?",
            example: "Python: Known for its readable and straightforward syntax. JavaScript (MERN): Has some quirks but is very powerful.",
            options: ["Yes (Python)", "No preference (MERN)"]
        },
        {
            question: "Are you interested in artificial intelligence and machine learning?",
            example: "Python: Dominates AI/ML with TensorFlow, PyTorch. MERN: Not typically used for AI/ML.",
            options: ["Yes (Python)", "No (MERN)"]
        },
        {
            question: "Do you prefer working on the front-end (user interface) or back-end (server logic)?",
            example: "MERN: Strong in both but especially good for front-end. Python: Primarily a back-end technology.",
            options: ["Front-end (MERN)", "Back-end (Python)"]
        },
        {
            question: "When solving problems, do you prefer a all-in-one framework or choosing best tools for each task?",
            example: "Python: Django provides an all-in-one solution. MERN: Mix and match tools for specific needs.",
            options: ["All-in-one (Python)", "Mix and match (MERN)"]
        },
        {
            question: "Are you interested in building cross-platform mobile apps?",
            example: "MERN: React Native lets you build mobile apps with JavaScript. Python: Not typically used for mobile apps.",
            options: ["Yes (MERN)", "No (Python)"]
        },
        {
            question: "Do you prefer a language with strong opinions on how things should be done?",
            example: "Python: Often described as having 'one right way' to do things. JavaScript: More flexible with multiple approaches.",
            options: ["Yes (Python)", "No (MERN)"]
        },
        {
            question: "Is working for startups and tech companies more appealing than enterprise or finance?",
            example: "MERN: Popular in startups and tech companies. Python: Used in enterprises, finance, and scientific computing.",
            options: ["Startups/Tech (MERN)", "Enterprise/Finance (Python)"]
        }
    ];

    // Roadmaps
    const mernRoadmap = [
        "Learn HTML, CSS, and JavaScript fundamentals",
        "Master React for front-end development",
        "Learn Node.js and Express for server-side programming",
        "Understand MongoDB and database design",
        "Build full-stack applications to practice",
        "Explore related technologies like React Native"
    ];

    const pythonRoadmap = [
        "Learn Python syntax and fundamentals",
        "Understand programming concepts with Python",
        "Learn a web framework like Django or Flask",
        "Study database integration with SQL or PostgreSQL",
        "Explore data analysis libraries (Pandas, NumPy)",
        "Consider learning AI/ML fundamentals"
    ];

    // Career paths
    const mernCareers = [
        "Front-end Developer",
        "Full-stack JavaScript Developer",
        "React Native Mobile Developer",
        "Node.js Backend Developer"
    ];

    const pythonCareers = [
        "Python Developer",
        "Back-end Engineer",
        "Data Scientist",
        "Machine Learning Engineer",
        "DevOps Engineer"
    ];

    // Enable start button when name is entered
    nameInput.addEventListener('input', function() {
        startBtn.disabled = !nameInput.value.trim();
        userName = nameInput.value.trim();
    });

    // Start quiz
    startBtn.addEventListener('click', function() {
        introContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        showQuestion();
    });

    // Show current question
    function showQuestion() {
        progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <div class="question-text">${currentQuestion + 1}. ${question.question}</div>
                <div class="example">${question.example}</div>
                <div class="options">
                    <button class="option" data-value="0">${question.options[0]}</button>
                    <button class="option" data-value="1">${question.options[1]}</button>
                </div>
            </div>
        `;

        // Mark selected option if already answered
        if (answers[currentQuestion] !== undefined) {
            const options = questionContainer.querySelectorAll('.option');
            options[answers[currentQuestion]].classList.add('selected');
        }

        // Add event listeners to options
        questionContainer.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                questionContainer.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Add selected class to clicked option
                this.classList.add('selected');

                // Store answer
                answers[currentQuestion] = parseInt(this.dataset.value);

                // Enable next button
                nextBtn.disabled = false;
            });
        });

        // Update navigation buttons
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = answers[currentQuestion] === undefined;

        if (currentQuestion === questions.length - 1) {
            nextBtn.innerHTML = 'See Results <i class="fas fa-chart-bar"></i>';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    // Next button click
    nextBtn.addEventListener('click', function() {
        if (answers[currentQuestion] === undefined) {
            alert('Please select an answer before continuing.');
            return;
        }

        if (currentQuestion === questions.length - 1) {
            // Show results
            showResults();
            return;
        }

        currentQuestion++;
        showQuestion();
    });

    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentQuestion--;
        showQuestion();
    });

    // Show results
    function showResults() {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';

        // Calculate scores
        let mernScore = answers.reduce((acc, val) => acc + (val === 1 ? 1 : 0), 0);
        let pythonScore = answers.length - mernScore;

        // Determine result
        let result, description;

        if (mernScore > pythonScore) {
            result = `Congratulations ${userName}, you're a MERN Stack Developer!`;
            description = "Your personality aligns with the flexible, innovative world of JavaScript full-stack development. You enjoy creativity, building modern web applications, and having the freedom to choose the right tools for each job. The MERN stack (MongoDB, Express.js, React, Node.js) is perfect for you!";

            // Update graphic
            mernBar.style.height = '200px';
            pythonBar.style.height = '100px';

            // Show roadmap
            mernRoadmap.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> ${step}`;
                roadmapSteps.appendChild(li);
            });

            // Add careers
            const careers = document.createElement('li');
            careers.innerHTML = `<i class="fas fa-briefcase"></i> <strong>Potential Careers:</strong> ${mernCareers.join(', ')}`;
            roadmapSteps.appendChild(careers);

        } else if (pythonScore > mernScore) {
            result = `Congratulations ${userName}, you're a Python Full-Stack Developer!`;
            description = "Your personality matches the structured, versatile world of Python development. You appreciate clean code, reliability, and powerful capabilities for back-end development, data analysis, and beyond. Python with frameworks like Django or Flask is your ideal stack!";

            // Update graphic
            mernBar.style.height = '100px';
            pythonBar.style.height = '200px';

            // Show roadmap
            pythonRoadmap.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> ${step}`;
                roadmapSteps.appendChild(li);
            });

            // Add careers
            const careers = document.createElement('li');
            careers.innerHTML = `<i class="fas fa-briefcase"></i> <strong>Potential Careers:</strong> ${pythonCareers.join(', ')}`;
            roadmapSteps.appendChild(careers);

        } else {
            result = `Wow ${userName}, you're a Balanced Developer!`;
            description = "You have qualities that fit both MERN and Python stacks! You might enjoy working with both technologies or specializing in one while keeping skills in the other. Consider learning both to become a versatile full-stack developer.";

            // Update graphic
            mernBar.style.height = '150px';
            pythonBar.style.height = '150px';

            // Show combined roadmap
            const combinedRoadmap = [
                "Learn JavaScript and Python fundamentals",
                "Choose a focus area: React (front-end) or Django (back-end)",
                "Master your chosen focus area",
                "Learn the complementary technology",
                "Build projects using both stacks",
                "Consider specializing based on your interests"
            ];

            combinedRoadmap.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> ${step}`;
                roadmapSteps.appendChild(li);
            });

            // Add careers
            const careers = document.createElement('li');
            careers.innerHTML = `<i class="fas fa-briefcase"></i> <strong>Potential Careers:</strong> Full-Stack Developer, Technical Lead, Solution Architect`;
            roadmapSteps.appendChild(careers);
        }

        resultTitle.textContent = result;
        resultDescription.textContent = description;
    }

    // Restart quiz
    restartBtn.addEventListener('click', function() {
        currentQuestion = 0;
        answers = [];
        resultContainer.style.display = 'none';
        introContainer.style.display = 'block';
        roadmapSteps.innerHTML = '';
        nameInput.value = '';
        userName = '';
        startBtn.disabled = true;
    });
});