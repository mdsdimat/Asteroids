import { Router } from 'express';
import { addTopicPost, addTopic, getTopicPosts, getTopics } from './controllers/forum';
import { getThemes, getTheme, changeTheme } from './controllers/theme';
import { addFeedback } from './controllers/feedback';

const router: Router = Router();

router.get('/themes', getThemes);
router.get('/user/theme', getTheme);
router.post('/user/theme', changeTheme);

router.post('/feedback', addFeedback);

router.get('/forum/topics', getTopics);
router.get('/forum/posts', getTopicPosts);
router.post('/forum/topic', addTopic);
router.post('/forum/posts', addTopicPost);

export default router;
