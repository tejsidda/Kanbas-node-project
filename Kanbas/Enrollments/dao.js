import Database from "../Database/index.js";

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: Date.now().toString, user: userId, course: courseId });
// }

// export function unenrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }

// export function deleteCourse(courseId) {
//   const { courses, enrollments } = Database;
//   Database.courses = courses.filter((course) => course._id !== courseId);
//   Database.enrollments = enrollments.filter(
//     (enrollment) => enrollment.course !== courseId
//   );
// }

export function enrollments(){
    return Database.enrollments;
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  
  // Prevent duplicate enrollments
  const alreadyEnrolled = enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (!alreadyEnrolled) {
    enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
  }

  return Database.enrollments;
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  // Remove the enrollment
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}

export function findEnrollments() {
  return Database.enrollments;
}
