var express = require('express')
var app = express()
var cors = require('cors')

require('dotenv').config()
app.use(cors())

app.use('/', require('./routes/index'));



app.listen(process.env.APP_PORT, () => console.log('Example app listening on port http://localhost:'+process.env.APP_PORT))