import { Post, User, Comment } from "../types/definitions";
/**
 * Відкриття модального вікна з деталями
 */
export declare function openModal(item: Post | User | Comment): void;
/**
 * Закриття модального вікна
 */
export declare function closeModal(): void;
