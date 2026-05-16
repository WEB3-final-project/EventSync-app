import express from 'express';
import { 
    loginUser,
    createUser ,
    deleteUserPermanently ,
    deleteUserTemporarily,
    logoutUser,
    checkToken

} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from "../middlewares/upload.middleware.js";
const authRoute = express.Router();

authRoute.post("/signup", upload.single("profilePicture"), createUser);
authRoute.post("/login", loginUser);
authRoute.delete("/user", authMiddleware, deleteUserPermanently);
authRoute.delete("/user/temp", authMiddleware, deleteUserTemporarily);
authRoute.delete("/logout", authMiddleware, logoutUser);
authRoute.post("/auth/refresh", checkToken);

export default authRoute;