const express = require('express');
const app = express();
const cors = require("cors");

let corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

const user = require("./routes/userRouter");
const event = require("./routes/eventRoute");
const contact = require("./routes/contactRoute");
const userEvent = require("./routes/userEventRoute");

app.use(express.json())


app.use("/api/user",user);
app.use("/api/events",event);
app.use("/api/contact",contact);
app.use("/api/user-event",userEvent);


module.exports = app