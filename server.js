const express = require('express');
const app = express();
const port = process.env.PORT || 8080 
const dotenv = require('dotenv');
const connectDB = require('./db/config');
const userRoutes = require('./routes/userRoutes');
const handleErrors = require('./middleware/errorHandler');
const parkRoutes = require('./routes/parkRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/users', userRoutes);

app.use('/parks', parkRoutes);


app.use(handleErrors);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});