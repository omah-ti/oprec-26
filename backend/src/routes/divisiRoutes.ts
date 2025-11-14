import {Router, type Router as ExpressRouter} from "express";
import{
    pilihDivisi,
    getAllDivisi,
    getOneDivisi
} from "@/controllers/divisiControllers";
import{
    submitPenugasan,
    updateTugas,
    existingSubmission
} from "@controllers/penugasanControllers"
import { authenticateToken } from "@middlewares/auth";

const router: ExpressRouter = Router();

router.post('/:slug/choose', authenticateToken, pilihDivisi);
router.post('/:slug/submit', authenticateToken, submitPenugasan);
router.put('/:id/update', authenticateToken, updateTugas);

router.get('/', authenticateToken, getAllDivisi);
router.get('/:slug', authenticateToken, getOneDivisi);
router.get('/:slug/penugasan', authenticateToken, existingSubmission);

export default router;