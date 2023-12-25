const mongoose= require('mongoose');

const responseSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User',required},
    pollId:{type:mongoose.Schema.Types.ObjectId, ref:'Poll',required},
    choices:{type:String, required},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Response',responseSchema);