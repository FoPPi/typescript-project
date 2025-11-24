import { Post, User, Comment } from "../types/definitions";
/**
 * Отримання постів з JSON Placeholder
 */
export declare function fetchPosts(): Promise<Post[]>;
/**
 * Отримання користувачів з JSON Placeholder
 */
export declare function fetchUsers(): Promise<User[]>;
/**
 * Отримання коментарів з JSON Placeholder
 */
export declare function fetchComments(): Promise<Comment[]>;
