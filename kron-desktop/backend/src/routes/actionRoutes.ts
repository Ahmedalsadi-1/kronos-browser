import { Router } from 'express';
import { actionController } from '../controllers/actionController';


const router = Router();

router.post('/execute', actionController.executeAction);

export default router;
