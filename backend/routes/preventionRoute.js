import express from "express"
import { createPrevention, updatePrevention, getAllPreventions, getPreventionByID, deletePrevention } from "../controllers/preventionController.js"
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

router.post("/prevention", isAdmin, createPrevention)
router.put("/prevention/:id", updatePrevention)
router.get("/prevention", getAllPreventions)
router.get("/prevention/:id", isAdmin, getPreventionByID)
router.delete("/prevention/:id", isAdmin, deletePrevention)

export default router
