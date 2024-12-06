import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

import bodyParser from "body-parser";




mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
const app = express();

// Configure allowed origins (frontend and backend)
const allowedOrigins = [
  // "http://localhost:3000", // Local React development
  process.env.NETLIFY_URL || "https://a6--kanbas-web-dev-project.netlify.app/#/Kanbas/Account/Signin", 
];

// Configure CORS
app.use(
  cors({
    credentials: true, // Allow cookies/auth headers
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        console.error("Blocked by CORS:, ${origin}"); // Log blocked origins
        callback(new Error("Not allowed by CORS")); // Block other origins
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Minimal headers
  })
);

// Automatically handle OPTIONS requests for preflight
app.options("*", cors());

// Body parser to handle JSON payloads
app.use(bodyParser.json());

// Unified session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super secret session phrase", // Secret for signing session ID
    resave: false, // Avoid unnecessary session saves
    saveUninitialized: false, // Only create session when needed
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS-only cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-origin cookies in production
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.NODE_SERVER_DOMAIN ||
            "kanbas-node-project-qqb4.onrender.com" // Backend domain for production
          : undefined, 
    },
    proxy: process.env.NODE_ENV === "production", // Trust reverse proxies in production
  })
);


app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
Hello(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);
