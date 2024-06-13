import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recevierId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recevierId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recevierId],
      });
    }

    const newMessage = new Message({ senderId, recevierId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Get receiver socket ID
    const recevierSocketId = getReciverSocketId(recevierId);

    // Emit the new message to the receiver if they are online
    if (recevierSocketId) {
      io.to(recevierSocketId).emit("newMessage", newMessage);
    }

    res.status(200).send({ message: "Message", data: newMessage });
  } catch (error) {
    console.log("Error in Send message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: recevierId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recevierId] },
    }).populate("messages");

    res.send({ message: "Messages", data: conversation.messages });
  } catch (error) {
    console.log("Error in Get message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
