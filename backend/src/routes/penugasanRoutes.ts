import { Router } from 'express';
import { 
    submitPenugasan, 
    updateTugas, 
    existingSubmission 
} from '@controllers/penugasanControllers';
import { authenticateToken } from '@middlewares/auth';

const router = Router();

// Check if user already submitted assignment for a division
router.get('/check/:slug', authenticateToken, existingSubmission);

// Submit new assignment
router.post('/submit/:slug', authenticateToken, submitPenugasan);

// Update existing assignment
router.put('/update/:id', authenticateToken, updateTugas);

export default router;
