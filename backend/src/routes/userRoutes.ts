import {Router, type Router as ExpressRouter} from "express";
import{
    login,
    register,
    refresh,
    logout,
    getDivisi,
    getWawancara,
    validate,
    requestPasswordReset,
    resetPassword,
    getAllUsersAndTheirFilteredTugas,
    updateUserDivisionAcceptance,
    getUserDiterimaDimana
} from "@/controllers/userControllers";
import { authenticateToken } from "@middlewares/auth";

const router: ExpressRouter = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

router.get('/validate', authenticateToken, validate);
router.get('/refresh', refresh);
router.get('/divisi', authenticateToken, getDivisi);
router.get('/wawancara', authenticateToken, getWawancara);

router.post('/adminonly/admin', authenticateToken, updateUserDivisionAcceptance);
router.get('/adminonly/admin', authenticateToken, getAllUsersAndTheirFilteredTugas);
router.get('/user/pengumuman', authenticateToken, getUserDiterimaDimana);
export default router;