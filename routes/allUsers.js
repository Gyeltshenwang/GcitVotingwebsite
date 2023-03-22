import express from 'express';
import  { getUsers } from '../controllers/allUsers.js'

const allUsers = express.Router();
allUsers.get('/',getUsers);


export default allUsers;