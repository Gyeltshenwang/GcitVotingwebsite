import express from 'express';
import { isLoggedIn } from '../middleware/auth.js';
import { viewResults } from '../controllers/voters/results.js';

const results = express.Router();
results.get('/results', isLoggedIn, viewResults);

//voterRoutes.get('/voters/:id', isLoggedIn, getVotingPage);
//voterRoutes.patch('/voters/:id', isLoggedIn, postVotingPage);
//voterRoutes.get('/voters/:id', isLoggedIn, postVotingPage);
//voterRoutes.get('/voters/:id', isLoggedIn, updateVotingPage);
// voterRoutes.post('/voters', isLoggedIn, postVotingPage);
// voterRoutes.get('/voters/:id', isLoggedIn, castVote);
// voterRoutes.get('/voters/chief/:id', isLoggedIn, castVoteforChief);
// voterRoutes.post('/voters/chief/:id', isLoggedIn, castVoteforChief);

export default results;


