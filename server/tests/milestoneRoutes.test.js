import request from "supertest";
import app from "../app";

describe('GET /milestones/:child_id', () => {
	const validChildId = 1
	const unknownChildId = 999

	it('should return all relevent milestones of a child', async () => {
		const res = await request(app).get(`/milestones/${validChildId}`)

		expect(res.statusCode).toBe(200)
		expect(res.body).toBeInstanceOf(Object)
		expect(res.body).toHaveProperty("data")
		expect(res.body["data"]).toBeInstanceOf(Array)
	})

	it('should return 404 for childId not being present in the database', async () => {
		const res = await request(app).get(`/milestones/${unknownChildId}`)

		expect(res.statusCode).toEqual(404)
		expect(res.body.error.message).toBe("Child not found")
	})

	it('should return 404 for invalid URL', async () => {
		const res = await request(app).get('/milestones/')

		expect(res.statusCode).toEqual(404)
	})

	it('should return 400 for invalid childId', async () => {
		const res = await request(app).get('/milestones/invalidString')

		expect(res.statusCode).toEqual(400)
		expect(res.body.error.message).toBe("Invalid child ID")
	})
})

describe('PUT /milestones/custom/:child_id', () => {
	const validChildId = 1
	const unknownChildId = 999

	const validNewMilestone = {
		"title": "Knows colors",
		"description": "Child can identify basic colors"
	}

	const invalidNewMilestone = {
		"header": "Can count till 1000",
	}

	it('should create a custom milestone for a valid childId and body', async () => {
		const res = await request(app)
			.put(`/milestones/custom/${validChildId}`)
			.send(validNewMilestone)
			.set('Accept', 'application/json')

		expect(res.statusCode).toBe(200)
		expect(res.body).toBeInstanceOf(Object)
		expect(res.body).toHaveProperty("data")
		expect(res.body["data"]).toBeInstanceOf(Object)
		expect(res.body["data"]).toHaveProperty("title", validNewMilestone["title"])
		expect(res.body["data"]).toHaveProperty("description", validNewMilestone["description"])
	})

	it('should return 404 for childId not being present in the database', async () => {
		const res = await request(app)
			.put(`/milestones/custom/${unknownChildId}`)
			.send({ title: "404 unknown child", ...validNewMilestone })
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(404)
		expect(res.body.error.message).toBe("Child not found")
	})

	it('should return 404 for invalid URL', async () => {
		const res = await request(app)
			.put('/milestones/custom/')
			.send({ title: "404 invalid URL", ...validNewMilestone })
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(404)
	})

	it('should return 400 for missing payload', async () => {
		const res = await request(app).put(`/milestones/custom/${validChildId}`)

		expect(res.statusCode).toEqual(400)
		expect(res.body.error.message).toBe("Missing Payload Body")
	})

	it('should return 400 for invalid childId', async () => {
		const res = await request(app)
			.put('/milestones/custom/invalidString')
			.send({ title: "400 invalid childId", ...validNewMilestone })
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(400)
		expect(res.body.error.message).toBe("Invalid Field(s): childId")
	})

	it('should return 400 for invalid milestone.description', async () => {
		const res = await request(app)
			.put(`/milestones/custom/${validChildId}`)
			.send(invalidNewMilestone)
			.set('Accept', 'application/json')

		expect(res.statusCode).toEqual(400)
		expect(res.body.error.message).toBe("Invalid Field(s): title, description")
	})
})
