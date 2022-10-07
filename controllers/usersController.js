const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.getAll = (req,res)=>{

    User.find({},{password:0})
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(err => res.status(401).json(err))
}

exports.getOne = (req,res)=>{

    User.findOne({ _id:req.params.id},{password:0})
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(err => res.status(404).json({message:"aucun utilisateur trouvé"}))
}

exports.logIn = (req,res)=>{

    User.findOne({email:req.body.email})
    .then((user)=>{

        if(!user){
            res.status(401).json("mail or username incorect")
        }
        else{
            bcrypt.compare(req.body.password,user.password)
            .then((valid)=>{
                !valid?
                res.status(401).json("invalid password or username"):
                delete user.password
                res.status(200).json({
                    userId:user.id,
                    token:"asdkjasjdqwi123123nknase12312380"
                })
            })
        }

        
    })
    .catch(err => res.status(500).json(err))

}

exports.signIn = (req,res)=>{

    bcrypt.hash(req.body.password,10)
    .then((hashedPassword)=>{
        req.body.password = hashedPassword
        const user = new User(
            {
                ...req.body
            }
        )
        user.save()
        .then(user => res.status(200).json(user.firstName+' added successfully'))
        .catch(err => res.status(403).json('can not add that user',err))

    })
    


   
}