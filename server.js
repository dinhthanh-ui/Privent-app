const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./Routes/userRoute');
const app = express();

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Route middleware
 */
app.use("/api/users", userRoute);


/**
 * routes
 */
app.get('/', (req, res) =>
{
	res.status(200).json({
		message: 'hello world'
	})
})

/**
 * connect mongooseDb and start server 
 */
const PORT = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGOOSE_URL)
	.then(() =>
	{
		app.listen(PORT, () =>
		{
			console.log(`server start on port ${PORT}`);
		})
	})
	.catch((err) =>
	{
		console.log(err)
	})