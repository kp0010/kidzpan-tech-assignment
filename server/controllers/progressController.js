import { markProgress } from "../models/progressModel.js";
import { PostgresError } from "pg-error-enum";

export const updateProgress = async (req, res, next) => {
	try {
		if (!req.body) {
			const err = new Error("Missing Payload Body")
			err.status = 400;
			throw err;
		}

		const { childId: childIdStr, milestoneId: milestoneIdStr, status } = req.body
		const childId = parseInt(childIdStr)
		const milestoneId = parseInt(milestoneIdStr)

		if (
			!childId || Number.isNaN(childId) ||
			!milestoneId || Number.isNaN(milestoneId) ||
			!status || !["in_progress", "complete"].includes(status)
		) {
			const invalidFields = []

			if (!childId || Number.isNaN(childId)) invalidFields.push("childId")
			if (!milestoneId || Number.isNaN(milestoneId)) invalidFields.push("milestoneId")
			if (!status || !["in_progress", "complete"].includes(status)) invalidFields.push("status")

			const err = new Error(`Invalid Field(s): ${invalidFields.join(", ")}`)
			err.status = 400

			throw err
		}

		const milestone = await markProgress(childId, milestoneId, status)

		res.status(200).json({
			success: "success",
			message: "Updated Milestone Succesfully",
			data: milestone
		})

	} catch (err) {
		if (err.code === PostgresError.FOREIGN_KEY_VIOLATION) {
			let newErr
			if (err.constraint === "child_milestones_progress_milestone_id_fkey") {
				newErr = new Error("Milestone not found")
				newErr.status = 404
				next(newErr)
			} else if (err.constraint === "child_milestones_progress_child_id_fkey") {
				newErr = new Error("Child not found")
				newErr.status = 404
				next(newErr)
			}
		} else {
			next(err)
		}
	}
}
