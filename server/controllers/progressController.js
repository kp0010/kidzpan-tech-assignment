import { markProgress } from "../models/progressModel.js";

export const updateProgress = async (req, res, next) => {
	try {
		const { childId, milestoneId, status } = req.body

		if (!childId || !milestoneId || !status) {
			const err = new Error("Invalid Fields: childId, milestoneId, status")
			err.status = 400;
			throw err;
		}

		const milestone = await markProgress(childId, milestoneId, status)

		res.status(200).json({
			success: "success",
			message: "Updated Milestone Succesfully",
			data: milestone
		})

	} catch (err) {
		next(err)
	}
}
