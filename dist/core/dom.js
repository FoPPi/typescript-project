"use strict";
// ==================== DOM елементи ====================
// Виносимо посилання на DOM елементи в окремий файл, щоб їх можна було імпортувати в будь-який модуль
Object.defineProperty(exports, "__esModule", { value: true });
exports.domElements = void 0;
exports.domElements = {
    modal: document.getElementById("modal"),
    modalBody: document.getElementById("modalBody"),
    closeBtn: document.querySelector(".close"),
    postsList: document.getElementById("postsList"),
    usersList: document.getElementById("usersList"),
    commentsList: document.getElementById("commentsList"),
    loadPostsBtn: document.getElementById("loadPostsBtn"),
    loadUsersBtn: document.getElementById("loadUsersBtn"),
    loadCommentsBtn: document.getElementById("loadCommentsBtn"),
    toggleThemeBtn: document.getElementById("toggleTheme"),
    navbar: document.querySelector(".navbar")
};
//# sourceMappingURL=dom.js.map