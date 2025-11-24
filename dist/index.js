"use strict";
// ==================== Типи даних ====================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ==================== Константи ====================
const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const SCROLL_THRESHOLD = 200;
const ANIMATION_DELAY = 0.1;
// ==================== DOM елементи ====================
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close");
const postsList = document.getElementById("postsList");
const usersList = document.getElementById("usersList");
const commentsList = document.getElementById("commentsList");
const loadPostsBtn = document.getElementById("loadPostsBtn");
const loadUsersBtn = document.getElementById("loadUsersBtn");
const loadCommentsBtn = document.getElementById("loadCommentsBtn");
const toggleThemeBtn = document.getElementById("toggleTheme");
// ==================== Функції для Fetch ====================
/**
 * Отримання постів з JSON Placeholder
 * Типізована функція, що повертає масив постів
 */
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_BASE_URL}/posts?_limit=6`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = yield response.json();
            console.log("Пости завантажені:", posts);
            return posts;
        }
        catch (error) {
            console.error("Помилка при завантаженні постів:", error);
            showError("Не вдалося завантажити пости");
            return [];
        }
    });
}
/**
 * Отримання користувачів з JSON Placeholder
 * Типізована функція, що повертає масив користувачів
 */
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_BASE_URL}/users?_limit=6`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = yield response.json();
            console.log("Користувачі завантажені:", users);
            return users;
        }
        catch (error) {
            console.error("Помилка при завантаженні користувачів:", error);
            showError("Не вдалося завантажити користувачів");
            return [];
        }
    });
}
/**
 * Отримання коментарів з JSON Placeholder
 * Типізована функція, що повертає масив коментарів
 */
function fetchComments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_BASE_URL}/comments?_limit=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const comments = yield response.json();
            console.log("Коментарі завантажені:", comments);
            return comments;
        }
        catch (error) {
            console.error("Помилка при завантаженні коментарів:", error);
            showError("Не вдалося завантажити коментарі");
            return [];
        }
    });
}
// ==================== Функції для відображення даних ====================
/**
 * Відображення постів на сторінці з анімацією
 * Типізований параметр posts: Post[]
 */
function displayPosts(posts) {
    if (!postsList)
        return;
    postsList.innerHTML = "";
    posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        const title = post.title;
        const body = post.body.substring(0, 100) + "...";
        card.innerHTML = `
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
            <small>Post ID: ${post.id}</small>
        `;
        // Event listener для відкриття модального вікна
        card.addEventListener("click", () => openModal(post));
        postsList.appendChild(card);
    });
}
/**
 * Відображення користувачів на сторінці з анімацією
 * Типізований параметр users: User[]
 */
function displayUsers(users) {
    if (!usersList)
        return;
    usersList.innerHTML = "";
    users.forEach((user, index) => {
        const card = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        card.innerHTML = `
            <h3>${escapeHtml(user.name)}</h3>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(user.phone)}</p>
            <p><strong>Сайт:</strong> ${escapeHtml(user.website)}</p>
        `;
        // Event listener для відкриття модального вікна
        card.addEventListener("click", () => openModal(user));
        usersList.appendChild(card);
    });
}
/**
 * Відображення коментарів на сторінці з анімацією
 * Типізований параметр comments: Comment[]
 */
function displayComments(comments) {
    if (!commentsList)
        return;
    commentsList.innerHTML = "";
    comments.forEach((comment, index) => {
        const item = document.createElement("div");
        item.className = "comment-item fade-in";
        item.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        item.innerHTML = `
            <h4>${escapeHtml(comment.name)}</h4>
            <div class="email">${escapeHtml(comment.email)}</div>
            <p>${escapeHtml(comment.body)}</p>
            <small>Post ID: ${comment.postId}</small>
        `;
        commentsList.appendChild(item);
    });
}
// ==================== Функції для модального вікна ====================
/**
 * Відкриття модального вікна з деталями
 * Типізований параметр item: Post | User | Comment
 */
