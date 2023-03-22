import mongoose from "mongoose";

 const  voteCount = mongoose.Schema({
     name: String,
     email:String,
 })
const voteCounts = mongoose.model('VotersCollection', voteCount)

export default voteCounts;
