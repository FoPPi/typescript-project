"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTheme = toggleTheme;
exports.loadTheme = loadTheme;
const dom_1 = require("../core/dom");
// ==================== Функції для теми ====================
/**
 * Перемикання темної теми
 */
function toggleTheme() {
    const { toggleThemeBtn } = dom_1.domElements;
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
    const { toggleThemeBtn } = dom_1.domElements;
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    if (isDarkTheme) {
        document.body.classList.add("dark-theme");
        if (toggleThemeBtn) {
            toggleThemeBtn.textContent = "☀️ Світла тема";
        }
    }
}
//# sourceMappingURL=theme.js.map