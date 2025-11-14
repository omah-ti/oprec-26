import { Router } from 'express';
import {
    pilihWaktuWawancaraOti,
    pilihWaktuWawancaraHima,
    getAllWawancara
} from '@controllers/wawancaraControllers';
import { authenticateToken } from '@middlewares/auth';
import { sudahMemilihOti, sudahMemilihHima } from '@middlewares/sudahMemilih';
import { sudahMengumpulkanOti, sudahMengumpulkanHima } from '@middlewares/sudahMengumpulkan';

const router = Router();

router.post('/oti/:wawancaraId', authenticateToken, sudahMemilihOti, sudahMengumpulkanOti, pilihWaktuWawancaraOti);
router.post('/hima/:wawancaraId', authenticateToken, sudahMemilihHima, sudahMengumpulkanHima, pilihWaktuWawancaraHima);

router.get('/', getAllWawancara);
export default router;