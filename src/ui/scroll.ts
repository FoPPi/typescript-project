import { SCROLL_THRESHOLD } from "../config/constants";
import { domElements } from "../core/dom";

// ==================== Функції для прокручування ====================

/**
 * Обробка прокручування сторінки
 */
export function handleScroll(): void {
    const { navbar } = domElements;
    const scrollTop: number = window.scrollY;
    
    if (scrollTop > SCROLL_THRESHOLD) {
        if (navbar) {
            navbar.style.boxShadow = "0 5px 20px rgba(52, 152, 219, 0.5)";
        }
    } else {
        if (navbar) {
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        }
    }
    
    console.log("Прокручено на:", scrollTop, "px");
}