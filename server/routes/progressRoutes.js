import { Router } from "express";
import { updateProgress } from "../controllers/progressController.js"

const progressRouter = Router()

progressRouter.post("/", updateProgress)

export default progressRouter
