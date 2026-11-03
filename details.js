// ========================================
// 1. GET SELECTED ARTICLE
// ========================================

const articles = window.blogArticles || [];

const params = new URLSearchParams(window.location.search);

const articleId = Number(params.get("id"));

const article = articles.find(function(item) {
    return item.id === articleId;
});


// ========================================
// 2. ARTICLE CONTENT
// ========================================

const articleContent = {

    1: [
        "Artificial intelligence is becoming an important part of modern life. From smartphones to healthcare, AI is helping people complete tasks more efficiently.",
        "One of the biggest advantages of artificial intelligence is automation. It can analyze information, recognize patterns and assist people in solving complex problems.",
        "However, responsible use of AI is essential. Privacy, security and ethical considerations must remain important as technology continues to develop.",
        "The future of artificial intelligence will depend on how effectively humans use this technology to improve society."
    ],

    2: [
        "A healthy lifestyle does not always require major changes. Small habits followed consistently can make a meaningful difference.",
        "Starting your day with a positive routine, drinking enough water and maintaining a balanced schedule can improve everyday productivity.",
        "Taking breaks, getting sufficient sleep and spending time on activities you enjoy are equally important.",
        "Remember that building a better lifestyle is a gradual process. Focus on progress rather than perfection."
    ],

    3: [
        "Travelling allows us to discover beautiful places, experience different cultures and create unforgettable memories.",
        "Every destination offers something unique. Mountains, beaches, forests and historical locations provide different experiences.",
        "Planning your journey in advance can help you manage your budget and make your trip more enjoyable.",
        "Sometimes the best adventures begin when we step outside our comfort zones."
    ],

    4: [
        "Programming is one of the most valuable skills in today's digital world. It allows people to create websites, applications and software.",
        "Learning programming develops logical thinking and problem-solving abilities. Beginners can start with simple languages and gradually explore advanced concepts.",
        "HTML, CSS and JavaScript are excellent starting points for anyone interested in web development.",
        "Consistent practice and building small projects are among the best ways to improve coding skills."
    ],

    5: [
        "Technology has changed the way students learn and teachers deliver education.",
        "Online classrooms, educational applications and digital libraries make learning resources more accessible.",
        "Technology also allows students to learn at their own pace and explore subjects beyond traditional textbooks.",
        "Combining digital learning with traditional teaching can create a more effective educational experience."
    ],

    6: [
        "Exploring different cultures helps us understand the world from new perspectives.",
        "Travelling introduces us to different traditions, languages, food and lifestyles.",
        "Meeting people from different backgrounds can develop understanding, confidence and communication skills.",
        "Every journey provides an opportunity to learn something new."
    ],

    7: [
        "Time management is an important skill for students and professionals.",
        "Creating a daily schedule helps organize tasks and reduces unnecessary stress.",
        "Prioritizing important activities and avoiding distractions can improve productivity.",
        "Remember that effective time management is about working smartly, not simply working longer."
    ],

    8: [
        "A peaceful morning routine can help you begin your day with a positive mindset.",
        "Simple activities such as stretching, reading or enjoying a quiet breakfast can make mornings more enjoyable.",
        "Preparing your daily schedule in advance can also help you stay organized.",
        "A good morning routine does not need to be complicated. Choose habits that work naturally for you."
    ],

    9: [
        "Web development has evolved significantly over the years.",
        "Modern websites are no longer limited to simple text and images. They include interactive features, responsive layouts and dynamic content.",
        "HTML provides structure, CSS creates visual designs and JavaScript adds functionality.",
        "Learning these technologies provides a strong foundation for anyone interested in becoming a web developer."
    ],

    10: [
        "Learning new skills is an important part of personal and professional development.",
        "Every new skill provides an opportunity to discover your abilities and improve your confidence.",
        "You can begin with small learning goals and gradually move towards more challenging activities.",
        "Consistency, curiosity and patience are essential for continuous learning."
    ],

    11: [
        "Nature provides beauty, peace and inspiration. Spending time outdoors can help us appreciate the world around us.",
        "Forests, rivers, mountains and wildlife remind us of the importance of protecting our environment.",
        "Simple actions such as reducing waste and planting trees can contribute to environmental conservation.",
        "Taking time to explore nature can also provide a refreshing break from everyday routines."
    ],

    12: [
        "Confidence develops gradually through experience, practice and self-belief.",
        "Setting small achievable goals can help you recognize your progress and develop a positive attitude.",
        "Learning from mistakes instead of being discouraged by them is another important part of personal growth.",
        "Believe in your ability to improve. Every small step can bring you closer to your goals."
    ]

};


// ========================================
// 3. DISPLAY ARTICLE DETAILS
// ========================================

