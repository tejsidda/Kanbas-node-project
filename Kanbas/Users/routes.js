// import * as dao from "./dao.js";
// import * as courseDao from "../Courses/dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";

// export default function UserRoutes(app) {
//   const createUser = (req, res) => {};
//   const deleteUser = (req, res) => {};
//   const findAllUsers = (req, res) => {};
//   const findUserById = (req, res) => {};

//   const createCourse = (req, res) => {
//     const currentUser = req.session["currentUser"];
//     const newCourse = courseDao.createCourse(req.body);
//     enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
//     res.json(newCourse);
//   };

//   const findCoursesForEnrolledUser = (req, res) => {
//     let { userId } = req.params;
//     if (userId === "current") {
//       const currentUser = req.session["currentUser"];
//       if (!currentUser) {
//         res.sendStatus(401);
//         return;
//       }
//       userId = currentUser._id;
//     }
//     const courses = courseDao.findCoursesForEnrolledUser(userId);
//     res.json(courses);
//   };

//   const updateUser = (req, res) => {
//     const userId = req.params.userId;
//     const userUpdates = req.body;
//     dao.updateUser(userId, userUpdates);
//     const currentUser = dao.findUserById(userId);
//     req.session["currentUser"] = currentUser;
//     res.json(currentUser);
//   };

//   const signup = (req, res) => {
//     const user = dao.findUserByUsername(req.body.username);
//     if (user) {
//       res.status(400).json({ message: "Username already in use" });
//       return;
//     }
//     const currentUser = dao.createUser(req.body);
//     req.session["currentUser"] = currentUser;
//   };

//   const signin = (req, res) => {
//     const { username, password } = req.body;
//     const currentUser = dao.findUserByCredentials(username, password);
//     if (currentUser) {
//       req.session["currentUser"] = currentUser;
//       res.json(currentUser);
//     } else {
//       res.status(401).json({ message: "Unable to login. Try again later." });
//     }
//   };
//   const signout = (req, res) => {
//     req.session.destroy();
//     res.sendStatus(200);
//   };

//   const profile = async (req, res) => {
//     const currentUser = req.session["currentUser"];
//     if (!currentUser) {
//       res.sendStatus(401);
//       return;
//     }
//     res.json(currentUser);
//   };

//   app.post("/api/users", createUser);
//   app.get("/api/users", findAllUsers);
//   app.get("/api/users/:userId", findUserById);
//   app.put("/api/users/:userId", updateUser);
//   app.delete("/api/users/:userId", deleteUser);
//   app.post("/api/users/signup", signup);
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signout", signout);
//   app.post("/api/users/profile", profile);
//   app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
//   app.post("/api/users/create/courses", createCourse);
// }
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {};
  const findUserById = (req, res) => {};

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    const { userId } = req.params;

    // Fetch all enrollments for the user
    const userEnrollments = enrollmentsDao.enrollments().filter(
      (enrollment) => enrollment.user === userId
    );

    // Get course IDs for the user
    const enrolledCourseIds = userEnrollments.map((enrollment) => enrollment.course);

    // Fetch the courses from the courseDao based on enrolled course IDs
    const courses = enrolledCourseIds.map((courseId) =>
      courseDao.findCourseById(courseId)
    );

    res.json(courses);
  };

  const enrollUserInCourse = (req, res) => {
    const { userId } = req.params;
    const { courseId } = req.body;

    if (!userId || !courseId) {
      res.status(400).json({ error: "userId and courseId are required" });
      return;
    }

    enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollmentsDao.enrollUserInCourse(userId, courseId))
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
      res.status(400).json({ error: "userId and courseId are required" });
      return;
    }

    enrollmentsDao.unenrollUserInCourse(userId, courseId);
    res.status(200).json({ message: "User unenrolled successfully" });
  };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/create/courses", createCourse);

  // New Routes for Enrollment
  app.post("/api/users/:userId/enrollments", enrollUserInCourse); // Enroll user in a course
  app.delete("/api/users/:userId/enrollments/:courseId", unenrollUserFromCourse); // Unenroll user from a course
}
