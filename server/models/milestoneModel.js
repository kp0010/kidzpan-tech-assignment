import db from "../db/index.js";

export const getMilestonesForChild = async (child_id) => {
	const query = `
		SELECT m.*, cmp.status, cmp.updated_at
			FROM milestones m
			LEFT JOIN child_milestones_progress cmp
				ON m.id = cmp.milestone_id
			AND cmp.child_id = $1
			WHERE (
				m.is_custom = FALSE
				AND age_group @> (SELECT age FROM children WHERE id = $1)
			)
			OR cmp.child_id = $1;
		`

	const result = await db.query(query, [child_id])
	return result.rows
}

export const addCustomMilestone = async (title, description, child_id) => {
	const isCustom = true

	const queryMilestone = `
		INSERT INTO milestones (title, description, is_custom)
			VALUES ($1, $2, $3)
		RETURNING *
		`

	let result = await db.query(queryMilestone, [title, description, isCustom])
	const queryMilestoneResult = result.rows[0]


	const queryProgress = `
		INSERT INTO 
			child_milestones_progress (child_id, milestone_id, status, updated_at)
			VALUES ($1, $2, $3, NOW())
		RETURNING *
	`

	result = await db.query(queryProgress,
		[child_id, queryMilestoneResult["id"], "in_progress"])

	return queryMilestoneResult
}

