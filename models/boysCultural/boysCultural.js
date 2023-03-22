import mongoose from 'mongoose';

const BoysCultural = mongoose.Schema({
    email:String,
})

const Boyscultural = mongoose.model('votersForChief', BoysCultural)
export default Boyscultural;