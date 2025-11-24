import { Post, User, Comment } from "../types/definitions";
import { domElements } from "../core/dom";
import { escapeHtml } from "../utils/helpers";

// ==================== Функції для модального вікна ====================

/**
 * Відкриття модального вікна з деталями
 */
export function openModal(item: Post | User | Comment): void {
    const { modal, modalBody } = domElements;

    if (!modal || !modalBody) return;
    
    let content: string = "";
    
    // Визначаємо тип об'єкту та генеруємо HTML
    if ("title" in item) {
        const post: Post = item;
        content = `
            <h2>${escapeHtml(post.title)}</h2>
            <p><strong>ID:</strong> ${post.id}</p>
            <p><strong>Автор ID:</strong> ${post.userId}</p>
            <div style="margin-top: 1rem;">
                <p>${escapeHtml(post.body)}</p>
            </div>
        `;
    } else if ("website" in item) {
        const user: User = item;
        content = `
            <h2>${escapeHtml(user.name)}</h2>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(user.phone)}</p>
            <p><strong>Сайт:</strong> <a href="https://${escapeHtml(user.website)}" target="_blank">${escapeHtml(user.website)}</a></p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;
    } else if ("postId" in item) {
        const comment: Comment = item;
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
export function closeModal(): void {
    const { modal } = domElements;

    if (!modal) return;
    
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}