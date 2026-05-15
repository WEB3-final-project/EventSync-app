import express from 'express';
import { 
    loginUser,
    createUser ,
    getUser ,
    deleteUserPermanently ,
    deleteUserTemporarily,
    logoutUser,
    checkToken

} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const authRoute = express.Router();
    
authRoute.post("/signup", createUser);
authRoute.post("/login", loginUser);
authRoute.get("/me",authMiddleware, getUser);
authRoute.delete("/user/:id", authMiddleware, deleteUserPermanently);
authRoute.delete("/user/temp/:id", authMiddleware, deleteUserTemporarily);
authRoute.delete("/logout/:id", authMiddleware, logoutUser);
authRoute.post("/token/refresh", checkToken);

export default authRoute;