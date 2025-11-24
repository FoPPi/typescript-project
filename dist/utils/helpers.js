"use strict";
// ==================== Допоміжні функції ====================
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = escapeHtml;
exports.showError = showError;
/**
 * Екранування HTML спеціальних символів
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
/**
 * Відображення повідомлення про помилку
 */
function showError(message) {
    alert(`Помилка: ${message}`);
}
//# sourceMappingURL=helpers.js.map