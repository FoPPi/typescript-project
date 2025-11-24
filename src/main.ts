// Імпорти типів
import { Post, User, Comment } from "./types/definitions";

// Імпорт DOM елементів
import { domElements } from "./core/dom";

// Імпорт сервісів
import { fetchPosts, fetchUsers, fetchComments } from "./services/api";

// Імпорт UI модулів
import { displayPosts, displayUsers, displayComments } from "./ui/render";
import { closeModal } from "./ui/modal";
import { toggleTheme, loadTheme } from "./ui/theme";
import { handleScroll } from "./ui/scroll";

// ==================== Обробники подій ====================

/**
 * Додавання event listeners при завантаженні сторінки
 */
function initializeEventListeners(): void {
    const { 
        loadPostsBtn, 
        loadUsersBtn, 
        loadCommentsBtn, 
        closeBtn, 
        modal, 
        toggleThemeBtn 
    } = domElements;

    // Event listener для кнопок завантаження даних
    if (loadPostsBtn) {
        loadPostsBtn.addEventListener("click", async (): Promise<void> => {
            loadPostsBtn.textContent = "Завантаження...";
            const posts: Post[] = await fetchPosts();
            displayPosts(posts);
            loadPostsBtn.textContent = "Завантажити пости";
        });
    }
    
    if (loadUsersBtn) {
        loadUsersBtn.addEventListener("click", async (): Promise<void> => {
            loadUsersBtn.textContent = "Завантаження...";
            const users: User[] = await fetchUsers();
            displayUsers(users);
            loadUsersBtn.textContent = "Завантажити користувачів";
        });
    }
    
    if (loadCommentsBtn) {
        loadCommentsBtn.addEventListener("click", async (): Promise<void> => {
            loadCommentsBtn.textContent = "Завантаження...";
            const comments: Comment[] = await fetchComments();
            displayComments(comments);
            loadCommentsBtn.textContent = "Завантажити коментарі";
        });
    }
    
    // Event listener для закриття модального вікна
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
    
    // Event listener для закриття модального вікна при кліку поза ним
    if (modal) {
        modal.addEventListener("click", (event: MouseEvent): void => {
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
    document.addEventListener("keydown", (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

// ==================== Ініціалізація ====================

/**
 * Запуск всієї програми при завантаженні DOM
 */
document.addEventListener("DOMContentLoaded", (): void => {
    console.log("Сторінка завантажена, ініціалізація...");
    
    loadTheme();
    initializeEventListeners();
    
    console.log("Ініціалізація завершена!");
});