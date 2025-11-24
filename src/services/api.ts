import { API_BASE_URL } from "../config/constants";
import { Post, User, Comment } from "../types/definitions";
import { showError } from "../utils/helpers";

// ==================== Функції для Fetch ====================

/**
 * Отримання постів з JSON Placeholder
 */
export async function fetchPosts(): Promise<Post[]> {
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
 */
export async function fetchUsers(): Promise<User[]> {
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
 */
export async function fetchComments(): Promise<Comment[]> {
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