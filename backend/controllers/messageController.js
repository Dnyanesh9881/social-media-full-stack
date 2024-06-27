import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const sendMessage = async (req, res) => {
    const { recipientId, text } = req.body;
    const userId = req.user._id;
    try {

        let conversation = await Conversation.findOne({ participants: { $all: [recipientId, userId] } });

        if (!conversation) {
            conversation = new Conversation({
                participants: [recipientId, userId],
                lastMessage: {
                    text: text,
                    sender: userId
                }
            });
            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: userId,
            text: text
        })

        Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: text,
                    sender: userId
                }
            })
        ])

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getMessages = async (req, res) => {
    const { otherUserId } = req.params;
    const userId = req.user._id;
    try {
        const conversation = await Conversation.findOne({
            participants: { $all: [otherUserId, userId] }
        })
        if (!conversation) {
            res.status(404).json({ error: "Conversation not found" })
        }
        const messages = await Message.find({
            conversationId: conversation._id,
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getConversations = async (req, res) => {
    const userId = req.user._id;
    try {
		const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		// remove the current user from the participants array
		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);
	} catch (error) {
       res.status(500).json({error:error.message});
    }
}

export { sendMessage, getMessages, getConversations };