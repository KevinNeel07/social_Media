import express from 'express';
const app = express();
import dotenv from 'dotenv';

dotenv.config();

const PORT = 8000 || process.env.port;

import user from './routes/user.js';

app.use(express.urlencoded({extended: false}));
app.set('views', './public/views')
app.set(express.static('../public'));
app.set('view engine', 'ejs')


import db_Conn from './db_Conn/db_Conn.js'
db_Conn();

import {loginPage, loginUser, signUpPage, signUp_User, getPasswordPage, sendVerificationMail, changePasswordPage, changePassword} from './controllers/auth/auth.js'

app.get('/', loginPage);
app.post('/', loginUser);
app.get('/signUp', signUpPage);
app.post('/signUp', signUp_User)
app.get('/forgetPassword', getPasswordPage)
app.post('/forgetPassword', sendVerificationMail)
app.get('/changePassword/:userID', changePasswordPage)
app.post('/changePassword/:userID', changePassword)

app.use('/user', user)

app.listen(PORT, ()=>{
    console.log(`Server is running at port:${PORT}`);
})