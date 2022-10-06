import express from 'express'
const user = express.Router();

import {getUsers, sendRequest,getPendingRequests, accept_User_Req, blockUser} from '../controllers/user/user.js';

user.get('/:id/pendingRequests', getPendingRequests)
user.get('/:id', getUsers)
user.post('/sendReq/:userID/:reqID', sendRequest)
user.post('/acceptReq/:userID/:acceptID', accept_User_Req)
user.post('/blockUser/:userId/:blockId',blockUser)

export default user;