import express from 'express';
const app = express();

const PORT = 8000 || process.env.port;

import user from './routes/user.js';

app.use(express.urlencoded({extended: false}));
app.set('views', './public/views')
app.set(express.static('../public'));
// app.use('../public/style', express.static('style'))
app.set('view engine', 'ejs')


import db_Conn from './db_Conn/db_Conn.js'
db_Conn();

import {loginPage, loginUser, signUpPage, signUp_User} from './controllers/auth/auth.js'

app.get('/', loginPage);
app.post('/', loginUser);
app.get('/signUp', signUpPage);
app.post('/signUp', signUp_User)

app.use('/user', user)

app.listen(PORT, ()=>{
    console.log(`Server is running at port:${PORT}`);
})