import { Route,Req,Res,Next } from "../types/serverPackageTypes";

import { userRegister } from "../controllers/userController";



const userRouter: Route = express.Router();


userRouter.post('/register',async(req:Req ,res:Res ,Next:Next)=>{
    await userRegister(req,res,Next)
})