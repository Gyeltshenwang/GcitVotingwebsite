import mongoose from 'mongoose';

const ChiefCounselor = mongoose.Schema({
    email:String,
})

const Chiefcounselor = mongoose.model('votersForChief', ChiefCounselor)
export default Chiefcounselor;