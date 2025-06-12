import db from "../db/index.js";

export const markProgress = async (child_id, milestone_id, status) => {
	const query = `
		INSERT INTO 
			child_milestones_progress (child_id, milestone_id, status, updated_at)
				VALUES ($1, $2, $3, NOW())	
			ON CONFLICT (child_id, milestone_id)
			DO UPDATE SET status = $3, updated_at = NOW()
			RETURNING *;
	`

	const result = await db.query(query, [child_id, milestone_id, status])
	return result.rows[0]
}
