import express, { Router } from 'express';
import { Insert, Get, Update, Delete } from '../controller/user.controller';

const router: Router = express.Router();

router.get('/', Get);
router.post('/', Insert);
router.put('/:id', Update);
router.delete('/:id', Delete);

export default router;
