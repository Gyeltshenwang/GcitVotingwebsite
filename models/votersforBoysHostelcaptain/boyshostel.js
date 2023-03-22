import mongoose from 'mongoose';

const BoysHostelCounselor = mongoose.Schema({
    email:String,
})

const Boyshostelcounselor = mongoose.model('votersForChief', BoysHostelCounselor)
export default Boyshostelcounselor;