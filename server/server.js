import dotenv from "dotenv"
dotenv.config()

import express from "express"

import milestonesRouter from "./routes/milestoneRoutes.js"
import progressRouter from "./routes/progressRoutes.js"
import errorHandler from "./middleware/errorHandler.js"


const app = express()

app.use(express.json())

app.use("/milestones", milestonesRouter)
app.use("/progress", progressRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server Listening on Port ${PORT}`)
})
