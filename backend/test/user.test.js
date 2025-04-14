const request = require('supertest');
const app = require('../index');

describe('User Registration API', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/auth/user/register')
      .send({
        name: "Test User",
        email: `testuser${Date.now()}@example.com`,
        password: "test1234",
        phone: "1234567890",
        role: "client",
        address: "123 Test Street",
        city: "Toronto"
      });

    console.log(res.body); // Optional: helps debug response
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true); // Your API returns { success, authToken }
    expect(res.body).toHaveProperty("authToken");
  });

  it('should fail to register with missing fields', async () => {
    const res = await request(app)
      .post('/auth/user/register')
      .send({
        email: "",
        password: ""
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});

const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});
