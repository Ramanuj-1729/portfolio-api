const { APP_PORT, DB_URL } = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const errorHadler = require('./middlewares/errorHandler');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const app = express();

//DB connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('DB connected ...'));

global.appRoot = path.resolve(__dirname);
const corsOptions = {
    origin: 'https://ramanuj.vercel.app',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routes);
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorHadler);

app.use((req, res, next) => {
    res.status(404).json({ error: ' Route not exist :( ' });
});

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT} ...`));