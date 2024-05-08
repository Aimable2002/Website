import express from 'express'
import User from '../Model/userModel.js';


export const popUser = async(req, res) => {
    try{
        const onUser = req.user;

        const filterUser = await User.findById({_id: {$ne: {onUser}}}).select('-password');

        res.status(201).json({filterUser})
    }catch(error){
        console.log('internal server popuser error', error.message);
        res.status(500).json({error: 'internal server popuser error'})
    }
}



export const popLoggedUser = async(req, res) => {
    try{
        const loggedUser = req.user;

        const filterloggedUser = await User.findById({_id: {$all: {loggedUser}}}).select('-password');

        res.status(201).json({filterloggedUser})
    }catch(error){
        console.log('internal server poplogged user error', error.message);
        res.status(500).json({error: 'internal server poplogged user error'})
    }
}