import mongoose, { Schema } from 'mongoose';
import Users from './auth.js';


const cannidatesSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // requird: true,
    },
    position: {
        type: String,
       // required:true,
    },

    photo:String,
        
    
    cv:  String,
        //required:true,
    
    menifesto: String,

    voters: {
        
        email:String
    },

    voteCount: {
        type:Number,
        default:0
    }
    ,
});
const CannidatesDetails = mongoose.model('CannidatesDetails', cannidatesSchema);
export default CannidatesDetails;
