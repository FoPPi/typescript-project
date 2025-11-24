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
declare const API_BASE_URL: string;
declare const SCROLL_THRESHOLD: number;
declare const ANIMATION_DELAY: number;
declare const modal: HTMLElement | null;
declare const modalBody: HTMLElement | null;
declare const closeBtn: HTMLElement | null;
declare const postsList: HTMLElement | null;
declare const usersList: HTMLElement | null;
declare const commentsList: HTMLElement | null;
declare const loadPostsBtn: HTMLElement | null;
declare const loadUsersBtn: HTMLElement | null;
declare const loadCommentsBtn: HTMLElement | null;
declare const toggleThemeBtn: HTMLElement | null;
/**
 * Отримання постів з JSON Placeholder
 * Типізована функція, що повертає масив постів
 */
declare function fetchPosts(): Promise<Post[]>;
/**
 * Отримання користувачів з JSON Placeholder
 * Типізована функція, що повертає масив користувачів
 */
declare function fetchUsers(): Promise<User[]>;
/**
 * Отримання коментарів з JSON Placeholder
 * Типізована функція, що повертає масив коментарів
 */
declare function fetchComments(): Promise<Comment[]>;
/**
 * Відображення постів на сторінці з анімацією
 * Типізований параметр posts: Post[]
 */
declare function displayPosts(posts: Post[]): void;
/**
 * Відображення користувачів на сторінці з анімацією
 * Типізований параметр users: User[]
 */
declare function displayUsers(users: User[]): void;
/**
 * Відображення коментарів на сторінці з анімацією
 * Типізований параметр comments: Comment[]
 */
declare function displayComments(comments: Comment[]): void;
/**
 * Відкриття модального вікна з деталями
 * Типізований параметр item: Post | User | Comment
 */
declare function openModal(item: Post | User | Comment): void;
/**
 * Закриття модального вікна
 */
declare function closeModal(): void;
/**
 * Відображення повідомлення про помилку
 * Типізований параметр message: string
 */
declare function showError(message: string): void;
/**
 * Екранування HTML спеціальних символів
 * Типізований параметр text: string, типізований повертаємий результат: string
 */
declare function escapeHtml(text: string): string;
/**
 * Перемикання темної теми
 */
declare function toggleTheme(): void;
/**
 * Завантаження збереженої теми
 */
declare function loadTheme(): void;
/**
 * Обробка прокручування сторінки
 * Додає анімацію при скролі вниз
 */
declare function handleScroll(): void;
/**
 * Додавання event listeners при завантаженні сторінки
 */
declare function initializeEventListeners(): void;
