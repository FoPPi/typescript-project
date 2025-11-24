"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = openModal;
exports.closeModal = closeModal;
const dom_1 = require("../core/dom");
const helpers_1 = require("../utils/helpers");
// ==================== Функції для модального вікна ====================
/**
 * Відкриття модального вікна з деталями
 */
function openModal(item) {
    const { modal, modalBody } = dom_1.domElements;
    if (!modal || !modalBody)
        return;
    let content = "";
    // Визначаємо тип об'єкту та генеруємо HTML
    if ("title" in item) {
        const post = item;
        content = `
            <h2>${(0, helpers_1.escapeHtml)(post.title)}</h2>
            <p><strong>ID:</strong> ${post.id}</p>
            <p><strong>Автор ID:</strong> ${post.userId}</p>
            <div style="margin-top: 1rem;">
                <p>${(0, helpers_1.escapeHtml)(post.body)}</p>
            </div>
        `;
    }
    else if ("website" in item) {
        const user = item;
        content = `
            <h2>${(0, helpers_1.escapeHtml)(user.name)}</h2>
            <p><strong>Email:</strong> ${(0, helpers_1.escapeHtml)(user.email)}</p>
            <p><strong>Телефон:</strong> ${(0, helpers_1.escapeHtml)(user.phone)}</p>
            <p><strong>Сайт:</strong> <a href="https://${(0, helpers_1.escapeHtml)(user.website)}" target="_blank">${(0, helpers_1.escapeHtml)(user.website)}</a></p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;
    }
    else if ("postId" in item) {
        const comment = item;
        content = `
            <h2>${(0, helpers_1.escapeHtml)(comment.name)}</h2>
            <p><strong>Email:</strong> ${(0, helpers_1.escapeHtml)(comment.email)}</p>
            <p><strong>Post ID:</strong> ${comment.postId}</p>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #ccc;">
                <p>${(0, helpers_1.escapeHtml)(comment.body)}</p>
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
    const { modal } = dom_1.domElements;
    if (!modal)
        return;
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}
//# sourceMappingURL=modal.js.map