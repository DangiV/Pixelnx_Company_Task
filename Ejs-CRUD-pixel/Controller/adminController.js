import adminModel from "../Model/adminModel.js";


//User Register controllwer 

export const Register = async (req,res) => {
    const {fName, lName, email, password} = req.body

    // console.log("req.body", req.body);

    try {
        const avilable = await adminModel.findOne({email :email})
        console.log("avilable", avilable);
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
    // console.log(req.body);
    
    try {
        const valid = await adminModel.findOne({email : email , password: password})
        if(valid){
            res.status(200).json("User Login successfully")
            console.log(valid);

        }
        else{
            res.status(400).json("Invalid user email or password")
            console.log(valid);

        }
    } catch (error) {
        
    }
}

//User controller to show all user

// export const AllDisplay = async (req,res) =>{
//     const userAll = await adminModel.find({});
//     res.status(200).json(userAll)
// }



//User data delete from datase by Id 

export const DeleteUser = async (req,res) =>{
    const {id} = req.params
    try {
        const userData = await adminModel.findByIdAndDelete({_id: id});
    res.status(200).json("user data removed successfully")
    } catch (error) {
     res.status(400).json("cancel from deleting");   
    }

    
}


//user update details 

export const userUpdate = async (req,res) =>{
    const {fName , lName , password} = req.body
    console.log(req.body);
    
    try {
        const {id} = req.params;
        const udetails = await adminModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json(udetails)
    } catch (error) {
        console.log(error);
    }
}

