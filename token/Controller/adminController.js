import { createToken } from "../auth.js";
import adminModel from "../Model/adminModel.js";


//User Register controllwer 

    export const Register = async (req,res) => {
        const {fName, lName, email, password} = req.body


        try {
            const avilable = await adminModel.findOne({email :email})
            if(avilable){
                res.status(400).json("User email already exits");
            }
            else{
                const UserDetails = await adminModel.create({fName : fName , lName :lName , email: email , password : password})
                res.status(200).json(UserDetails)
            }
        } catch (error) {
            console.log(error)
        }
    }

//User Login controller 

    export const Login = async (req,res) =>{
        const {email , password} = req.body
        
        try {
            const valid = await adminModel.findOne({email : email , password: password})
            if(valid){
                createToken(valid.id)
                res.status(200).json("User Login successfully")
            }
            else{
                res.status(400).json("Invalid user email or password")
                console.log(valid);

            }
        } catch (error) {
            
        }
    }



//user Data update controller

    // export const updateUser = async (req,res) =>{
    //     const {fName , lName , password} = req.body
    //     const {id} = req.params

    //     try {
    //         const user = await adminModel.findByIdAndUpdate({_id:id},req.body,{new:true})
    //             res.status(200).json(user)
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

//User data delete from database controller

    export const DeleteUser = async (req,res) =>{
    const {id} = req.params
    try {
        const userDelete = await adminModel.findByIdAndDelete({_id:id})
       //res.redirect('/alluser');
       res.render = '/'
    //    res.status(200).json("user data deleted successfully")
    //    window.location.href='/';
       



        } catch (error) {
        console.log(error);
    } 

    }

