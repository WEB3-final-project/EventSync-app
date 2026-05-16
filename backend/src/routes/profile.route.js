import express from 'express';
import { 
    getSpeakerProfile

} from '../controllers/profile.controller.js';
const profileRoute = express.Router();

profileRoute.get("/speakers/:id", getSpeakerProfile);

export default profileRoute;