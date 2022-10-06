import User from '../../models/User.js'
import bcrypt from 'bcryptjs';

export const loginPage = async(req,res) =>{
    try {
        res.status(200).render('index')
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(req,res)=>{
    try {
        let data = req.body;
        const user = await User.findOne({email: data.email}).lean();
        if(!user){
            return res.status(409).send('Invalid Credentials');
        }else{
            let comfirmPass = await bcrypt.compare( data.password,user.password);
            if(comfirmPass){
                res.status(200).redirect(`/user/${user._id}`)
            }else{
            return res.status(409).send('Invalid Credentials');
            }
        }

    } catch (error) {
        console.log(error);
    }
}

export const signUpPage = async(req,res) =>{
    try {
        res.status(200).render('signUp')
    } catch (error) {
        console.log(error);
    }
}

export const signUp_User = async(req,res)=>{
    try {
        let data = req.body;
        console.log(data);
        const user = await User.findOne({email: data.email}).lean();
        if(user){
            return res.status(409).send('User Alrady Exist!');
        }else if(data.password === data.confirmPassword){
            let hashedPassword = await bcrypt.hash(data.password, 10)
            console.log(hashedPassword);
            const saveUser = await User.create({name: data.name, email: data.email, password: hashedPassword, friendList:[]});
            saveUser.save();
            res.status(201).redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}


