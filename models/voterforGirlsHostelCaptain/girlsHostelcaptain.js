import mongoose from 'mongoose';

const GirlsHostelCounselor = mongoose.Schema({
    email:String,
})

const Girlshostelcounselor = mongoose.model('votersForChief', GirlsHostelCounselor)
export default Girlshostelcounselor;