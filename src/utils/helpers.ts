// ==================== Допоміжні функції ====================

/**
 * Екранування HTML спеціальних символів
 */
export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    
    return text.replace(/[&<>"']/g, (m: string) => map[m]);
}

/**
 * Відображення повідомлення про помилку
 */
export function showError(message: string): void {
    alert(`Помилка: ${message}`);
}