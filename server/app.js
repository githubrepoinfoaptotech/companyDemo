const sequelize = require("./db/db");
const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const user = require("./models/user");
const pricing = require("./models/pricing");
const admin_routes = require("./routes/admin-routes");
const super_admin_routes = require("./routes/superAdmin-routes");
const recruiter_routes = require("./routes/recruiter-routes");
const auth_routes = require("./routes/auth-routes");
const chat_routes = require("./routes/chat-routes");
const clientCoordinator_routes = require("./routes/clientCoordinator-routes");
const role = require("./models/role");
const multer = require("multer");
const http = require("http");
const cluster = require("cluster");
const os = require("os");
const Sequelize = require("./db/db");
const socketio = require("socket.io");
const { Server } = require("socket.io");
const chatUser = require("./models/chatUser");
const chatUserMessage = require("./models/chatUserMessage");
const recruiterWallets=require("./models/recruiterWallets");
const chatMedia = require("./models/chatMedia");
const recruiterSettings = require("./models/recruiterSettings");
const hiringSupport = require("./models/hiringSupport");
const statusList = require("./models/statusList");
const axios = require("axios").default;
const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv").config();
const FN=require("./functions/sendReplyMail");
const wallet=require("./functions/messageValidation");
const priceRoutes = require("./routes/pricing-routes");
const sourceRoutes = require("./routes/source-rouetes");
const aiRoutes=require('./routes/ai-connection-routes');
const { Op } = require("sequelize");
const xlsx = require('xlsx');
// -----------------------------------
const app = express();
// ----------------------------
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

server = http.createServer(app);

app.use(express.json({ limit: "5000mb" }));
app.use(express.urlencoded({ extended: true, limit: 20000000 }));
app.use(cors());
//const path = require("path");
app.use("/media", express.static(path.join("media")));
app.use("/images", express.static(path.join("images")));
app.use("/zip",express.static(path.join("zip")));
app.use("/resumes",express.static(path.join("resumes")));
app.use("/job_descriptions",express.static(path.join("job_descriptions")));
// ========--------------------=========================---------using router---------==========================--------------
app.use("/api/admin", admin_routes);
app.use("/api/superAdmin", super_admin_routes);
app.use("/api/recruiter", recruiter_routes);
app.use("/api/auth", auth_routes);
app.use("/api/CC", clientCoordinator_routes);
app.use("/api/chat", chat_routes);
app.use("/api/pricing",priceRoutes);
app.use("/api/source",sourceRoutes);

// -----------------------------------------------sequalize-------------------------------------sequalize----------------------

//---------------------ai---------------------------------

app.use("/api/AI/",aiRoutes);
//-------------------------------------

app.post("/addrole", async(req, res) => {
  const workbook = xlsx.readFile('pricings.csv', { cellText: false, cellDates: false });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
// Convert the CSV data to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
      console.log(data);
  for(i=0;i<data.length;i++)
    {
      await pricing.create(data[i]);
    }
    res.send("done");
});

app.post("/testUser", async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  console.log(salt);
  const Hash = await bcrypt.hash(password, salt);
  user
    .create({
      email: email,
      roleName: "SUPERADMIN",
      password: Hash,
    })
    .then(() => {
      res.send("success");
    });
});
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); 

app.get("/",async(req,res)=>{
  console.log("in");
  res.send("helloworld");
});

