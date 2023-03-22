import express from 'express';
import { postLogin, postRegistered, getLogin, getRegistered, getReset, postReset,postNewPassword,getNewPassword, getVerify } from '../controllers/auth.js';
const authRouter = express.Router();
authRouter.get('/registration', getRegistered);
authRouter.post('/registration', postRegistered);
authRouter.get('/reset', getReset);
authRouter.post('/reset', postReset);
authRouter.get('/login', getLogin);
authRouter.post('/login', postLogin);
authRouter.post('/newPassword', postNewPassword);
authRouter.get('/reset/:token', getNewPassword)
authRouter.get('/verify/:emailToken',getVerify)

export default authRouter;