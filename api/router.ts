import { Router } from 'express';
import { getThemes, getTheme, changeTheme } from './controllers/theme';
const router: Router = Router();

router.get('/themes', getThemes);
router.get('/user/theme', getTheme);
router.post('/user/theme', changeTheme);

export default router;
