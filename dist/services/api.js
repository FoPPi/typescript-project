"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPosts = fetchPosts;
exports.fetchUsers = fetchUsers;
exports.fetchComments = fetchComments;
const constants_1 = require("../config/constants");
const helpers_1 = require("../utils/helpers");
// ==================== Функції для Fetch ====================
/**
 * Отримання постів з JSON Placeholder
 */
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${constants_1.API_BASE_URL}/posts?_limit=6`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = yield response.json();
            console.log("Пости завантажені:", posts);
            return posts;
        }
        catch (error) {
            console.error("Помилка при завантаженні постів:", error);
            (0, helpers_1.showError)("Не вдалося завантажити пости");
            return [];
        }
    });
}
/**
 * Отримання користувачів з JSON Placeholder
 */
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${constants_1.API_BASE_URL}/users?_limit=6`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = yield response.json();
            console.log("Користувачі завантажені:", users);
            return users;
        }
        catch (error) {
            console.error("Помилка при завантаженні користувачів:", error);
            (0, helpers_1.showError)("Не вдалося завантажити користувачів");
            return [];
        }
    });
}
/**
 * Отримання коментарів з JSON Placeholder
 */
function fetchComments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${constants_1.API_BASE_URL}/comments?_limit=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const comments = yield response.json();
            console.log("Коментарі завантажені:", comments);
            return comments;
        }
        catch (error) {
            console.error("Помилка при завантаженні коментарів:", error);
            (0, helpers_1.showError)("Не вдалося завантажити коментарі");
            return [];
        }
    });
}
//# sourceMappingURL=api.js.map