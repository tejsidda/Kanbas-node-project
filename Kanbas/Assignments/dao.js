import Database from "../Database/index.js";

export function findAllAssignments(courseId) {
  const { assignments } = Database;
  // Filter assignments by courseId without mutating Database
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function deleteAssignment(assignmentID) {
  const { assignments } = Database;
  // Update Database.assignments to exclude the deleted assignment
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentID
  );
}

export function updateAssignment(assignmentID, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentUpdates._id
  );

  // If assignment exists, update it
  if (assignment) {
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  throw new Error(`Assignment with ID ${assignmentID} not found`);
}


export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString()  };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}
