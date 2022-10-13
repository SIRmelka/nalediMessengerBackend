const Message = require('../models/messageModel')
const Conversation = require('../models/conversationModel')




exports.getAll =  (req,res)=>{
    Message.find()
    .populate({path:"from",select:'firstName lastName profile'})
    .populate({path:"to",select:'firstName lastName profile'})
    .then( messages => res.status(200).json(messages))
    .catch(err => res.status(500).json(err))


    // Message.deleteMany()
    // .then( messages => res.status(200).json(messages))
    // .catch(err => res.status(401).json(err))
    
}



exports.createMessage = async (req,res)=>{

    const message = await Message.create({
        from:"633f2bcc4d0fbd0cd7745252",
        to:"633f2bcc4d0fbd0cd7745252",
        message:"Salut, je ne viens pas aujourdhui",

    })

    Conversation.findOne({_id:'63482015842e88e7fbf44eb0'})
    .then(async (conversation)=>{
        
            console.log('message added');
            Conversation.updateOne({_id:conversation._id},{
                $push:{messages:message.id}
            })
            .then(console.log('conversation updated'))
            

            res.status(200).json(message)
        
        
    })
    .catch((err) => {
        res.status(404).json({error:err})
    })
    // const conversation = new Conversation({
    //     users:["633f2bcc4d0fbd0cd7745252","633f2bcc4d0fbd0cd7745252"],
    //     messages:["6347f713c5827af7c88ba654"]
    // })

    // conversation.save()
    // .then( messages => res.status(200).json(messages))
    // .catch(err => res.status(500).json(err))

}

exports.getConversations = (req,res)=>{
    Conversation.find({sort:{'created_at':-1}})
    .populate({path:'users',select:"firstName lastName"})
    .populate({path:'messages',select:"from message media date seen",options:{limit:4,sort:{'date':1}}})
    .then( messages => res.status(200).json(messages))
    .catch(err => res.status(500).json(err))
}

exports.getOneConversation = (req,res)=>{
    Conversation.findOne({_id:req.params.id})
    .populate({path:'users',select:"firstName lastName"})
    .populate({path:'messages',select:"from message media date seen"})
    .then( messages => res.status(200).json(messages))
    .catch(err => res.status(500).json(err))
}

