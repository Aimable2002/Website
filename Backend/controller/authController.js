import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Model/userModel.js';




export const Signup = async(req, res) => {
    try{
        const {fullName, userName, age, gender, email, password, confirmPassword} = req.body;

        if(!fullName || !userName || !age || !gender || !email || !password || !confirmPassword){
            return res.status(409).json({error: 'fill all the filled'})
        }
        if(password != confirmPassword){
            return res.status(409).json({error: 'password mismatch'})
        }
        if(age < 18){
            return res.status(409).json({error: 'no under 18 user'})
        }

        const oldUser = await User.findOne({userName});

        if(oldUser){
            return res.status(409).json({error: 'username taken'})
        }

        const salt = await bcrypt.genSalt(10);
        const harshPassword = await bcrypt.hash(password, salt)


        const avatarBoy = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const avatarGirl = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            age,
            gender,
            password: harshPassword,
            avatar: gender === "Male" ? avatarBoy : avatarGirl,
        })

        if(newUser){
            const token = jwt.sign({userId: newUser._id}, process.env.SECRET, {expiresIn: '10d'})
            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                token
            })
            
        }
    }catch(error){
        console.log("internal server sign error", error.message)
        res.status(500).json({error: 'internal server sign error'})
    }

}

export const login = async(req, res) => {
    try{
        const {userName, password} = req.body;

        if(!userName || !password){
            return res.status(409).json({error: "fill the field"})
        }

        const user = await User.findOne({userName});
        if(!user){
            return res.status(401).json({error: "No user Found"})
        }
        const isPasswordTrue = await bcrypt.compare(password, user?.password || '')

        if(!isPasswordTrue){
            return res.status(401).json({error: "Incorrect password"})
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET, {expiresIn: '10d'})

        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            token
        })
    }catch(error){
        console.log('internal server login error :', error.message)
        res.status(500).json({error: "internal server login error"})
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "",  {maxAge: '0'});
        res.status(200).json("successfully logout")
    }catch(error){
        console.log("internal server logout error", error.message)
        res.status(500).json({error: "internal server logout error"})
    }
}