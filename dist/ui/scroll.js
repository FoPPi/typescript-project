"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleScroll = handleScroll;
const constants_1 = require("../config/constants");
const dom_1 = require("../core/dom");
// ==================== Функції для прокручування ====================
/**
 * Обробка прокручування сторінки
 */
function handleScroll() {
    const { navbar } = dom_1.domElements;
    const scrollTop = window.scrollY;
    if (scrollTop > constants_1.SCROLL_THRESHOLD) {
        if (navbar) {
            navbar.style.boxShadow = "0 5px 20px rgba(52, 152, 219, 0.5)";
        }
    }
    else {
        if (navbar) {
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        }
    }
    console.log("Прокручено на:", scrollTop, "px");
}
//# sourceMappingURL=scroll.js.map