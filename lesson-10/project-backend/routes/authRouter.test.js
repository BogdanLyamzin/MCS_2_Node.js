import request from "supertest";

import app from "../app.js";

import User from "../db/models/User.js";

describe("test /signup route", ()=> {
    beforeAll(()=> {})

    afterAll(()=> {
        app.close();
    })

    afterEach(async ()=> {
        await User.destroy();
    })

    test("/signup with correct data", async ()=> {
        const signupData = {
            email: "user@gmail.com",
            password: "123456"
        };

        const {status, body} = await request(app).post("/api/auth/signup").send(signupData);

        expect(status).toBe(201);
        expect(body.email).toBe(signupData.email);

        const user = await User.findOne({
            where: {
                email: signupData.email
            }
        });

        expect(user).toBeTruthy();
    })
})