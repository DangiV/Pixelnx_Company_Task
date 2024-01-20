import express, { Router } from 'express';
import { authToken } from '../auth.js';
import {  DeleteUser, Login, Register } from '../Controller/adminController.js';
import adminModel from '../Model/adminModel.js';
const route = express.Router();


// this both route are for upadate and delete data from database with JWT Token
// route.delete('/dele/:id',authToken,DeleteUser)
// route.patch('/update/:id',authToken,updateUser)



//Defalut route for home page
                route.get('/',(req,res)=>{
                    res.render('home')
                })

//register route for get and post method
                route.get('/register',(req,res)=>{
                res.render('register')
                })

                route.post('/register',Register);



//login route for get and post method
                route.get('/login',(req,res)=>{
                res.render('login')
                })

                route.post('/login',Login)


//route for all user to display on UI
                route.get('/alluser',(req,res)=>{
                    adminModel.find({},function(err, show){
                        res.render('alluser',{udata : show})      
                    }) 
                })




 //creating controller and route for delete

                 route.get('/delete/:id',DeleteUser)

//  route.get('/delete/:id',(req,res)=>{
//           adminModel.findByIdAndDelete({_id: req.params.id},(err,docs)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 res.redirect('/'); 
//             }
//           })
//  })


 //route for edit page to show current page which he/she getting update


        route.get('/edit/:id',(req,res)=>{
            const {_id} = req.params.id
            adminModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
                res.render('edit',{adminModel:docs})

            })
        })

        route.post('/edit/:id',(req,res)=>{
            console.log("reqest",req.params)
               // console.log("___id",_id);
                adminModel.findByIdAndUpdate({_id: req.params.id},req.body, {new:true},(err, docs)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/alluser');
                }
             })
        })


export default route;