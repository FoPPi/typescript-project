// ==================== DOM елементи ====================
// Виносимо посилання на DOM елементи в окремий файл, щоб їх можна було імпортувати в будь-який модуль

export const domElements = {
    modal: document.getElementById("modal") as HTMLElement | null,
    modalBody: document.getElementById("modalBody") as HTMLElement | null,
    closeBtn: document.querySelector(".close") as HTMLElement | null,
    postsList: document.getElementById("postsList") as HTMLElement | null,
    usersList: document.getElementById("usersList") as HTMLElement | null,
    commentsList: document.getElementById("commentsList") as HTMLElement | null,
    loadPostsBtn: document.getElementById("loadPostsBtn") as HTMLElement | null,
    loadUsersBtn: document.getElementById("loadUsersBtn") as HTMLElement | null,
    loadCommentsBtn: document.getElementById("loadCommentsBtn") as HTMLElement | null,
    toggleThemeBtn: document.getElementById("toggleTheme") as HTMLElement | null,
    navbar: document.querySelector(".navbar") as HTMLElement | null
};