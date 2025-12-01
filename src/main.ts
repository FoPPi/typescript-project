/**
 * ============================================
 * СИСТЕМА УПРАВЛІННЯ НАВЧАЛЬНИМ ПРОЦЕСОМ УНІВЕРСИТЕТУ
 * ============================================
 * 
 * Файл містить повну реалізацію системи управління університетом
 * з використанням TypeScript Enum та класів
 */

// ============================================
// ENUM ВИЗНАЧЕННЯ
// ============================================

/**
 * Статус студента в університеті
 */
enum StudentStatus {
  Active = "ACTIVE",                    // Активний студент
  Academic_Leave = "ACADEMIC_LEAVE",    // Академічна відпустка
  Graduated = "GRADUATED",              // Випускник
  Expelled = "EXPELLED"                 // Відрахований
}

/**
 * Тип навчального курсу
 */
enum CourseType {
  Mandatory = "MANDATORY",  // Обов'язковий курс
  Optional = "OPTIONAL",    // Вибірковий курс
  Special = "SPECIAL"       // Спеціальний курс
}

/**
 * Семестр навчання
 */
enum Semester {
  First = "FIRST",    // Перший семестр
  Second = "SECOND"   // Другий семестр
}

/**
 * Оцінки студентів
 */
enum Grade {
  Excellent = 5,        // Відмінно
  Good = 4,             // Добре
  Satisfactory = 3,     // Задовільно
  Unsatisfactory = 2    // Незадовільно
}

/**
 * Факультети університету
 */
enum Faculty {
  Computer_Science = "COMPUTER_SCIENCE",  // Факультет комп'ютерних наук
  Economics = "ECONOMICS",                // Економічний факультет
  Law = "LAW",                           // Юридичний факультет
  Engineering = "ENGINEERING"             // Інженерний факультет
}

// ============================================
// ІНТЕРФЕЙСИ
// ============================================

/**
 * Інтерфейс студента
 */
interface Student {
  id: number;                   // Унікальний ідентифікатор
  fullName: string;             // Повне ім'я
  faculty: Faculty;             // Факультет
  year: number;                 // Курс навчання
  status: StudentStatus;        // Статус студента
  enrollmentDate: Date;         // Дата зарахування
  groupNumber: string;          // Номер групи
}

/**
 * Інтерфейс навчального курсу
 */
interface Course {
  id: number;                   // Унікальний ідентифікатор
  name: string;                 // Назва курсу
  type: CourseType;             // Тип курсу
  credits: number;              // Кількість кредитів
  semester: Semester;           // Семестр викладання
  faculty: Faculty;             // Факультет
  maxStudents: number;          // Максимальна кількість студентів
}

/**
 * Інтерфейс оцінки студента
 */
interface StudentGrade {
  studentId: number;            // ID студента
  courseId: number;             // ID курсу
  grade: Grade;                 // Оцінка
  date: Date;                   // Дата виставлення
  semester: Semester;           // Семестр
}

/**
 * Інтерфейс для реєстрації студента на курс
 */
interface CourseRegistration {
  studentId: number;
  courseId: number;
  registrationDate: Date;
}

// ============================================
// КЛАС СИСТЕМИ УПРАВЛІННЯ УНІВЕРСИТЕТОМ
// ============================================

/**
 * Головний клас для управління навчальним процесом університету
 */
class UniversityManagementSystem {
  // Приватні поля для зберігання даних
  private students: Student[] = [];
  private courses: Course[] = [];
  private grades: StudentGrade[] = [];
  private courseRegistrations: CourseRegistration[] = [];
  private nextStudentId: number = 1;
  private nextCourseId: number = 1;

  // ============================================
  // МЕТОДИ ДЛЯ РОБОТИ ЗІ СТУДЕНТАМИ
  // ============================================

  /**
   * Зараховує нового студента до університету
   * @param student - дані студента без ID (ID генерується автоматично)
   * @returns об'єкт студента з присвоєним ID
   */
  enrollStudent(student: Omit<Student, "id">): Student {
    // Валідація вхідних даних
    if (!student.fullName || student.fullName.trim().length === 0) {
      throw new Error("Ім'я студента не може бути порожнім");
    }

    if (student.year < 1 || student.year > 6) {
      throw new Error("Курс навчання має бути від 1 до 6");
    }

    if (!student.groupNumber || student.groupNumber.trim().length === 0) {
      throw new Error("Номер групи не може бути порожнім");
    }

    // Створення нового студента з унікальним ID
    const newStudent: Student = {
      id: this.nextStudentId++,
      ...student
    };

    this.students.push(newStudent);
    console.log(`✅ Студента ${newStudent.fullName} успішно зараховано (ID: ${newStudent.id})`);
    
    return newStudent;
  }