if (article) {

    document.title = article.title + " | Ink & Ideas";

    document.getElementById("detail-category").textContent =
        article.category;

    document.getElementById("detail-title").textContent =
        article.title;

    document.getElementById("detail-date").textContent =
        article.date;

    document.getElementById("detail-image").src =
        article.image;

    document.getElementById("detail-image").alt =
        article.title;

    const contentContainer =
        document.getElementById("detail-content");

    const paragraphs = articleContent[article.id] || [
        article.excerpt
    ];

    contentContainer.innerHTML = "";

    paragraphs.forEach(function(paragraph) {

        const p = document.createElement("p");

        p.textContent = paragraph;

        contentContainer.appendChild(p);

    });


    // Display Tags

    const tagsContainer =
        document.getElementById("detail-tags");

    article.tags.forEach(function(tag) {

        const span = document.createElement("span");

        span.textContent = "#" + tag;

        tagsContainer.appendChild(span);

    });

} else {

    document.getElementById("article-details").innerHTML =
        "<h2>Article Not Found!</h2><p>Please return to the homepage and select an article.</p>";

}


// ========================================
// 4. SOCIAL MEDIA SHARING
// ========================================

const currentURL = window.location.href;

const articleTitle = article
    ? article.title
    : "Ink & Ideas";

const whatsappBtn =
    document.getElementById("whatsapp-share");

const facebookBtn =
    document.getElementById("facebook-share");

const twitterBtn =
    document.getElementById("twitter-share");

const copyBtn =
    document.getElementById("copy-link");


if (whatsappBtn) {

    whatsappBtn.addEventListener("click", function() {

        const url =
            "https://api.whatsapp.com/send?text=" +
            encodeURIComponent(articleTitle + " " + currentURL);

        window.open(url, "_blank");

    });

}


if (facebookBtn) {

    facebookBtn.addEventListener("click", function() {

        const url =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(currentURL);

        window.open(url, "_blank");

    });

}


if (twitterBtn) {

    twitterBtn.addEventListener("click", function() {

        const url =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(articleTitle) +
            "&url=" + encodeURIComponent(currentURL);

        window.open(url, "_blank");

    });

}


if (copyBtn) {

    copyBtn.addEventListener("click", async function() {

        try {

            await navigator.clipboard.writeText(currentURL);

            copyBtn.textContent = "Copied!";

        } catch (error) {

            copyBtn.textContent = "Copy unavailable";

        }

    });

}


// ========================================
// 5. COMMENT SECTION
// ========================================

const commentForm =
    document.getElementById("comment-form");

const commentsList =
    document.getElementById("comments-list");

const commentName =
    document.getElementById("comment-name");

const commentText =
    document.getElementById("comment-text");


const storageKey = "blogComments_" + articleId;


function displayComments() {

    if (!commentsList) return;

    commentsList.innerHTML = "";

    const comments =
        JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (comments.length === 0) {

        commentsList.textContent =
            "No comments yet. Be the first to comment!";

        return;

    }

    comments.forEach(function(comment) {

        const commentBox =
            document.createElement("div");

        commentBox.className = "comment-box";

        const name = document.createElement("h4");

        name.textContent = comment.name;

        const message = document.createElement("p");

        message.textContent = comment.text;

        const date = document.createElement("small");

        date.textContent = comment.date;

        commentBox.appendChild(name);

        commentBox.appendChild(message);

        commentBox.appendChild(date);

        commentsList.appendChild(commentBox);

    });

}


if (commentForm) {

    commentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!article) return;

        const name = commentName.value.trim();

        const message = commentText.value.trim();

        if (!name || !message) {

            alert("Please enter your name and comment.");

            return;

        }

        const comments =
            JSON.parse(localStorage.getItem(storageKey) || "[]");

        comments.push({

            name: name,

            text: message,

            date: new Date().toLocaleDateString()

        });

        localStorage.setItem(
            storageKey,
            JSON.stringify(comments)
        );

        commentForm.reset();

        displayComments();

        alert("Your comment has been added!");

    });

}

displayComments();


// ========================================
// 6. RELATED ARTICLES
// ========================================

const relatedContainer =
    document.getElementById("related-articles");


if (article && relatedContainer) {

    const relatedArticles = articles
        .filter(function(item) {

            return item.category === article.category &&
                   item.id !== article.id;

        })
        .slice(0, 3);


    if (relatedArticles.length === 0) {

        relatedContainer.textContent =
            "No related articles available.";

    }


    relatedArticles.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "blog-card";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">

            <div class="blog-card-content">

                <span class="card-category">
                    ${item.category}
                </span>

                <h3>${item.title}</h3>

                <p>${item.excerpt}</p>

                <a href="blog-details.html?id=${item.id}"
                   class="read-link">
                    Read More →
                </a>

            </div>
        `;

        relatedContainer.appendChild(card);

    });

}