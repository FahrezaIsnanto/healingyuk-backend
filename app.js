const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mlRouter = require('./routes/ml')

app.use(bodyParser.urlencoded({extended: true}))
app.use(mlRouter)

app.get("/", (req, res) => {
    console.log("Response success")
    res.send("Response Success!")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
})