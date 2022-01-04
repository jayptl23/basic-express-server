const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
require('dotenv').config()

let db
async function connectToDatabase() {
	const client = new MongoClient(process.env.MONGO_URI)

	try {
		await client.connect()
		console.log(`Connected to database!`)
		db = client.db(process.env.DB_NAME)
	} catch (error) {
		console.error(error)
	}
}

connectToDatabase()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// app.use(express.json())

app.get('/', (req, res) => {
	const cursor = db.collection('Pokemon').find()
	cursor
		.toArray()
		.then(data => res.render('index.ejs', {pokemon: data}))
		.catch(error => console.error(error))
})

app.post('/addPokemon', (req, res) => {
	const {name, type} = req.body
	db.collection('Pokemon')
		.insertOne({
			name,
			type,
			likes: 0,
		})
		.then(result => {
			console.log(result)
			res.redirect('/')
		})
		.catch(error => console.error(error))
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
