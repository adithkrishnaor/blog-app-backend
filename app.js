const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const bcryptjs = require("bcryptjs")   //st3

const { blogmodel } = require("./models/blogs")   //st2

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://adith:adith@cluster0.7mlz85p.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password=hashedPassword
    let blogs= new blogmodel(input)
    blogs.save()
    res.json({ "status": "success" })
})

app.post("/login",(req,res)=>{
    let input = req.body
    blogmodel.find({"email":req.body.email}).then(
        (response) => {
            console.log(response)
    }
    ).catch()
})

app.listen(8080, () => {
    console.log("Server Connnected")
})