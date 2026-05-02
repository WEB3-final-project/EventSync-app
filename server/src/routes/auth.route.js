import express from 'express';
import { 
    loginUser,
    createUser ,
    getUser ,
    deleteUserPermanently ,
    deleteUserTemporarily

} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const authRoute = express.Router();
    
authRoute.post("/signup", createUser);
authRoute.post("/login", loginUser);
authRoute.get("/me",authMiddleware, getUser);
authRoute.delete("/user/:id", authMiddleware, deleteUserPermanently);
authRoute.delete("/user/temp/:id", authMiddleware, deleteUserTemporarily);

export default authRoute;