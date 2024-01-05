import express, { Router } from 'express';
import userRoute from './user.route';
import morgan from 'morgan';

const router: Router = express.Router();

router.use(morgan('dev'));

router.use('/user', userRoute);

export default router;