  /**
   * Реєструє студента на курс
   * @param studentId - ID студента
   * @param courseId - ID курсу
   */
  registerForCourse(studentId: number, courseId: number): void {
    // Перевірка існування студента
    const student = this.students.find(s => s.id === studentId);
    if (!student) {
      throw new Error(`Студента з ID ${studentId} не знайдено`);
    }

    // Перевірка статусу студента
    if (student.status !== StudentStatus.Active) {
      throw new Error(`Студент ${student.fullName} має статус ${student.status}. Реєстрація неможлива.`);
    }

    // Перевірка існування курсу
    const course = this.courses.find(c => c.id === courseId);
    if (!course) {
      throw new Error(`Курс з ID ${courseId} не знайдено`);
    }

    // Перевірка відповідності факультету
    if (student.faculty !== course.faculty) {
      throw new Error(
        `Студент факультету ${student.faculty} не може зареєструватися на курс факультету ${course.faculty}`
      );
    }

    // Перевірка на повторну реєстрацію
    const alreadyRegistered = this.courseRegistrations.some(
      reg => reg.studentId === studentId && reg.courseId === courseId
    );
    if (alreadyRegistered) {
      throw new Error(`Студент ${student.fullName} вже зареєстрований на курс "${course.name}"`);
    }

    // Перевірка кількості студентів на курсі
    const currentStudentsCount = this.courseRegistrations.filter(
      reg => reg.courseId === courseId
    ).length;

    if (currentStudentsCount >= course.maxStudents) {
      throw new Error(
        `Курс "${course.name}" заповнено. Максимальна кількість студентів: ${course.maxStudents}`
      );
    }

    // Реєстрація студента на курс
    this.courseRegistrations.push({
      studentId,
      courseId,
      registrationDate: new Date()
    });

    console.log(`✅ Студент ${student.fullName} зареєстрований на курс "${course.name}"`);
  }

  /**
   * Виставляє оцінку студенту за курс
   * @param studentId - ID студента
   * @param courseId - ID курсу
   * @param grade - оцінка
   */
  setGrade(studentId: number, courseId: number, grade: Grade): void {
    // Перевірка існування студента
    const student = this.students.find(s => s.id === studentId);
    if (!student) {
      throw new Error(`Студента з ID ${studentId} не знайдено`);
    }

    // Перевірка існування курсу
    const course = this.courses.find(c => c.id === courseId);
    if (!course) {
      throw new Error(`Курс з ID ${courseId} не знайдено`);
    }

    // Перевірка реєстрації студента на курс
    const isRegistered = this.courseRegistrations.some(
      reg => reg.studentId === studentId && reg.courseId === courseId
    );

    if (!isRegistered) {
      throw new Error(
        `Студент ${student.fullName} не зареєстрований на курс "${course.name}". ` +
        `Виставлення оцінки неможливе.`
      );
    }

    // Перевірка валідності оцінки
    if (!Object.values(Grade).includes(grade)) {
      throw new Error(`Невалідна оцінка: ${grade}`);
    }

    // Перевірка на існуючу оцінку
    const existingGradeIndex = this.grades.findIndex(
      g => g.studentId === studentId && g.courseId === courseId
    );

    const newGrade: StudentGrade = {
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester
    };

    if (existingGradeIndex !== -1) {
      // Оновлення існуючої оцінки
      this.grades[existingGradeIndex] = newGrade;
      console.log(`✅ Оцінку студента ${student.fullName} за курс "${course.name}" оновлено: ${grade}`);
    } else {
      // Додавання нової оцінки
      this.grades.push(newGrade);
      console.log(`✅ Студенту ${student.fullName} виставлено оцінку ${grade} за курс "${course.name}"`);
    }
  }

  /**
   * Оновлює статус студента
   * @param studentId - ID студента
   * @param newStatus - новий статус
   */
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find(s => s.id === studentId);
    
