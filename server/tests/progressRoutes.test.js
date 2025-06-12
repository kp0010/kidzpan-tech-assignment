import request from "supertest";
import app from "../app";

describe('POST /progress/', () => {
	const validChildId = 1
	const unknownChildId = 999

	const validMilestoneId = 8
	const unknownMilestoneId = 999

	const validPayload = {
		"childId": validChildId,
		"milestoneId": validMilestoneId,
		"status": "complete"
	}

	it('should update and mark the progress correctly and return 200', async () => {
		const res = await request(app)
			.post('/progress')
			.send(validPayload)
			.set('Accept', 'application/json')

		expect(res.statusCode).toBe(200)
		expect(res.body).toBeInstanceOf(Object)
		expect(res.body).toHaveProperty("data")
		expect(res.body["data"]).toBeInstanceOf(Object)
	})


	it('should return 404 for childId not being present in the database', async () => {
		const res = await request(app)
			.post('/progress')
			.send({
				...validPayload,
				childId: unknownChildId
			})
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(404)
		expect(res.body.error.message).toBe("Child not found")
	})

	it('should return 404 for milestoneId not being present in the database', async () => {
		const res = await request(app)
			.post('/progress')
			.send({
				...validPayload,
				milestoneId: unknownMilestoneId
			})
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(404)
		expect(res.body.error.message).toBe("Milestone not found")
	})

	it('should return 400 for missing payload', async () => {
		const res = await request(app).post('/progress/')

		expect(res.statusCode).toEqual(400)
		expect(res.body.error.message).toBe("Missing Payload Body")
	})

	it('should return 400 for invalid childId and milestoneId and status', async () => {
		const res = await request(app)
			.post('/progress')
			.send({
				childId: "invalidString",
				milestoneId: "invalidString",
				status: "invalidStatus"
			})
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(400)
		expect(res.body.error.message).toBe("Invalid Field(s): childId, milestoneId, status")
	})
})
