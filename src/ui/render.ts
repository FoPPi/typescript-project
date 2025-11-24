import { Post, User, Comment } from "../types/definitions";
import { domElements } from "../core/dom";
import { ANIMATION_DELAY } from "../config/constants";
import { escapeHtml } from "../utils/helpers";
// Імпортуємо модуль modal всередину модуля render, як зазначено в завданні
import { openModal } from "./modal"; 

// ==================== Функції для відображення даних ====================

/**
 * Відображення постів на сторінці з анімацією
 */
export function displayPosts(posts: Post[]): void {
    const { postsList } = domElements;
    if (!postsList) return;
    
    postsList.innerHTML = "";
    
    posts.forEach((post: Post, index: number) => {
        const card: HTMLElement = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        
        const title: string = post.title;
        const body: string = post.body.substring(0, 100) + "...";
        
        card.innerHTML = `
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
            <small>Post ID: ${post.id}</small>
        `;
        
        // Використовуємо імпортовану функцію openModal
        card.addEventListener("click", () => openModal(post));
        
        postsList.appendChild(card);
    });
}

/**
 * Відображення користувачів на сторінці з анімацією
 */
export function displayUsers(users: User[]): void {
    const { usersList } = domElements;
    if (!usersList) return;
    
    usersList.innerHTML = "";
    
    users.forEach((user: User, index: number) => {
        const card: HTMLElement = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        
        card.innerHTML = `
            <h3>${escapeHtml(user.name)}</h3>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(user.phone)}</p>
            <p><strong>Сайт:</strong> ${escapeHtml(user.website)}</p>
        `;
        
        // Використовуємо імпортовану функцію openModal
        card.addEventListener("click", () => openModal(user));
        
        usersList.appendChild(card);
    });
}

/**
 * Відображення коментарів на сторінці з анімацією
 */
export function displayComments(comments: Comment[]): void {
    const { commentsList } = domElements;
    if (!commentsList) return;
    
    commentsList.innerHTML = "";
    
    comments.forEach((comment: Comment, index: number) => {
        const item: HTMLElement = document.createElement("div");
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