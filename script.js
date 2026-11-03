// ========================================
// 1. BLOG ARTICLES DATA
// ========================================

const articles = [
    {
        id: 1,
        title: "The Future of Artificial Intelligence",
        category: "Technology",
        date: "November 2, 2026",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
        excerpt: "Explore how artificial intelligence is transforming our everyday lives and changing the future of technology.",
        tags: ["AI", "Technology", "Future"]
    },
    {
        id: 2,
        title: "Simple Habits for a Better Lifestyle",
        category: "Lifestyle",
        date: "October 28, 2026",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600",
        excerpt: "Small daily habits can create significant changes. Discover simple ways to improve your lifestyle.",
        tags: ["Lifestyle", "Health", "Habits"]
    },
    {
        id: 3,
        title: "Beautiful Places You Must Visit",
        category: "Travel",
        date: "October 25, 2026",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
        excerpt: "Discover beautiful destinations and get inspired to plan your next memorable adventure.",
        tags: ["Travel", "Nature", "Adventure"]
    },
    {
        id: 4,
        title: "Why Learning Programming Matters",
        category: "Education",
        date: "October 20, 2026",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
        excerpt: "Programming is an essential skill in the modern world. Learn why beginners should start coding.",
        tags: ["Education", "Coding", "Programming"]
    },
    {
        id: 5,
        title: "How Technology Changes Education",
        category: "Technology",
        date: "October 15, 2026",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600",
        excerpt: "Digital learning tools are transforming classrooms and making education more accessible.",
        tags: ["Technology", "Education", "Digital"]
    },
    {
        id: 6,
        title: "The Joy of Exploring New Cultures",
        category: "Travel",
        date: "October 10, 2026",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
        excerpt: "Travelling helps us understand different cultures, meet new people and create memories.",
        tags: ["Travel", "Culture", "Adventure"]
    },
    {
        id: 7,
        title: "The Importance of Time Management",
        category: "Education",
        date: "October 5, 2026",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600",
        excerpt: "Learn practical techniques to manage your time, stay organized and achieve your goals.",
        tags: ["Education", "Productivity"]
    },
    {
        id: 8,
        title: "Creating a Peaceful Morning Routine",
        category: "Lifestyle",
        date: "September 29, 2026",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
        excerpt: "Start your day positively with a peaceful morning routine and simple daily practices.",
        tags: ["Lifestyle", "Morning", "Wellness"]
    },
    {
        id: 9,
        title: "The Evolution of Web Development",
        category: "Technology",
        date: "September 22, 2026",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
        excerpt: "Discover how web development has evolved and what modern developers should learn.",
        tags: ["Technology", "Web Development", "Coding"]
    },
    {
        id: 10,
        title: "Learning New Skills Every Day",
        category: "Education",
        date: "September 18, 2026",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600",
        excerpt: "Continuous learning helps you develop confidence and prepare for new opportunities.",
        tags: ["Education", "Learning", "Skills"]
    },
    {
        id: 11,
        title: "Discover the Beauty of Nature",
        category: "Travel",
        date: "September 12, 2026",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
        excerpt: "Take a moment to appreciate nature and explore the beauty of the world around us.",
        tags: ["Travel", "Nature"]
    },
    {
        id: 12,
        title: "Building Confidence Through Small Steps",
        category: "Lifestyle",
        date: "September 5, 2026",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600",
        excerpt: "Discover simple ways to build confidence, develop positive habits and believe in yourself.",
        tags: ["Lifestyle", "Confidence", "Personal Growth"]
    }
];
window.blogArticles = articles;


// ========================================
// 2. SELECT HTML ELEMENTS
// ========================================

const blogGrid = document.getElementById("blog-grid");
const loadMoreBtn = document.getElementById("load-more");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const categoryButtons = document.querySelectorAll(".category-btn");

const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");


// ========================================
// 3. VARIABLES
// ========================================

let visibleArticles = 6;
let selectedCategory = "All";
let searchTerm = "";


// ========================================
// 4. DISPLAY BLOG ARTICLES
// ========================================

function displayArticles() {

    if (!blogGrid) return;

    const filteredArticles = articles.filter(function(article) {

        const matchesCategory =
            selectedCategory === "All" ||
            article.category === selectedCategory;

        const searchableText = (
            article.title + " " +
            article.excerpt + " " +
            article.category + " " +
            article.tags.join(" ")
        ).toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;

    });


    const articlesToDisplay =
        filteredArticles.slice(0, visibleArticles);

    blogGrid.innerHTML = "";


    if (articlesToDisplay.length === 0) {

        blogGrid.innerHTML =
            '<p class="no-results">No articles found. Try another search!</p>';

    } else {

        articlesToDisplay.forEach(function(article) {

            const card = document.createElement("article");

            card.className = "blog-card";

            card.innerHTML = `
                <img src="${article.image}" alt="${article.title}">

                <div class="blog-card-content">

                    <span class="card-category">
                        ${article.category}
                    </span>

                    <h3>${article.title}</h3>

                    <p>${article.excerpt}</p>

                    <div class="article-meta">
                        <span>${article.date}</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>

                    <a href="pages/blog-details.html?id=${article.id}"
                       class="read-link">
                        Read More →
                    </a>

                    <p class="article-tags">
                        ${article.tags.map(function(tag) {
                            return "#" + tag;
                        }).join(" ")}
                    </p>

                </div>
            `;

            blogGrid.appendChild(card);

        });

    }


    // Show or hide Load More button

    if (loadMoreBtn) {

        if (filteredArticles.length > visibleArticles) {
            loadMoreBtn.style.display = "inline-block";
        } else {
            loadMoreBtn.style.display = "none";
        }

    }

}


// ========================================
// 5. INITIAL DISPLAY
// ========================================

displayArticles();


// ========================================
// 6. SEARCH FUNCTIONALITY
// ========================================

function performSearch() {

    if (!searchInput) return;

    searchTerm = searchInput.value.trim().toLowerCase();

    visibleArticles = 6;

    displayArticles();

}


if (searchBtn) {

    searchBtn.addEventListener("click", performSearch);

}


if (searchInput) {

    searchInput.addEventListener("input", performSearch);

    searchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            performSearch();
        }

    });

}


// ========================================
// 7. CATEGORY FILTERING
// ========================================

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        visibleArticles = 6;

        displayArticles();

    });

});


// ========================================
// 8. LOAD MORE FUNCTIONALITY
// ========================================

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", function() {

        visibleArticles += 3;

        displayArticles();

    });

}


// ========================================
// 9. DARK MODE
// ========================================

if (themeToggle) {

    const savedTheme = localStorage.getItem("blogTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.textContent = "☀️";

    }


    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            themeToggle.textContent = "☀️";

            localStorage.setItem("blogTheme", "dark");

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem("blogTheme", "light");

        }

    });

}


// ========================================
// 10. MOBILE NAVIGATION
// ========================================

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function() {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function(link) {

        link.addEventListener("click", function() {

            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";

        });

    });

}