import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import voterRoutes from './routes/voter.js';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv';
import adminRoute from './routes/admin.js';
import results from './routes/results.js';
import allUsers from './routes/allUsers.js';
import cannidatesRoute from './routes/cannidates.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);
dotenv.config();

const store = new MongoDBStore({
    uri: 'mongodb+srv://gyeltshen:gyeltshen11@credintial.n2k0ms9.mongodb.net/sessionsforvoters',
    collection: 'sessions'

});

const app = express();
app.set('view engine', 'ejs')
app.use(express.static( 'public/'))

app.use(express.static('images'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'secret for users',
    resave: false,
    saveUninitialized: false,
    store: store
}

));
app.use(flash());

mongoose.connect(process.env.url)
    .then(() => console.log('connected'))
    .catch(e => console.log(e))
app.use(allUsers);
app.use( voterRoutes);
app.use(authRouter);
app.use(adminRoute);
app.use(cannidatesRoute);
app.use(results)

app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port} `);
})