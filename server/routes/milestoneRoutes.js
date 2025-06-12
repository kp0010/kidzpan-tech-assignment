import { Router } from "express";

import { getRelevantMilestones, putCustomMilestone } from "../controllers/milestoneController.js";

const milestonesRouter = Router()

milestonesRouter.get("/:child_id", getRelevantMilestones)
milestonesRouter.put("/custom/:child_id", putCustomMilestone)

export default milestonesRouter