    if (!student) {
      throw new Error(`Студента з ID ${studentId} не знайдено`);
    }

    const oldStatus = student.status;

    // Валідація переходів між статусами
    this.validateStatusTransition(oldStatus, newStatus);

    student.status = newStatus;
    console.log(`✅ Статус студента ${student.fullName} змінено: ${oldStatus} → ${newStatus}`);
  }

  /**
   * Валідує можливість переходу між статусами
   * @param oldStatus - поточний статус
   * @param newStatus - новий статус
   */
  private validateStatusTransition(oldStatus: StudentStatus, newStatus: StudentStatus): void {
    // Неможливо змінити статус випускника або відрахованого
    if (oldStatus === StudentStatus.Graduated) {
      throw new Error("Неможливо змінити статус випускника");
    }

    if (oldStatus === StudentStatus.Expelled) {
      throw new Error("Неможливо змінити статус відрахованого студента");
    }

    // Логічні обмеження
    if (oldStatus === StudentStatus.Academic_Leave && newStatus === StudentStatus.Graduated) {
      throw new Error("Студент в академічній відпустці не може одразу отримати статус випускника");
    }
  }

  /**
   * Отримує список студентів за факультетом
   * @param faculty - факультет
   * @returns масив студентів
   */
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter(student => student.faculty === faculty);
  }

  /**
   * Отримує всі оцінки студента
   * @param studentId - ID студента
   * @returns масив оцінок
   */
  getStudentGrades(studentId: number): StudentGrade[] {
    const student = this.students.find(s => s.id === studentId);
    
    if (!student) {
      throw new Error(`Студента з ID ${studentId} не знайдено`);
    }

    return this.grades.filter(grade => grade.studentId === studentId);
  }

  /**
   * Отримує доступні курси для факультету в конкретному семестрі
   * @param faculty - факультет
   * @param semester - семестр
   * @returns масив доступних курсів
   */
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(
      course => course.faculty === faculty && course.semester === semester
    );
  }

  /**
   * Обчислює середній бал студента
   * @param studentId - ID студента
   * @returns середній бал (0, якщо немає оцінок)
   */
  calculateAverageGrade(studentId: number): number {
    const student = this.students.find(s => s.id === studentId);
    
    if (!student) {
      throw new Error(`Студента з ID ${studentId} не знайдено`);
    }

    const studentGrades = this.grades.filter(g => g.studentId === studentId);

    if (studentGrades.length === 0) {
      return 0;
    }

    const sum = studentGrades.reduce((total, gradeRecord) => total + gradeRecord.grade, 0);
    return Number((sum / studentGrades.length).toFixed(2));
  }

  /**
   * Отримує список відмінників (середній бал >= 4.5) по факультету
   * @param faculty - факультет
   * @returns масив студентів-відмінників з їх середніми балами
   */
  getTopStudentsByFaculty(faculty: Faculty): Array<{ student: Student; averageGrade: number }> {
    const facultyStudents = this.getStudentsByFaculty(faculty);
    
    const topStudents = facultyStudents
      .map(student => ({
        student,
        averageGrade: this.calculateAverageGrade(student.id)
      }))
      .filter(item => item.averageGrade >= 4.5 && item.averageGrade > 0)
      .sort((a, b) => b.averageGrade - a.averageGrade);

    return topStudents;
  }

  // ============================================
  // ДОПОМІЖНІ МЕТОДИ ДЛЯ РОБОТИ З КУРСАМИ
  // ============================================

  /**
   * Додає новий курс до системи
   * @param course - дані курсу без ID
   * @returns створений курс з ID
   */
  addCourse(course: Omit<Course, "id">): Course {
    if (!course.name || course.name.trim().length === 0) {
      throw new Error("Назва курсу не може бути порожньою");
    }

    if (course.credits <= 0) {
      throw new Error("Кількість кредитів має бути більше 0");
    }

    if (course.maxStudents <= 0) {
      throw new Error("Максимальна кількість студентів має бути більше 0");
    }

    const newCourse: Course = {
      id: this.nextCourseId++,
      ...course
    };

    this.courses.push(newCourse);
    console.log(`✅ Курс "${newCourse.name}" успішно додано (ID: ${newCourse.id})`);
    
    return newCourse;
  }

  /**
   * Отримує інформацію про курс за ID
   * @param courseId - ID курсу
   * @returns курс або undefined
   */
  getCourseById(courseId: number): Course | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  /**
   * Отримує інформацію про студента за ID
   * @param studentId - ID студента
   * @returns студент або undefined
   */
  getStudentById(studentId: number): Student | undefined {
    return this.students.find(s => s.id === studentId);
  }

  /**
   * Отримує кількість студентів на курсі
   * @param courseId - ID курсу
   * @returns кількість зареєстрованих студентів
   */
  getCourseEnrollmentCount(courseId: number): number {
    return this.courseRegistrations.filter(reg => reg.courseId === courseId).length;
  }

  /**
   * Виводить статистику по студенту
   * @param studentId - ID студента
   */
  printStudentReport(studentId: number): void {
    const student = this.getStudentById(studentId);
    
    if (!student) {
      console.log(`❌ Студента з ID ${studentId} не знайдено`);
      return;
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 ЗВІТ ПО СТУДЕНТУ`);
    console.log('='.repeat(60));
    console.log(`Ім'я: ${student.fullName}`);
    console.log(`Факультет: ${student.faculty}`);
    console.log(`Курс: ${student.year}`);
    console.log(`Група: ${student.groupNumber}`);
    console.log(`Статус: ${student.status}`);
    console.log(`Дата зарахування: ${student.enrollmentDate.toLocaleDateString('uk-UA')}`);
    
    const grades = this.getStudentGrades(studentId);
    console.log(`\nОцінки (всього: ${grades.length}):`);
    
    if (grades.length > 0) {
      grades.forEach(gradeRecord => {
        const course = this.getCourseById(gradeRecord.courseId);
        console.log(`  - ${course?.name}: ${gradeRecord.grade} (${gradeRecord.semester})`);
      });
      
      const average = this.calculateAverageGrade(studentId);
      console.log(`\n📈 Середній бал: ${average}`);
    } else {
      console.log('  Оцінок немає');
    }
    
    console.log('='.repeat(60) + '\n');
  }
}

