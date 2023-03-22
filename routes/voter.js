import express from 'express';
import { isLoggedIn } from '../middleware/auth.js';
import { getSubmit, getViewCv, getVotingPage,postVotingPage} from '../controllers/voters/voter.js';
import { getWinner } from '../controllers/voters/winner.js';


const voterRoutes = express.Router();
voterRoutes.get('/voters', isLoggedIn, getVotingPage);

//voterRoutes.get('/voters/:id', isLoggedIn, getVotingPage);
//voterRoutes.patch('/voters/:id', isLoggedIn, postVotingPage);
//voterRoutes.get('/voters/:id', isLoggedIn, postVotingPage);
//voterRoutes.get('/voters/:id', isLoggedIn, updateVotingPage);
voterRoutes.post('/voters', isLoggedIn, postVotingPage);
voterRoutes.get('/submit', isLoggedIn, getSubmit)
voterRoutes.get('/winner', isLoggedIn, getWinner)
// voterRoutes.get('/cv/:id',isLoggedIn,getViewCv)
// voterRoutes.get('/voters/:id', isLoggedIn, castVote);
// voterRoutes.get('/voters/chief/:id', isLoggedIn, castVoteforChief);
// voterRoutes.post('/voters/chief/:id', isLoggedIn, castVoteforChief);

export default voterRoutes;