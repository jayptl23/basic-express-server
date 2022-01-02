const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.static('client'))

app.get('/hello', (req, res) => res.json('Hello World!'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
