const { Users } = require("../models/users.model");

const createUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await Users.create({ name, email, password });
    res.status(202).json({
      status: "New user created",
      data: newUser,
    })
  } catch {
    return res.status(400).json({
        status: "Unable to create the user",
      })
  }
}

const getUsers=async function(req,res){
    try{
        const allUsers=await Users.findAll({where:{status: 'active'}})
        res.status(202).json({
            status:'Susscess',
            data: allUsers,
        })
    }catch{
        res.status(400).json({
        status:'Unable to find the users'
    })}
    
}

module.exports={createUser,getUsers}
