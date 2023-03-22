import mongoose from 'mongoose';

const GirlsGames = mongoose.Schema({
    email:String,
})

const Girlsgames = mongoose.model('votersForChief', GirlsGames)
export default Girlsgames;