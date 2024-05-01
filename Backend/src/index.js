import dotenv from "dotenv"
import {app} from "./app.js"
import ConnectDb from "./db/index.js"


dotenv.config({
    path: './.env' 
})

ConnectDb()

.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })  
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})