import express from "express"
import { test } from "../controllers/test"
import { auth } from "../middlewares/supabase_auth";


const router = express.Router();

router.get('/', test);
router.get('/private', auth, test);



export default router