function openModal(item) {
    if (!modal || !modalBody)
        return;
    let content = "";
    // Визначаємо тип об'єкту та генеруємо HTML
    if ("title" in item) {
        const post = item;
        content = `
            <h2>${escapeHtml(post.title)}</h2>
            <p><strong>ID:</strong> ${post.id}</p>
            <p><strong>Автор ID:</strong> ${post.userId}</p>
            <div style="margin-top: 1rem;">
                <p>${escapeHtml(post.body)}</p>
            </div>
        `;
    }
    else if ("website" in item) {
        const user = item;
        content = `
            <h2>${escapeHtml(user.name)}</h2>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(user.phone)}</p>
            <p><strong>Сайт:</strong> <a href="https://${escapeHtml(user.website)}" target="_blank">${escapeHtml(user.website)}</a></p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;
    }
    else if ("postId" in item) {
        const comment = item;
        content = `
            <h2>${escapeHtml(comment.name)}</h2>
            <p><strong>Email:</strong> ${escapeHtml(comment.email)}</p>
            <p><strong>Post ID:</strong> ${comment.postId}</p>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #ccc;">
                <p>${escapeHtml(comment.body)}</p>
            </div>
        `;
    }
    modalBody.innerHTML = content;
    modal.classList.add("show");
    // Запобігання скролу під час відкритого модального вікна
    document.body.style.overflow = "hidden";
}
/**
 * Закриття модального вікна
 */
function closeModal() {
    if (!modal)
        return;
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}
/**
 * Відображення повідомлення про помилку
 * Типізований параметр message: string
 */
function showError(message) {
    alert(`Помилка: ${message}`);
}
// ==================== Функції для безпеки ====================
/**
 * Екранування HTML спеціальних символів
 * Типізований параметр text: string, типізований повертаємий результат: string
 */
function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
// ==================== Функції для теми ====================
/**
 * Перемикання темної теми
 */
function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    if (toggleThemeBtn) {
        toggleThemeBtn.textContent = isDarkTheme ? "☀️ Світла тема" : "🌙 Темна тема";
    }
    // Збереження вибору у localStorage
    localStorage.setItem("darkTheme", isDarkTheme ? "true" : "false");
    console.log("Тема змінена:", isDarkTheme ? "темна" : "світла");
}
/**
 * Завантаження збереженої теми
 */
function loadTheme() {
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    if (isDarkTheme) {
        document.body.classList.add("dark-theme");
        if (toggleThemeBtn) {
            toggleThemeBtn.textContent = "☀️ Світла тема";
        }
    }
}
// ==================== Функції для прокручування ====================
/**
 * Обробка прокручування сторінки
 * Додає анімацію при скролі вниз
 */
function handleScroll() {
    const scrollTop = window.scrollY;
    if (scrollTop > SCROLL_THRESHOLD) {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.boxShadow = "0 5px 20px rgba(52, 152, 219, 0.5)";
        }
    }
    else {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        }
    }
    console.log("Прокручено на:", scrollTop, "px");
}
// ==================== Обробники подій ====================
/**
 * Додавання event listeners при завантаженні сторінки
 */
function initializeEventListeners() {
    // Event listener для кнопок завантаження даних
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            loadPostsBtn.textContent = "Завантаження...";
            const posts = yield fetchPosts();
            displayPosts(posts);
            loadPostsBtn.textContent = "Завантажити пости";
        }));
    }
    if (loadUsersBtn) {
        loadUsersBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            loadUsersBtn.textContent = "Завантаження...";
            const users = yield fetchUsers();
            displayUsers(users);
            loadUsersBtn.textContent = "Завантажити користувачів";
        }));
    }
    if (loadCommentsBtn) {
        loadCommentsBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            loadCommentsBtn.textContent = "Завантаження...";
            const comments = yield fetchComments();
            displayComments(comments);
            loadCommentsBtn.textContent = "Завантажити коментарі";
        }));
    }
    // Event listener для закриття модального вікна
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
    // Event listener для закриття модального вікна при кліку поза ним
    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    // Event listener для перемикання теми
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener("click", toggleTheme);
    }
    // Event listener для прокручування сторінки
    window.addEventListener("scroll", handleScroll);
    // Event listener для Escape клавіші для закриття модального вікна
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}
// ==================== Ініціалізація ====================
/**
 * Запуск всієї програми при завантаженні DOM
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Сторінка завантажена, ініціалізація...");
    loadTheme();
    initializeEventListeners();
    console.log("Ініціалізація завершена!");
});
//# sourceMappingURL=index.js.map