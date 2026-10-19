// jest.mock("../models/user", () => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
//   findById: jest.fn(),
// }));

// jest.mock("bcryptjs", () => ({
//   hash: jest.fn(),
//   compare: jest.fn(),
// }));

// const request = require("supertest");
// const app = require("../index");
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");

// describe("TripVault authentication API", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     process.env.JWT_SECRET = "test-secret-for-automated-tests";
//   });

//   test("registers a user with a username", async () => {
//     User.findOne.mockResolvedValue(null);
//     bcrypt.hash.mockResolvedValue("hashed-password");

//     User.create.mockResolvedValue({
//       _id: "user123",
//       name: "Test User",
//       username: "test_user",
//       email: "test@example.com",
//     });

//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Test User",
//         username: "test_user",
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(201);
//     expect(response.body.user.username).toBe("test_user");
//     expect(User.create).toHaveBeenCalledWith(
//       expect.objectContaining({
//         username: "test_user",
//         email: "test@example.com",
//         password: "hashed-password",
//       })
//     );
//   });

//   test("rejects registration when required fields are missing", async () => {
//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Test User",
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(400);
//     expect(User.create).not.toHaveBeenCalled();
//   });

//   test("rejects a duplicate email", async () => {
//     User.findOne.mockResolvedValueOnce({
//       email: "test@example.com",
//     });

//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Test User",
//         username: "test_user",
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(409);
//     expect(User.create).not.toHaveBeenCalled();
//   });

//   test("logs in a user with valid credentials", async () => {
//     User.findOne.mockResolvedValue({
//       _id: { toString: () => "user123" },
//       name: "Test User",
//       username: "test_user",
//       email: "test@example.com",
//       password: "hashed-password",
//     });

//     bcrypt.compare.mockResolvedValue(true);

//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Login successful");
//     expect(response.body.token).toEqual(expect.any(String));
//     expect(response.body.user.username).toBe("test_user");
//   });

//   test("rejects an incorrect password", async () => {
//     User.findOne.mockResolvedValue({
//       _id: { toString: () => "user123" },
//       name: "Test User",
//       username: "test_user",
//       email: "test@example.com",
//       password: "hashed-password",
//     });

//     bcrypt.compare.mockResolvedValue(false);

//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "test@example.com",
//         password: "wrong-password",
//       });

//     expect(response.status).toBe(401);
//     expect(response.body.message).toBe("Invalid email or password");
//   });
// });


// jest.mock("../models/user", () => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
//   findById: jest.fn(),
// }));

// jest.mock("bcryptjs", () => ({
//   hash: jest.fn(),
//   compare: jest.fn(),
// }));

// const request = require("supertest");
// const app = require("../index");
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");

// describe("TripVault authentication API", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     process.env.JWT_SECRET = "test-secret-for-automated-tests";
//   });

//   test("registers a user with a username", async () => {
//     User.findOne.mockResolvedValue(null);

//     bcrypt.hash.mockResolvedValue("hashed-password");

//     User.create.mockResolvedValue({
//       _id: "user123",
//       name: "Test User",
//       username: "test_user",
//       email: "test@example.com",
//     });

//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Test User",
//         username: "test_user",
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(201);
//     expect(response.body.user.username).toBe("test_user");

//     expect(User.create).toHaveBeenCalledWith(
//       expect.objectContaining({
//         username: "test_user",
//         email: "test@example.com",
//         password: "hashed-password",
//       })
//     );
//   });

//   test("rejects registration when required fields are missing", async () => {
//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Test User",
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(400);
//     expect(User.create).not.toHaveBeenCalled();
//   });

//   test("rejects a duplicate email", async () => {
//     User.findOne.mockResolvedValueOnce({
//       email: "test@example.com",
//     });

//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Test User",
//         username: "test_user",
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(409);
//     expect(response.body.message).toBe(
//       "An account with this email already exists"
//     );
//     expect(User.create).not.toHaveBeenCalled();
//   });

