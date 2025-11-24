import { domElements } from "../core/dom";

// ==================== Функції для теми ====================

/**
 * Перемикання темної теми
 */
export function toggleTheme(): void {
    const { toggleThemeBtn } = domElements;
    
    const isDarkTheme: boolean = document.body.classList.toggle("dark-theme");
    
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
export function loadTheme(): void {
    const { toggleThemeBtn } = domElements;
    const isDarkTheme: boolean = localStorage.getItem("darkTheme") === "true";
    
    if (isDarkTheme) {
        document.body.classList.add("dark-theme");
        if (toggleThemeBtn) {
            toggleThemeBtn.textContent = "☀️ Світла тема";
        }
    }
}