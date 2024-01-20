import express from 'express';
import { Router } from 'express';
import { DeleteUser, Login, Register, userUpdate } from '../Controller/adminController.js';
import adminModel from '../Model/adminModel.js';

const route = express.Router();

// route.post('/register',Register);
// route.post('/login',Login)
// route.delete('/dele/:id',DeleteUser)
// route.patch('/update/:id',userUpdate)

route.get('/',(_,res)=>{
    res.render('home')
})

//User route of Get and POST method to register user 

route.get('/register',(_,res)=>{
    res.render('register')
})

route.post('/register', Register)


//User route of Get and POST method to Login user 

route.get('/login',(_,res)=>{
    res.render('login')
})

route.post("/login" , Login)


//User route of Get method to Display all user which are Register



//const userShow 

route.get('/alluser',(req,res)=>{
    adminModel.find({},function(err, show){
        res.render('alluser',{udata : show})      
    })
})

//edit to exixtence data

    route.get("/edit/:id",(req,res)=>{
        //req.params.id

        adminModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            res.render("edit",{adminModel:docs})
        }
        })
    })



route.post('/edit/:id',(req,res)=>{
    adminModel.findByIdAndUpdate({_id: req.params.id},req.body, {new:true},(err, docs)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/alluser');
        }
    })
})


//route.post('/edit/:id',userUpdate)
   



//Route to delete user data from  database

// route.get('/delete/:id',(req,res)=>{
//     adminModel.findByIdAndDelete({_id: req.params.id},(err,docs)=>{ 
//         if(err){
//             console.log(err);
//         }
//         else{
//              res.redirect('/')
//         }
//     })
// })


route.get('/delete/:id',DeleteUser)


export default route;