//   test("rejects a username that is already taken", async () => {
//     User.findOne
//       .mockResolvedValueOnce(null)
//       .mockResolvedValueOnce({
//         username: "test_user",
//       });

//     const response = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Another User",
//         username: "test_user",
//         email: "another@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(409);
//     expect(response.body.message).toBe(
//       "Username is already taken"
//     );
//     expect(User.create).not.toHaveBeenCalled();
//   });

//   test("logs in a user with valid credentials", async () => {
//     User.findOne.mockResolvedValue({
//       _id: { toString: () => "user123" },
//       name: "Test User",
//       username: "test_user",
//       email: "test@example.com",
//       password: "hashed-password",
//     });

//     bcrypt.compare.mockResolvedValue(true);

//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "test@example.com",
//         password: "password123",
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Login successful");
//     expect(response.body.token).toEqual(expect.any(String));
//     expect(response.body.user.username).toBe("test_user");
//   });

//   test("rejects an incorrect password", async () => {
//     User.findOne.mockResolvedValue({
//       _id: { toString: () => "user123" },
//       name: "Test User",
//       username: "test_user",
//       email: "test@example.com",
//       password: "hashed-password",
//     });

//     bcrypt.compare.mockResolvedValue(false);

//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "test@example.com",
//         password: "wrong-password",
//       });

//     expect(response.status).toBe(401);
//     expect(response.body.message).toBe(
//       "Invalid email or password"
//     );
//   });

//   test("rejects login when credentials are missing", async () => {
//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "test@example.com",
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe(
//       "Email and password are required"
//     );
//   });
// });


jest.mock("../models/user", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const request = require("supertest");
const app = require("../index");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

describe("TripVault authentication API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret-for-automated-tests";
  });

  test("registers a user with a username", async () => {
    User.findOne.mockResolvedValue(null);

    bcrypt.hash.mockResolvedValue("hashed-password");

    User.create.mockResolvedValue({
      _id: "user123",
      name: "Test User",
      username: "test_user",
      email: "test@example.com",
    });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        username: "test_user",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(201);
    expect(response.body.user.username).toBe("test_user");

    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "test_user",
        email: "test@example.com",
        password: "hashed-password",
      })
    );
  });

  test("rejects registration when required fields are missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(400);
    expect(User.create).not.toHaveBeenCalled();
  });

  test("rejects a duplicate email", async () => {
    User.findOne.mockResolvedValueOnce({
      email: "test@example.com",
    });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        username: "test_user",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "An account with this email already exists"
    );

    expect(User.create).not.toHaveBeenCalled();
  });

  test("rejects a username that is already taken", async () => {
    User.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        username: "test_user",
      });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Another User",
        username: "test_user",
        email: "another@example.com",
        password: "password123",
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "Username is already taken"
    );

    expect(User.create).not.toHaveBeenCalled();
  });

  test("logs in a user with valid credentials using an HttpOnly cookie", async () => {
    User.findOne.mockResolvedValue({
      _id: { toString: () => "user123" },
      name: "Test User",
      username: "test_user",
      email: "test@example.com",
      password: "hashed-password",
    });

    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.user.username).toBe("test_user");

    // JWT must not be exposed in the response body.
    expect(response.body.token).toBeUndefined();

    // The server should establish authentication using a cookie.
    const cookies = response.headers["set-cookie"] || [];

    const authCookie = cookies.find((cookie) =>
      cookie.startsWith("tripvault_token=")
    );

    expect(authCookie).toBeDefined();
    expect(authCookie).toMatch(/HttpOnly/i);
  });

  test("rejects an incorrect password", async () => {
    User.findOne.mockResolvedValue({
      _id: { toString: () => "user123" },
      name: "Test User",
      username: "test_user",
      email: "test@example.com",
      password: "hashed-password",
    });

    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrong-password",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Invalid email or password"
    );
  });

  test("rejects login when credentials are missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Email and password are required"
    );
  });
});
