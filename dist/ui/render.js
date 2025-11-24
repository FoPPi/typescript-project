"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayPosts = displayPosts;
exports.displayUsers = displayUsers;
exports.displayComments = displayComments;
const dom_1 = require("../core/dom");
const constants_1 = require("../config/constants");
const helpers_1 = require("../utils/helpers");
// Імпортуємо модуль modal всередину модуля render, як зазначено в завданні
const modal_1 = require("./modal");
// ==================== Функції для відображення даних ====================
/**
 * Відображення постів на сторінці з анімацією
 */
function displayPosts(posts) {
    const { postsList } = dom_1.domElements;
    if (!postsList)
        return;
    postsList.innerHTML = "";
    posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * constants_1.ANIMATION_DELAY}s`;
        const title = post.title;
        const body = post.body.substring(0, 100) + "...";
        card.innerHTML = `
            <h3>${(0, helpers_1.escapeHtml)(title)}</h3>
            <p>${(0, helpers_1.escapeHtml)(body)}</p>
            <small>Post ID: ${post.id}</small>
        `;
        // Використовуємо імпортовану функцію openModal
        card.addEventListener("click", () => (0, modal_1.openModal)(post));
        postsList.appendChild(card);
    });
}
/**
 * Відображення користувачів на сторінці з анімацією
 */
function displayUsers(users) {
    const { usersList } = dom_1.domElements;
    if (!usersList)
        return;
    usersList.innerHTML = "";
    users.forEach((user, index) => {
        const card = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * constants_1.ANIMATION_DELAY}s`;
        card.innerHTML = `
            <h3>${(0, helpers_1.escapeHtml)(user.name)}</h3>
            <p><strong>Email:</strong> ${(0, helpers_1.escapeHtml)(user.email)}</p>
            <p><strong>Телефон:</strong> ${(0, helpers_1.escapeHtml)(user.phone)}</p>
            <p><strong>Сайт:</strong> ${(0, helpers_1.escapeHtml)(user.website)}</p>
        `;
        // Використовуємо імпортовану функцію openModal
        card.addEventListener("click", () => (0, modal_1.openModal)(user));
        usersList.appendChild(card);
    });
}
/**
 * Відображення коментарів на сторінці з анімацією
 */
function displayComments(comments) {
    const { commentsList } = dom_1.domElements;
    if (!commentsList)
        return;
    commentsList.innerHTML = "";
    comments.forEach((comment, index) => {
        const item = document.createElement("div");
        item.className = "comment-item fade-in";
        item.style.animationDelay = `${index * constants_1.ANIMATION_DELAY}s`;
        item.innerHTML = `
            <h4>${(0, helpers_1.escapeHtml)(comment.name)}</h4>
            <div class="email">${(0, helpers_1.escapeHtml)(comment.email)}</div>
            <p>${(0, helpers_1.escapeHtml)(comment.body)}</p>
            <small>Post ID: ${comment.postId}</small>
        `;
        commentsList.appendChild(item);
    });
}
//# sourceMappingURL=render.js.map