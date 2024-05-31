const User = require('../model/User');


const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find(); 
    } catch (err) {
        return next(err);
    }
    if (!users) {
        return res.status(500).json({ message: "Internal server Error" });
    }

    return res.status(200).json({ users });
};


const addUser = async(req, res, next) => {
    const {name, email, password} = req.body;
    if(
    !name && 
    name.trim()=="" &&
    !email &&
    email.trim()==="" &&
    !password &&
    password.length > 6){
        return res.status(422).json({message:"Invalid Data"});
    }
    let user;
    try{
        user = new User({
            name,
            email,
            password,
        });
        user = await user.save();
    } catch(err){
        return next(err);
    }
    if(!user){
        return res.status(500).json({message: "Unable to save user"});
    }
    return res.status(201).json({user});

};


const updateUser = async(req, res, next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    if(
    !name && 
    name.trim()=="" &&
    !email &&
    email.trim()==="" &&
    !password &&
    password.length > 6
)
    {
        return res.status(422).json({message:"Invalid Data"});
    }

    let user;

    try{
        user = await User.findByIdAndUpdate(id, {name, email, password})
    }catch(err){
        return next(err)
    }
    if(!user){
        return res.status(500).josn({message:"unable to save user"});
    }
    return res.status(200).json({message:"updated successfully"});
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getAllUser = getAllUser;
exports.addUser = addUser;
exports.updateUser = updateUser; 
exports.deleteUser = deleteUser;