import express from "express"

import milestonesRouter from "./routes/milestoneRoutes.js"
import progressRouter from "./routes/progressRoutes.js"
import errorHandler from "./middleware/errorHandler.js"


const app = express()

app.use(express.json())

app.use("/milestones", milestonesRouter)
app.use("/progress", progressRouter)

app.use(errorHandler)

export default app
