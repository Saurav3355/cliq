const request = require('supertest');
const app = require('../index'); // make sure this exports only the app

describe('Employee API', () => {
  // Test: Add employee successfully
  it('should add a new employee successfully', async () => {
    const res = await request(app)
      .post('/api/employee/add')
      .send({
        first_name: "John",
        last_name: "Doe",
        age: 30,
        date_of_join: "2024-01-01",
        title: "Software Engineer",
        department: "Engineering",
        employee_type: "Full-Time"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/employee added/i);
  });

  // Test: Add employee with missing fields
  it('should fail to add employee with missing fields', async () => {
    const res = await request(app)
      .post('/api/employee/add')
      .send({
        first_name: "", // missing required fields
        age: 25
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });

  // Test: Get all employees
  it('should fetch all employee records', async () => {
    const res = await request(app)
      .get('/api/employee/show');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // assuming response is an array
  });
});

const mongoose = require('mongoose');
afterAll(async () => {
  await mongoose.connection.close();
});
