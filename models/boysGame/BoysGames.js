import mongoose from 'mongoose';

const BoysGames = mongoose.Schema({
    email:String,
})

const Boysgames = mongoose.model('votersForChief', BoysGames)
export default Boysgames;