import mongoose from 'mongoose';

const BoysPrayer = mongoose.Schema({
    email:String,
})

const boysPrayer = mongoose.model('votersForChief', BoysPrayer)
export default boysPrayer;