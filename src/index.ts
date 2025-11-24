// Приклад з базовими типами TypeScript

// 1. Тип string
const userName: string = "Олег";
const greeting: string = `Привіт, ${userName}!`;

// 2. Тип number
const age: number = 25;
const height: number = 1.75;
const yearOfBirth: number = 1999;

// 3. Тип boolean
const isStudent: boolean = true;
const hasExperience: boolean = false;

// 4. Функція з типами
function calculateBirthYear(currentYear: number, personAge: number): number {
  return currentYear - personAge;
}

// 5. Масив з типом
const hobbies: string[] = ["програмування", "читання", "спорт"];
const grades: number[] = [85, 90, 78, 92];

// 6. Вивід результатів
console.log("=== Інформація про користувача ===");
console.log(greeting);
console.log(`Вік: ${age} років`);
console.log(`Зріст: ${height} м`);
console.log(`Студент: ${isStudent ? "так" : "ні"}`);
console.log(`Має досвід: ${hasExperience ? "так" : "ні"}`);
console.log(`\nРік народження: ${calculateBirthYear(2024, age)}`);
console.log(`Хобі: ${hobbies.join(", ")}`);
console.log(`Оцінки: ${grades.join(", ")}`);