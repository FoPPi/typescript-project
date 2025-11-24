// ==================== Типи даних ====================

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface APIResponse<T> {
    data: T[];
    error: string | null;
}

// ==================== Константи ====================

const API_BASE_URL: string = "https://jsonplaceholder.typicode.com";
const SCROLL_THRESHOLD: number = 200;
const ANIMATION_DELAY: number = 0.1;

// ==================== DOM елементи ====================

const modal: HTMLElement | null = document.getElementById("modal");
const modalBody: HTMLElement | null = document.getElementById("modalBody");
const closeBtn: HTMLElement | null = document.querySelector(".close");
const postsList: HTMLElement | null = document.getElementById("postsList");
const usersList: HTMLElement | null = document.getElementById("usersList");
const commentsList: HTMLElement | null = document.getElementById("commentsList");
const loadPostsBtn: HTMLElement | null = document.getElementById("loadPostsBtn");
const loadUsersBtn: HTMLElement | null = document.getElementById("loadUsersBtn");
const loadCommentsBtn: HTMLElement | null = document.getElementById("loadCommentsBtn");
const toggleThemeBtn: HTMLElement | null = document.getElementById("toggleTheme");

// ==================== Функції для Fetch ====================

/**
 * Отримання постів з JSON Placeholder
 * Типізована функція, що повертає масив постів
 */
