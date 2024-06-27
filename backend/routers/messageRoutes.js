import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getConversations, getMessages, sendMessage } from '../controllers/messageController.js';

const messageRoutes=express.Router();

messageRoutes.get('/conversations', protectRoute, getConversations);
messageRoutes.get("/:otherUserId", protectRoute, getMessages);
messageRoutes.post("/", protectRoute, sendMessage);


export default messageRoutes;