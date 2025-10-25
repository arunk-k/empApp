require('dotenv').config()
const express = require('express')

const server = express()

const cors = require('cors')

const employeeRoutes = require("./routes/routes");

const connectDB=require('./connect/dbConnect')

connectDB()

server.use(cors())

server.use(express.json())

server.use("/api/employees", employeeRoutes);

const PORT =process.env.PORT ||  3000 

server.listen(PORT, () => console.log("Server running at http://localhost:" + PORT))


