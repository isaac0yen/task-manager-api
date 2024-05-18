const fs = require("fs");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const middleware = require("./middleware/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const { mySQLConnect } = require("./helpers/mySQL");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

const docs = fs.readFileSync("./docs.json", "utf-8");

// Initialize swagger-jsdoc with the parsed JSON content
const swaggerSpec = swaggerJsdoc({ definition: JSON.parse(docs), apis: [] });

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Make io available in request context
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve Swagger UI with Express
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes);
app.use("/tasks_api", middleware, taskRoutes);
app.use("/users_api", middleware, userRoutes);

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => { // Change app.listen to server.listen
  await mySQLConnect();
  console.log(`Server is running on port ${PORT} \n go to http://localhost:3000/api-docs for documentation.`);
});
