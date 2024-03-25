import express from 'express';
import { Route, Req, Res, Next } from "../types/serverPackageTypes";
import { userRegister } from "../controllers/userController";

const userRouter: Route = express.Router();

userRouter.post('/register', async (req: Req, res: Res, next: Next) => {
    await userRegister(req, res, next);
});

export default userRouter;
