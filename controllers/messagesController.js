const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const cloudinary = require("../middlewares/cloudinary");

exports.getAll = (req, res) => {
  Message.find()
    .populate({ path: "from", select: "firstName lastName profile" })
    .populate({ path: "to", select: "firstName lastName profile" })
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err));
};

exports.deleteAll = (req, res) => {
  // Message.deleteMany()
  // .then( messages => res.status(200).json(messages))
  // .catch(err => res.status(401).json(err))
  Conversation.deleteMany()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(401).json(err));
};

exports.createMessage = async (req, res) => {
  //     let uploadResult = " ";
  //     console.log("hey",req.body.media);

  //     if (req.body.media!=="") {
  //     try {
  //         console.log("heyhey");
  //       const response = await cloudinary.uploader.upload(req.body.media, {
  //         upload_preset: "sirMelka",
  //       });
  //     //   uploadResult = response.public_id;
  //     console.log('response',response);
  //     } catch (err) {
  //       return res.send(err);
  //     }
  //   }

  const message = await Message.create({
    from: req.query.from,
    to: req.query.to,
    message: req.body.message,
    media: req.body.media,
    date: Date.now(),
    seen: false,
  });

  Conversation.findOne({ _id: req.params.conversationId })
    .then(async (conversation) => {
      console.log("message added");
      Conversation.updateOne(
        { _id: conversation._id },
        {
          $push: { messages: message.id },
        }
      )
      .then(console.log("conversation updated"));

      res.status(200).json(message);
    })
    .catch((err) => {
      const conversation = Conversation({
        users: [req.query.from, req.query.to],
        messages: [message.id],
      });

      conversation
        .save()
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(500).json(err));
    });
};

exports.findOrCreate = (req, res) => {
  Conversation.findOne({
    $and: [
      { users: { $in: req.query.firstUser } },
      { users: { $in: req.query.secondUser } },
    ],
  })
    .then((messages) => {
      if (!messages) {
        const conversation = Conversation({
          users: [req.query.firstUser, req.query.secondUser],
        });

        conversation
          .save()
          .then((conv) =>
            res
              .status(201)
              .json({ message: "new conversation", _id: conv._id, conv })
          );
      } else {
        res.status(200).json(messages);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getConversations = (req, res) => {
  Conversation.find({ users: { $in: req.params.id } })
    .sort({ updatedAt: -1 })
    .populate({ path: "users", select: "firstName lastName profile" })
    .populate({
      path: "messages",
      select: "from message media date seen",
      options: { sort: { date: 1 } },
    })
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err));
};

exports.getOneConversation = (req, res) => {
  Conversation.findOne({ _id: req.params.id })
    .populate({ path: "users", select: "firstName lastName" })
    .populate({ path: "messages", select: "from message media date seen" })
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err));
};
