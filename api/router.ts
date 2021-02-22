import { Router } from 'express';
import { getThemes } from './controllers/theme';

const router: Router = Router();

router.get('/themes', getThemes);

export default router;
