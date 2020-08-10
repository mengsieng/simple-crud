const supertest = require('supertest')

const app = require('../src/app')

describe('App', () => {
    test('The app is running on port 3030', async () => {
        const response = await supertest(app).get('/')
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body.message).toEqual(project.message)
    })
})