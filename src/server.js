const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()

let whitelist = ['http://localhost:8080']
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) != 1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by CORS'))
        }
    },
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const db = require('./models')
db.sequelize
// .sync({ force: true })
.sync()
.then(() => {
    console.log('database connected')
})
.catch((err) => {
    console.error('database connection failed')
})

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running...'
    })
})

require('./routes/auth.route')(app)

const PORT = process.env.APP_PORT || 5000
app.listen(PORT, () => {
    console.log('Server Running')
})