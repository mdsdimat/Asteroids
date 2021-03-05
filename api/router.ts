import { Router } from 'express';
import { getThemes, getTheme, changeTheme } from './controllers/theme';
import { addFeedback } from './controllers/feedback';

const router: Router = Router();

router.get('/themes', getThemes);
router.get('/user/theme', getTheme);
router.post('/user/theme', changeTheme);

router.post('/feedback', addFeedback);

export default router;
