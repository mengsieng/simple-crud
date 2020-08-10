const app = require('./app.js')

const port = process.env.Port || 3030

app.listen(port, () => {
	console.log(`Now listening to ${port}`)
})
