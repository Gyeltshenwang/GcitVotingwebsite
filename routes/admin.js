import express from 'express';
 import { isLoggedIn } from '../middleware/auth.js';
import { createAdimPage, getAdminPage, updateEmail, DeleteCannidates, getEditCannidates, postUpdateCannidates } from '../controllers/admin/admin.js';
import { getCannidates,  postCannidates, upload } from '../controllers/admin/addCannidates.js';
const adminRoute = express.Router();

adminRoute.get('/admin',isLoggedIn, getAdminPage);
adminRoute.post('/admin',isLoggedIn, createAdimPage);
adminRoute.patch('/admin/:id', isLoggedIn, updateEmail);
 adminRoute.get('/admin/edit/:id', isLoggedIn, getEditCannidates);
adminRoute.post('/admin/update/:id', isLoggedIn, postUpdateCannidates );
adminRoute.get('/admin/:id', isLoggedIn, DeleteCannidates);
adminRoute.delete('/admin/:id', isLoggedIn, DeleteCannidates);

adminRoute.get('/addCannidatesDetails', isLoggedIn, getCannidates)
adminRoute.post('/addCannidatesDetails',upload,postCannidates)
export default adminRoute;