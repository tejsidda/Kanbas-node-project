import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments/:courseId", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAllAssignments(courseId);
    res.send(assignments);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  });

  app.post("/api/assignments/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = dao.createAssignment(assignment);
    res.send(newAssignment);
  });

}
