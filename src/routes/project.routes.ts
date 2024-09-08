import { Router } from 'express';
import { addProject, updateProject, listProjects, removeProject, fetchProjectsByTag } from '../controllers/project.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.post('/add', authenticate, authorize(['client']), addProject);
router.put('/update/:id', authenticate, authorize(['client']), updateProject);
router.get('/list', authenticate, listProjects);
router.delete('/remove/:id', authenticate, authorize(['client']), removeProject);
router.get('/tags/:tag', authenticate, fetchProjectsByTag);

export default router;
