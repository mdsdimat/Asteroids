import { Router } from 'express';
import { getThemes, getTheme } from './controllers/theme';

const router: Router = Router();

router.get('/themes', getThemes);
router.get('/user/theme', getTheme);

export default router;
