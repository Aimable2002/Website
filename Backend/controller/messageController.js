import express from 'express';
import Conversation from '../Model/conversationModel.js';
import Message from '../Model/messageModel.js';
import { getRecievedSocketId, io } from '../socket/socket.io.js';


export const sendMessages = async (req, res) => {
    try{
        const {message} = req.body;
        //console.log('messages :', message)
        const {id: senderId} = req.user;
        //console.log('senderId :', senderId)
        const {id: recieverId} = req.params;
        //console.log('recieverId :', recieverId)

        if(!message || !senderId || !recieverId){
            return res.status(409).json('no data presented')
        }
        if(!senderId){
            return res.status(409).json('senderId is missing')
        }
        if(!recieverId){
            return res.status(409).json('recieverid is missing')
        }

        let existConversation = await Conversation.findOne({participants: {$all: [senderId, recieverId]}})

        if(!existConversation){
            existConversation = await Conversation.create({
                participants: [senderId, recieverId],
                messages: [],
            })
            console.log('conversation created')
        }

        const newMessage = await Message({
            senderId,
            recieverId,
            message,
        })

        if(newMessage){
            existConversation.messages.push(newMessage._id)
        }

        await Promise.all([newMessage.save(), existConversation.save()])

        const recieverIdSocketId = getRecievedSocketId(recieverId);

        if(recieverIdSocketId){
            io.to(recieverIdSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);
        
    }catch(error){
        console.error('internal server send message error', error.message)
        res.status(500).json({error: 'internal server sendMessage error'})
    }
}


export const getMessages = async(req, res) => {
    try{
        const {_id: senderId} = req.user;
        //console.log('senderId :', senderId)
        const userToChat = req.params.id
        //console.log('userToChat :', userToChat)


        if(!senderId || !userToChat){
            return res.status(409).json('please provide data')
        }
        if(!senderId){
            return res.status(409).json('no senderId')
        }
        if(!userToChat){
            return res.status(409).json('no userToChat')
        }

        const existConversation = await Conversation.findOne({participants: {$all: [
            senderId, userToChat
        ]}}).populate('messages')

        if(!existConversation){
            return res.status(200).json([]);
        }

        const messages = existConversation.messages

        res.status(201).json(messages)
    }catch(error){
        console.log('internal server get message error', error.message)
        res.status(500).json({error: 'internal server get message error'})
    }
}



export const getAllConversation = async (req, res) => {
    try {
      const { _id: senderId } = req.user;
      const userToChat = req.params.id;
  
      if (!senderId || !userToChat) {
        return res.status(409).json('please provide data');
      }
  
      const existConversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChat] }
      }).populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 } 
      });
  
      if (!existConversation || existConversation.messages.length === 0) {
        return res.status(200).json(null);
      }
  
      const lastMessage = existConversation.messages[0]; 
      //console.log('last message :', lastMessage)
      res.status(201).json(lastMessage)
    } catch (error) {
      console.log('internal server get message error', error.message);
      res.status(500).json({ error: 'internal server get message error' });
    }
  };
  