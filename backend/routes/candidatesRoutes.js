import express from 'express';
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
import {addCandidate, getAllCandidates, deleteCandidate, getAllSelected, acceptCandidate, DoneSelectedCandidates} from '../controllers/CandidateController.js';

router.post("/candidate-apply", protectRoute, addCandidate);
router.get("/get-all-candidates", protectRoute, getAllCandidates);
router.post("/Shortlisted-candidates", protectRoute, acceptCandidate);
router.delete("/Delete-candidates/:id", protectRoute, deleteCandidate);
router.get("/all-selected-candidates", protectRoute, getAllSelected);
router.delete("/Done-selected-candidates/:id", protectRoute, DoneSelectedCandidates);
export default router;