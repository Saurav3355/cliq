const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

let token = '';
let categoryId = '';

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/auth/user/login')
    .send({
      email: 'vishal@gmail.com',
      password: 'hello1232'
    });

  console.log("\n✅ [Login Attempt] Trying to login as user for authentication...");
  console.log("🔐 Login Response:", loginRes.body);

  if (loginRes.body.success && loginRes.body.authToken) {
    token = loginRes.body.authToken; // No Bearer
    console.log("✅ [Auth Success] Token saved for future authorized requests.\n");
  } else {
    throw new Error("❌ Token not received during login");
  }
});

describe('Category API (auto-login)', () => {
  it('should fail to add a category with missing fields', async () => {
    const res = await request(app)
      .post('/api/category/add')
      .set('auth-token', token)
      .send({ name: "Incomplete Category" });

    console.log("✅ [Test: Add Category - Missing Fields]");
    console.log("Expected: 400 Bad Request | Received:", res.statusCode);
    console.log("Server Response:", res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should add a new category successfully', async () => {
    const res = await request(app)
      .post('/api/category/add')
      .set('auth-token', token)
      .send({
        name: `Test Category ${Date.now()}`,
        description: "This is a test category"
      });

    console.log("✅ [Test: Add Valid Category]");
    console.log("Expected: 200 OK | Received:", res.statusCode);
    console.log("Category Added:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    categoryId = res.body.category?._id;
  });

  it('should get all categories', async () => {
    const res = await request(app).get('/api/category/show');

    console.log("✅ [Test: Get All Categories]");
    console.log("Expected: 200 OK and array of categories | Received:", res.statusCode);
    console.log("Category List Sample:", res.body.data?.[0]);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should fetch category by ID', async () => {
    const res = await request(app)
      .get(`/api/category/getedititem/${categoryId}`)
      .set('auth-token', token);

    console.log("✅ [Test: Get Category by ID]");
    console.log("Expected: 200 OK and valid category object | Received:", res.statusCode);
    console.log("Fetched Category:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update the category', async () => {
    const res = await request(app)
      .put(`/api/category/updatecategory/${categoryId}`)
      .set('auth-token', token)
      .send({
        name: "Updated Category",
        description: "Updated Description"
      });

    console.log("✅ [Test: Update Category]");
    console.log("Expected: 200 OK and success true | Received:", res.statusCode);
    console.log("Update Response:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should delete the category', async () => {
    const res = await request(app)
      .delete(`/api/category/deletecategory/${categoryId}`)
      .set('auth-token', token);

    console.log("✅ [Test: Delete Category]");
    console.log("Expected: 200 OK and success true | Received:", res.statusCode);
    console.log("Delete Response:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
