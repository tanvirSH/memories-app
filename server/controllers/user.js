import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // JSON WEB Tocken

import User from '../models/user.js';


export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(404).json({message: 'User not exist'});
        }

        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
        if(!isCorrectPassword) {
            return res.status(404).json({message: 'Password is wrong'});
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'testSecretKey', {expiresIn: "1h"});

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: error})
    }
};

export const signup = async (req, res) => {
    const {email, password, firstname, lastname, confirmpassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: 'User already exists' });

        if(password !== confirmpassword) res.status(400).json({ message: 'Password does not match' });

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashPassword, name: `${firstname} ${lastname}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'testSecretKey', {expiresIn: "1h"});
       
        res.status(200).json({ result, token });
    
    } catch (error) {
        res.status(500).json({ message: error})
    }
};