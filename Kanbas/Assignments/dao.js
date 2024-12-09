import Database from "../Database/index.js";
import model from "./model.js";
export function findAllAssignments(courseId) {
  return model.find({course: courseId});
}

export function deleteAssignment(assignmentID) {
  return model.deleteOne({ _id: assignmentID });
}

export function updateAssignment(assignmentID, assignmentUpdates) {
  return model.updateOne({ _id: assignmentID }, { $set: assignmentUpdates });
}

export function createAssignment(assignment) {
  delete assignment._id;
  return model.create(assignment);
}