// ============================================
// ДЕМОНСТРАЦІЯ РОБОТИ СИСТЕМИ
// ============================================

console.log('🎓 СИСТЕМА УПРАВЛІННЯ УНІВЕРСИТЕТОМ\n');

// Створення екземпляру системи
const university = new UniversityManagementSystem();

console.log('📚 Крок 1: Додавання курсів\n');

// Додавання курсів для різних факультетів
const course1 = university.addCourse({
  name: "Алгоритми та структури даних",
  type: CourseType.Mandatory,
  credits: 6,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 30
});

const course2 = university.addCourse({
  name: "Бази даних",
  type: CourseType.Mandatory,
  credits: 5,
  semester: Semester.Second,
  faculty: Faculty.Computer_Science,
  maxStudents: 30
});

const course3 = university.addCourse({
  name: "Машинне навчання",
  type: CourseType.Optional,
  credits: 4,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 20
});

const course4 = university.addCourse({
  name: "Мікроекономіка",
  type: CourseType.Mandatory,
  credits: 5,
  semester: Semester.First,
  faculty: Faculty.Economics,
  maxStudents: 40
});

console.log('\n👨‍🎓 Крок 2: Зарахування студентів\n');

// Зарахування студентів
const student1 = university.enrollStudent({
  fullName: "Іванов Іван Іванович",
  faculty: Faculty.Computer_Science,
  year: 2,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2023-09-01'),
  groupNumber: "КН-21"
});

const student2 = university.enrollStudent({
  fullName: "Петренко Марія Олександрівна",
  faculty: Faculty.Computer_Science,
  year: 2,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2023-09-01'),
  groupNumber: "КН-21"
});

const student3 = university.enrollStudent({
  fullName: "Сидоренко Олег Петрович",
  faculty: Faculty.Economics,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2024-09-01'),
  groupNumber: "ЕК-11"
});

const student4 = university.enrollStudent({
  fullName: "Коваленко Анна Сергіївна",
  faculty: Faculty.Computer_Science,
  year: 3,
  status: StudentStatus.Active,
  enrollmentDate: new Date('2022-09-01'),
  groupNumber: "КН-31"
});

