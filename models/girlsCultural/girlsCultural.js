import mongoose from 'mongoose';

const GirlsCultural = mongoose.Schema({
    email:String,
})

const girlsCultural = mongoose.model('votersForChief', GirlsCultural)
export default girlsCultural;