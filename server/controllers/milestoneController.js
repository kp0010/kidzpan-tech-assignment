import { getMilestonesForChild, addCustomMilestone } from "../models/milestoneModel.js"

export const getRelevantMilestones = async (req, res, next) => {
	try {
		const childId = req.params.child_id

		if (isNaN(childId)) {
			const err = new Error("Invalid child ID");
			err.status = 400;
			throw err;
		}

		const milestones = await getMilestonesForChild(childId)

		res.status(200).json({
			success: "success",
			message: "Retrieved Milestones Succesfully",
			data: milestones
		})

	} catch (err) {
		next(err)
	}
}

export const putCustomMilestone = async (req, res, next) => {
	try {
		const childId = parseInt(req.params.child_id)
		const { title, description } = req.body

		if (!title || !description || !childId) {
			const err = new Error("Invalid Fields: title, description, childId")
			err.status = 400
			throw err
		}

		const milestone = await addCustomMilestone(title, description, childId)

		res.status(200).json({
			success: "success",
			message: "Added Milestone Successfully",
			data: milestone
		})

	} catch (err) {
		next(err)
	}
}