io.on("connection", (socket) => {
  console.log("A user is connected");
});
app.post("/api/chat/receiveMessage",wallet.checkRecivemessage, async (req, res) => {
  try {
    const value = req.body.values[0].changes[0].value;
    if (value.messages) {
      const message = value.messages[0];
      const from = message.from;
      const username = value.contacts[0].profile.name;
      var PHONE_NUMBER_ID =
        req.body.values[0].changes[0].value.metadata.phone_number_id;
      const settings = await recruiterSettings.findOne({
        where: { phoneNumberId: PHONE_NUMBER_ID },
      });
      const FB_BASE_URL = settings.fbBaseUrl;
      const WHATSAPP_TOKEN = settings.waToken;
      if (!settings) {
      } else {
        await chatUser
          .findOne({
            where: { PHONE_NUMBER_ID: PHONE_NUMBER_ID, phoneNumber: from },
          })
          .then(async (cdata) => {
            //console.log(cdata);
            if (cdata) {
              var chatUserId=cdata.id;
              var recruiterId = cdata.recruiterId;
              var mainId = cdata.mainId;

              const message_id = message.id;
              /*  database.messages[message_id] = {
                from,
                timestamp: message.timestamp,
                status: "delivered",
              };*/

              /*
              if (message.context) {
                console.log(
                  "Received reply-to message " + message.context.id
                );
                const reply_to = database.messages[message.context.id];
                if (reply_to) {
                  database.messages[message_id].reply_to = {
                    username:
                      database.users[reply_to.from || reply_to.to].name,
                    body: reply_to.caption || reply_to.template.name,
                  };
                }
              } */
              /*if (message.referral)
                console.log("Received referral: " + message.referral.body);
              */
              // console.log(message.type);
              if (message.type === "text") {
                const msg_body = message.text.body;
                //database.messages[message_id].text = { body: msg_body };
                //   database.messages[message_id].caption = msg_body;
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }

                await chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    caption: msg_body,
                    type: "text",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    replyMessageId: replyMessageId,
                  })
                  .then(async (data1) => {
                   // await messagehistory(req,data1);        changed data candidate wise
                    // res.status(200).json({ status: true, message: "Sent" });

                    io.emit("message-recevied", { from: cdata.id });

                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId);
                      }
                    res.status(200).json({
                      message: "Success",
                      status: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "image") {
                const image_id = message.image.id;
                const caption = message.image.caption;
                // downloadMedia(image_id);
                /* database.messages[message_id].image = {
                  caption,
                  media_id: image_id,
                };*/
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                console.log(cdata.id);
                
                await chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    // caption: msg_body,
                    type: "image",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    mediaId: image_id,
                    mediaCaption: caption,
                    replyMessageId:replyMessageId
                  })
                  .then(async (data) => {
                    downloadMedia(
                      image_id,
                      data.id,
                      WHATSAPP_TOKEN,
                      FB_BASE_URL
                    );
                //    await messagehistory(req,data);        changed data candidate wise
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId);
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "audio") {
                const audio_id = message.audio.id;
                // downloadMedia(audio_id);
                //  database.messages[message_id].audio = { media_id: audio_id };
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    // caption: msg_body,
                    type: "audio",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    mediaId: audio_id,
                    replyMessageId:replyMessageId
                    // mediaCaption: caption,
                  })
                  .then(async (data) => {
                    downloadMedia(
                      audio_id,
                      data.id,
                      WHATSAPP_TOKEN,
                      FB_BASE_URL
                    );
                   // await messagehistory(req,data);              changed data candidate wise
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "video") {
                const video_id = message.video.id;
                const caption = message.video.caption;
                // downloadMedia(video_id);
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    // caption: msg_body,
                    type: "video",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    mediaId: video_id,
                    mediaCaption: caption,
                    replyMessageId:replyMessageId
                  })
                  .then(async(data) => {
                    downloadMedia(
                      video_id,
                      data.id,
                      WHATSAPP_TOKEN,
                      FB_BASE_URL
                    );
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };
                 //   await messagehistory(req,data);           changed data candidate wise
                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "document") {
                const caption = message.document.caption;
                const document_id = message.document.id;
                // downloadMedia(document_id);
                //database.messages[message_id].document = { caption, media_id: document_id };
                /*                database.messages[message_id].document = {
                  filename: caption,
                  size: 0,
                  uri: document_id,
                };
                */
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    // caption: msg_body,
                    type: "document",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    mediaId: document_id,
                    mediaCaption: caption,
                    replyMessageId:replyMessageId
                  })
                  .then(async(data) => {
                //    await messagehistory(req,data);            changed data candidate wise
                    downloadMedia(
                      document_id,
                      data.id,
                      WHATSAPP_TOKEN,
                      FB_BASE_URL
                    );
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "sticker") {
                const sticker_id = message.sticker.id;
                //downloadMedia(sticker_id);
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    // caption: msg_body,
                    type: "sticker",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    mediaId: sticker_id,
                    replyMessageId:replyMessageId
                    //mediaCaption:caption
                  })
                  .then(async(data) => {
               //     await messagehistory(req,data);                 changed data candidate wise
                    downloadMedia(
                      sticker_id,
                      data.id,
                      WHATSAPP_TOKEN,
                      FB_BASE_URL
                    );
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "button") {
                const button_text = message.button.text;
                //const payload = message.button.payload;
                //database.messages[message_id].button = { text: button_text };
                //  database.messages[message_id].caption = button_text;
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    caption: button_text,
                    type: "button",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    replyMessageId:replyMessageId
                    //  mediaId:sticker_id,
                    //mediaCaption:caption
                  })
                  .then(async (data) => {
       //             await messagehistory(req,data);                            changed data candidate wise
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "interactive") {
                if (message.interactive.type === "button_reply") {
                  //const id = message.interactive.button_reply.id;
                  const title = message.interactive.button_reply.title;
                  database.messages[message_id].interactive = { text: title };
                } else {
                  console.log(
                    "Unkown interactive type: " + message.interactive.type
                  );
                }
              } else if (message.type === "contacts") {
                const name = message.contacts[0].name.formatted_name;
                const phone = message.contacts[0].phones[0].phone;
                //  database.messages[message_id].contacts = { name, phone };
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;

                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    //  caption: button_text,
                    type: "contacts",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    //  mediaId:sticker_id,
                    //mediaCaption:caption,
                    contactName: name,
                    contactNumber: phone,
                    replyMessageId:replyMessageId
                  })
                  .then(async(data) => {
            //        await messagehistory(req,data);                           changed data candidate wise
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "location") {
                const name = message.location.name;
                const address = message.location.address;
                //  database.messages[message_id].location = { name, address };

                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    //  caption: button_text,
                    type: "location",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    //  mediaId:sticker_id,
                    //mediaCaption:caption,
                    locationName: name,
                    locationAddress: address,
                  })
                  .then(async (data) => {
         //            await messagehistory(req,data);            changed data candidate wise
                    io.emit("message-recevied", { from: cdata.id });
                    var changes = {
                      status: "read",
                    };

                    await chatUserMessage
                      .update(changes,{
                        where: {
                          from: null,
                          chatUserId: cdata.id,
                          PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                        },
                      });
                      if(replyMessageId!=null){
                        FN.candidateReply(replyMessageId);
                      }
                      else{
                        FN.nonSwipeReply(mainId,from,chatUserId)
                      }
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else if (message.type === "unsupported") {
                // Interactive msg fordwarded
                const details = message.errors[0].details;
                database.messages[message_id].unsupported = { text: details };
                var replyMessageId;
                if (message.context) {
                  replyMessageId = message.context.id;
                  console.log(
                    "Received reply-to message " + message.context.id
                  );
                } else {
                  replyMessageId = null;
                }
                chatUserMessage
                  .create({
                    chatUserId: cdata.id,
                    messageId: message_id,
                    from: from,
                    recruiterId: recruiterId,
                    mainId: mainId,
                    timestamp: Math.floor(Date.now() / 1000),
                    status: "delivered",
                    caption: details,
                    type: "unsupported",
                    PHONE_NUMBER_ID: PHONE_NUMBER_ID,
                    replyMessageId:replyMessageId
                    //  mediaId:sticker_id,
                    //mediaCaption:caption,
                    // locationName:name,
                    // locationAddress:address
                  })
                  .then(async(data) => {
            //        await messagehistory(req,data);                             changed data candidate wise
                    io.emit("message-recevied", { from: cdata.id });
                    res.status(200).json({ status: true, message: "Sent" });
                  })
                  .catch((error) => {
                    res.status(500).json({ status: false, mesage: "Error" });
                  });
              } else {
                res.status(200).json({ status: true, message: "Sent" });
              }

              /* const ampath = require("path");

              const httpsAgent = new amhttps.Agent({
                rejectUnauthorized: false,

                cert: amfs.readFileSync(ampath.join(__dirname, "am.crt")),
              });

              axios
                .post(
                  "https://assessandmeasure.com/Pages/send_notification_from_whatsapp_message",
                  { data1: from },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    httpsAgent: httpsAgent,
                  }
                )
                .then((response) => {
                  console.log("Ok");
                })
                .catch((error) => {
                  reject(error);
                });*/
            } else {
              res.status(200).json({ status: true, message: "Sent 11" });
            }
          })
          .catch((e) => {
            console.log(e);
            res.status(500).json({ status: false, mesage: "Error1" });
          });
      }

      // if (!database.users[from]) {
      // database.users[from] = { channel: "whatsapp", name: username };
      // }
    }
    //database.update();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR", status: "false" });
  }
});


