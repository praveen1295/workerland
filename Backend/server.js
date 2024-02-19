const express = require("express");
const http = require("http");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { rootDir } = require("./middlewares/fileUploadMiddleware");

// Import the initSocketIO function from your controller
const { initSocketIO } = require("./controllers/socketIoController");

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

// rest object
const app = express();
const corsOptions = {
  credentials: true,
};

app.use(cors());

//middlewares
app.use(express.json());
app.use(moragan("dev"));

const path = require("path");

// Serve static files
app.use("/api/v1/static", express.static(path.join(rootDir, "PROFILEPHOTO")));
app.use("/api/v1/static", express.static(path.join(rootDir, "AADHAR")));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRouts"));
app.use("/api/v1/serviceProvider", require("./routes/serviceProviderRoutes"));
app.use("/api/v1/pushNotification", require("./routes/pushNotificationRoutes"));

// Create a server using http module
const server = http.createServer(app);

// Initialize Socket.IO passing the server instance
initSocketIO(server);

// Set the port
const port = process.env.PORT || 8000;

// Listen on the server instead of the app
server.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