console.log('\n📝 Крок 3: Реєстрація студентів на курси\n');

// Реєстрація студентів на курси
try {
  university.registerForCourse(student1.id, course1.id);
  university.registerForCourse(student1.id, course3.id);
  university.registerForCourse(student2.id, course1.id);
  university.registerForCourse(student2.id, course2.id);
  university.registerForCourse(student4.id, course1.id);
  university.registerForCourse(student4.id, course2.id);
  university.registerForCourse(student4.id, course3.id);
  
  // Спроба реєстрації на курс іншого факультету (має викликати помилку)
  console.log('\n⚠️  Тест: Спроба реєстрації на курс іншого факультету:');
  try {
    university.registerForCourse(student3.id, course1.id);
  } catch (error) {
    console.log(`❌ ${(error as Error).message}`);
  }
} catch (error) {
  console.error(`Помилка: ${(error as Error).message}`);
}

console.log('\n🎯 Крок 4: Виставлення оцінок\n');

// Виставлення оцінок
try {
  university.setGrade(student1.id, course1.id, Grade.Excellent);
  university.setGrade(student1.id, course3.id, Grade.Good);
  university.setGrade(student2.id, course1.id, Grade.Excellent);
  university.setGrade(student2.id, course2.id, Grade.Excellent);
  university.setGrade(student4.id, course1.id, Grade.Excellent);
  university.setGrade(student4.id, course2.id, Grade.Good);
  university.setGrade(student4.id, course3.id, Grade.Excellent);
  
  // Спроба виставити оцінку без реєстрації на курс
  console.log('\n⚠️  Тест: Спроба виставити оцінку без реєстрації:');
  try {
    university.setGrade(student3.id, course4.id, Grade.Good);
  } catch (error) {
    console.log(`❌ ${(error as Error).message}`);
  }
} catch (error) {
  console.error(`Помилка: ${(error as Error).message}`);
}

console.log('\n📊 Крок 5: Виведення звітів\n');

// Звіт по студенту
university.printStudentReport(student1.id);
university.printStudentReport(student2.id);
university.printStudentReport(student4.id);

console.log('🏆 Крок 6: Відмінники факультету Computer Science\n');

// Список відмінників
const topStudents = university.getTopStudentsByFaculty(Faculty.Computer_Science);
console.log(`Знайдено відмінників: ${topStudents.length}\n`);
topStudents.forEach((item, index) => {
  console.log(`${index + 1}. ${item.student.fullName} - середній бал: ${item.averageGrade}`);
});

console.log('\n🔄 Крок 7: Зміна статусів студентів\n');

// Зміна статусів
try {
  university.updateStudentStatus(student4.id, StudentStatus.Academic_Leave);
  
  // Спроба зареєструвати студента в академічній відпустці на курс
  console.log('\n⚠️  Тест: Спроба реєстрації студента в академ. відпустці:');
  try {
    university.registerForCourse(student4.id, course2.id);
  } catch (error) {
    console.log(`❌ ${(error as Error).message}`);
  }
  
  // Повернення студента до активного статусу
  university.updateStudentStatus(student4.id, StudentStatus.Active);
  
  // Випуск студента
  university.updateStudentStatus(student4.id, StudentStatus.Graduated);
  
  // Спроба змінити статус випускника (має викликати помилку)
  console.log('\n⚠️  Тест: Спроба змінити статус випускника:');
  try {
    university.updateStudentStatus(student4.id, StudentStatus.Active);
  } catch (error) {
    console.log(`❌ ${(error as Error).message}`);
  }
} catch (error) {
  console.error(`Помилка: ${(error as Error).message}`);
}

console.log('\n📚 Крок 8: Доступні курси\n');

// Перегляд доступних курсів
const availableCourses = university.getAvailableCourses(
  Faculty.Computer_Science,
  Semester.First
);

console.log(`Курси для Computer Science (Перший семестр): ${availableCourses.length}\n`);
availableCourses.forEach(course => {
  const enrolled = university.getCourseEnrollmentCount(course.id);
  console.log(`- ${course.name} (${course.type})`);
  console.log(`  Кредитів: ${course.credits}, Студентів: ${enrolled}/${course.maxStudents}`);
});

console.log('\n✅ ДЕМОНСТРАЦІЯ ЗАВЕРШЕНА\n');