/*
server.listen(process.env.PORT || 4000, () =>
  console.log(`Server has started.`)
);*/

const https = require("https");

  
//  const options = {
//     key: fs.readFileSync("/home/ubuntu/ca.key"),
//   cert: fs.readFileSync("/home/ubuntu/ca.crt"),
//  };

 http.createServer(app)
  .listen(8443, function (req, res) {
 console.log(req);
console.log(res);
   console.log("Server started at port 8443");
});


// if (cluster.isPrimary) {
//   var numCPUs=os.cpus().length;
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// }
// else{
//     http.createServer(app)
//   .listen(4000, function (req, res) {
//     console.log("Server started at port 4000");
//   });
//   console.log("listening")
// }

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("synced db.");
})  
  .catch((err) => {
    console.log(err);
});  
 

// -----------------------------------------------------------------------------------------------------------------------------
function downloadMedia(  
  media_id,
  chatUserMessageId,
  WHATSAPP_TOKEN,
  FB_BASE_URL
) {
  const storage = new AWS.S3({
    accessKeyId: process.env.s3_id,
    secretAccessKey: process.env.s3_key,
  });
  axios
    .get(FB_BASE_URL + media_id, { 
      headers: {
        Authorization: "Bearer " + WHATSAPP_TOKEN,
      },
    })
    .then((response) => {
      //console.log(response);

      const retrival_url = response.data.url;
      axios
        .get(retrival_url, {
          responseType: "stream",
          headers: {
            Authorization: "Bearer " + WHATSAPP_TOKEN,
          },
        })
        .then((response) => {
          const header = response.headers["content-disposition"];
          const filename = header.split("filename=")[1];
          console.log(filename);
          const path = "media/" + media_id + "_" + filename;
          response.data.pipe(fs.createWriteStream(path)).on("finish", () => {
            //   console.log(filename + " downloaded.");
            //     database.media[media_id] = { path };
            //  database.update();
            chatMedia
              .create({
                mediaId: media_id,
                path: path,
                originalFileName:filename
              })
              .then((data) => {
                storage.upload(params, async function (err, S3file) {                   //S3 upload function
                  if(err){
                    console.log(err);
                  }
                  await chatMedia.update({path:process.env.imageUrl+"/"+filename},{where:{id:data.dataValues.id}});
                  chatUserMessage.update(
                    { chatMediaId: data.id },
                    { where: { id: chatUserMessageId } }
                  );
                }) ;
                fs.unlink(path, function (err) {
                  if (err) throw err;
                  console.log('file deleted.');
                });
              });
          });
        });
    })
    .catch((e) => {
      console.log(e);
    });
}
// async function messagehistory(req,data){
//   console.log("in")
//   console.log(req.body);
//   console.log(req.mainId)
//   const newcandidate=await chatUser.findOne({where:{id:data.dataValues.chatUserId}});
//   console.log(newcandidate);
//   var dateObj = new Date();
//   mywhere={
//     createdAt: {
//       [Op.and]: [
//         Sequelize.literal(`date_trunc('day', "createdAt") = '${dateObj.toISOString().slice(0, 10)}'`),
//         Sequelize.literal(`extract(month from "createdAt") = ${dateObj.getMonth() + 1}`),
//         Sequelize.literal(`extract(year from "createdAt") = ${dateObj.getFullYear()}`)
//       ]
//     },
//     //candidateId:newcandidate.candidateId,
//     PHONE_NUMBER_ID:newcandidate.PHONE_NUMBER_ID,
//     from:newcandidate.phoneNumber,
//     mainId:req.mainId
//   }
//   const activity=await recruiterMessageActivity.findOne({where:mywhere});
//   console.log(activity);
//   if(!activity){
//     await recruiterMessageActivity.create({
//       PHONE_NUMBER_ID:newcandidate.PHONE_NUMBER_ID,
//       phoneNumber:newcandidate.phoneNumber,
//       mainId:req.mainId,
//       recruiterId:req.recruiterId,
//       from:newcandidate.phoneNumber,
//       chatUserMessageId:data.dataValues.id
//     }).then(async()=>{
//      Wallet = await recruiterWallets.findOne({where:{mainId:req.mainId}});
//      messagesLeft=Wallet.remainingMessages-1
//       await Wallet.update({
//         remainingMessages:messagesLeft
//       });
//     });
//   }
//   };
//------------------------------------------------------------------------------------------------------------------------------------
module.exports = io;
