import express from 'express';
import {isLoggedIn} from '../middleware/auth.js';
import { checkCannidatesAcess, createUploadCannidates, getUploadCannidates } from '../controllers/canidates.js';
const cannidatesRoute = express.Router();

cannidatesRoute.post('/cannidates', isLoggedIn, checkCannidatesAcess);
cannidatesRoute.get('/cannidates/uploadDetails',isLoggedIn, getUploadCannidates);
cannidatesRoute.post('/cannidates/uploadDetails', isLoggedIn, createUploadCannidates);

export default cannidatesRoute;