import mongoose from 'mongoose'; 

const adminSchema = mongoose.Schema({
    email: {
        type: String,
    },
    time: String,
});
const Permissions = mongoose.model('Permissions', adminSchema);
export default Permissions;