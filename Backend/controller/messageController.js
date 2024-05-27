import express from 'express';
import Conversation from '../Model/conversationModel.js';
import Message from '../Model/messageModel.js';
import { getRecievedSocketId, io } from '../socket/socket.io.js';


export const sendMessages = async (req, res) => {
    try{
        const {message} = req.body;
        console.log('messages :', message)
        const {id: senderId} = req.user;
        console.log('senderId :', senderId)
        const {id: recieverId} = req.params;
        console.log('recieverId :', recieverId)

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
        console.log('senderId :', senderId)
        // const {_id: userToChat} = req.params;
        const userToChat = req.params.id
        console.log('userToChat :', userToChat)
        // const {message} = req.body
        // console.log('message :', message)


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
    try{
        const userId = req.user._id;
        //const recieverId = req.params.id;
        const user = userId.toString()
        console.log('user :', user)
        

        const conversations = await Conversation.find({participants: user}).populate('messages')
        console.log('conversations :', conversations)
        res.status(201).json(conversations)
    }catch(error){
        console.log('internal server getAll conversation error :', error)
        res.status(500).json({error: 'internal server get all conversation error'})
    }
}