async function fetchPosts(): Promise<Post[]> {
    try {
        const response: Response = await fetch(`${API_BASE_URL}/posts?_limit=6`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts: Post[] = await response.json();
        console.log("Пости завантажені:", posts);
        return posts;
    } catch (error: unknown) {
        console.error("Помилка при завантаженні постів:", error);
        showError("Не вдалося завантажити пости");
        return [];
    }
}

/**
 * Отримання користувачів з JSON Placeholder
 * Типізована функція, що повертає масив користувачів
 */
async function fetchUsers(): Promise<User[]> {
    try {
        const response: Response = await fetch(`${API_BASE_URL}/users?_limit=6`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users: User[] = await response.json();
        console.log("Користувачі завантажені:", users);
        return users;
    } catch (error: unknown) {
        console.error("Помилка при завантаженні користувачів:", error);
        showError("Не вдалося завантажити користувачів");
        return [];
    }
}

/**
 * Отримання коментарів з JSON Placeholder
 * Типізована функція, що повертає масив коментарів
 */
async function fetchComments(): Promise<Comment[]> {
    try {
        const response: Response = await fetch(`${API_BASE_URL}/comments?_limit=10`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const comments: Comment[] = await response.json();
        console.log("Коментарі завантажені:", comments);
        return comments;
    } catch (error: unknown) {
        console.error("Помилка при завантаженні коментарів:", error);
        showError("Не вдалося завантажити коментарі");
        return [];
    }
}

// ==================== Функції для відображення даних ====================

/**
 * Відображення постів на сторінці з анімацією
 * Типізований параметр posts: Post[]
 */
function displayPosts(posts: Post[]): void {
    if (!postsList) return;
    
    postsList.innerHTML = "";
    
    posts.forEach((post: Post, index: number) => {
        const card: HTMLElement = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        
        const title: string = post.title;
        const body: string = post.body.substring(0, 100) + "...";
        
        card.innerHTML = `
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
            <small>Post ID: ${post.id}</small>
        `;
        
        // Event listener для відкриття модального вікна
        card.addEventListener("click", () => openModal(post));
        
        postsList.appendChild(card);
    });
}

/**
 * Відображення користувачів на сторінці з анімацією
 * Типізований параметр users: User[]
 */
function displayUsers(users: User[]): void {
    if (!usersList) return;
    
    usersList.innerHTML = "";
    
    users.forEach((user: User, index: number) => {
        const card: HTMLElement = document.createElement("div");
        card.className = "card fade-in";
        card.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        
        card.innerHTML = `
            <h3>${escapeHtml(user.name)}</h3>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(user.phone)}</p>
            <p><strong>Сайт:</strong> ${escapeHtml(user.website)}</p>
        `;
        
        // Event listener для відкриття модального вікна
        card.addEventListener("click", () => openModal(user));
        
        usersList.appendChild(card);
    });
}

/**
 * Відображення коментарів на сторінці з анімацією
 * Типізований параметр comments: Comment[]
 */
function displayComments(comments: Comment[]): void {
    if (!commentsList) return;
    
    commentsList.innerHTML = "";
    
    comments.forEach((comment: Comment, index: number) => {
        const item: HTMLElement = document.createElement("div");
        item.className = "comment-item fade-in";
        item.style.animationDelay = `${index * ANIMATION_DELAY}s`;
        
        item.innerHTML = `
            <h4>${escapeHtml(comment.name)}</h4>
            <div class="email">${escapeHtml(comment.email)}</div>
            <p>${escapeHtml(comment.body)}</p>
            <small>Post ID: ${comment.postId}</small>
        `;
        
        commentsList.appendChild(item);
    });
}

// ==================== Функції для модального вікна ====================

/**
 * Відкриття модального вікна з деталями
 * Типізований параметр item: Post | User | Comment
 */
function openModal(item: Post | User | Comment): void {
    if (!modal || !modalBody) return;
    
    let content: string = "";
    
    // Визначаємо тип об'єкту та генеруємо HTML
    if ("title" in item) {
        const post: Post = item;
        content = `
            <h2>${escapeHtml(post.title)}</h2>
            <p><strong>ID:</strong> ${post.id}</p>
            <p><strong>Автор ID:</strong> ${post.userId}</p>
            <div style="margin-top: 1rem;">
                <p>${escapeHtml(post.body)}</p>
            </div>
        `;
    } else if ("website" in item) {
        const user: User = item;
        content = `
            <h2>${escapeHtml(user.name)}</h2>
            <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(user.phone)}</p>
            <p><strong>Сайт:</strong> <a href="https://${escapeHtml(user.website)}" target="_blank">${escapeHtml(user.website)}</a></p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;
    } else if ("postId" in item) {
        const comment: Comment = item;
        content = `
            <h2>${escapeHtml(comment.name)}</h2>
            <p><strong>Email:</strong> ${escapeHtml(comment.email)}</p>
            <p><strong>Post ID:</strong> ${comment.postId}</p>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #ccc;">
                <p>${escapeHtml(comment.body)}</p>
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
function closeModal(): void {
    if (!modal) return;
    
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}

/**
 * Відображення повідомлення про помилку
 * Типізований параметр message: string
 */
function showError(message: string): void {
    alert(`Помилка: ${message}`);
}

// ==================== Функції для безпеки ====================

/**
 * Екранування HTML спеціальних символів
 * Типізований параметр text: string, типізований повертаємий результат: string
 */
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    
    return text.replace(/[&<>"']/g, (m: string) => map[m]);
}

// ==================== Функції для теми ====================

/**
 * Перемикання темної теми
 */
function toggleTheme(): void {
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
function loadTheme(): void {
    const isDarkTheme: boolean = localStorage.getItem("darkTheme") === "true";
    
    if (isDarkTheme) {
        document.body.classList.add("dark-theme");
        if (toggleThemeBtn) {
            toggleThemeBtn.textContent = "☀️ Світла тема";
        }
    }
}

// ==================== Функції для прокручування ====================

/**
 * Обробка прокручування сторінки
 * Додає анімацію при скролі вниз
 */
function handleScroll(): void {
    const scrollTop: number = window.scrollY;
    
    if (scrollTop > SCROLL_THRESHOLD) {
        const navbar: HTMLElement | null = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.boxShadow = "0 5px 20px rgba(52, 152, 219, 0.5)";
        }
    } else {
        const navbar: HTMLElement | null = document.querySelector(".navbar");
        if (navbar) {
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        }
    }
    
    console.log("Прокручено на:", scrollTop, "px");
}

// ==================== Обробники подій ====================

/**
 * Додавання event listeners при завантаженні сторінки
 */
function initializeEventListeners(): void {
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