import mongoose from 'mongoose';

const GirlsPrayer = mongoose.Schema({
    email:String,
})

const Girlsprayer = mongoose.model('votersForChief', GirlsPrayer)
export default Girlsprayer;