import { getMilestonesForChild, addCustomMilestone } from "../models/milestoneModel.js"
import { PostgresError } from "pg-error-enum";

export const getRelevantMilestones = async (req, res, next) => {
	try {
		const childId = req.params.child_id

		if (isNaN(childId)) {
			const err = new Error("Invalid child ID");
			err.status = 400;
			throw err;
		}

		const milestones = await getMilestonesForChild(childId)

		if (milestones.length == 0) {
			const err = new Error("Child not found");
			err.status = 404;
			throw err;
		}
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
		if (!req.body) {
			const err = new Error("Missing Payload Body")
			err.status = 400;
			throw err;
		}

		const childId = parseInt(req.params.child_id)
		const { title, description } = req.body

		if (!title || !description || !childId) {
			const invalidFields = []

			if (!title) invalidFields.push("title")
			if (!description) invalidFields.push("description")
			if (!childId) invalidFields.push("childId")

			const err = new Error(`Invalid Field(s): ${invalidFields.join(", ")}`)
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
		if (err.code == PostgresError.FOREIGN_KEY_VIOLATION) {
			const newErr = new Error("Child not found")
			newErr.status = 404
			next(newErr)
		} else {
			next(err)
		}
	}
}
