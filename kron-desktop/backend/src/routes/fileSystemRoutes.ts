import express from 'express';
import { getFileStructure, checkExplorerEnabled } from '../controllers/fileSystemController';

const router = express.Router();

// Apply explorer enabled check to all filesystem routes
router.use(checkExplorerEnabled);

router.get('/structure', getFileStructure);

export default router;
