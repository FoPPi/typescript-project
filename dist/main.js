"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Імпорт DOM елементів
const dom_1 = require("./core/dom");
// Імпорт сервісів
const api_1 = require("./services/api");
// Імпорт UI модулів
const render_1 = require("./ui/render");
const modal_1 = require("./ui/modal");
const theme_1 = require("./ui/theme");
const scroll_1 = require("./ui/scroll");
// ==================== Обробники подій ====================
/**
 * Додавання event listeners при завантаженні сторінки
 */
function initializeEventListeners() {
    const { loadPostsBtn, loadUsersBtn, loadCommentsBtn, closeBtn, modal, toggleThemeBtn } = dom_1.domElements;
    // Event listener для кнопок завантаження даних
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            loadPostsBtn.textContent = "Завантаження...";
            const posts = yield (0, api_1.fetchPosts)();
            (0, render_1.displayPosts)(posts);
            loadPostsBtn.textContent = "Завантажити пости";
        }));
    }
    if (loadUsersBtn) {
        loadUsersBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            loadUsersBtn.textContent = "Завантаження...";
            const users = yield (0, api_1.fetchUsers)();
            (0, render_1.displayUsers)(users);
            loadUsersBtn.textContent = "Завантажити користувачів";
        }));
    }
    if (loadCommentsBtn) {
        loadCommentsBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            loadCommentsBtn.textContent = "Завантаження...";
            const comments = yield (0, api_1.fetchComments)();
            (0, render_1.displayComments)(comments);
            loadCommentsBtn.textContent = "Завантажити коментарі";
        }));
    }
    // Event listener для закриття модального вікна
    if (closeBtn) {
        closeBtn.addEventListener("click", modal_1.closeModal);
    }
    // Event listener для закриття модального вікна при кліку поза ним
    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                (0, modal_1.closeModal)();
            }
        });
    }
    // Event listener для перемикання теми
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener("click", theme_1.toggleTheme);
    }
    // Event listener для прокручування сторінки
    window.addEventListener("scroll", scroll_1.handleScroll);
    // Event listener для Escape клавіші для закриття модального вікна
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            (0, modal_1.closeModal)();
        }
    });
}
// ==================== Ініціалізація ====================
/**
 * Запуск всієї програми при завантаженні DOM
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Сторінка завантажена, ініціалізація...");
    (0, theme_1.loadTheme)();
    initializeEventListeners();
    console.log("Ініціалізація завершена!");
});
//# sourceMappingURL=main.js.map