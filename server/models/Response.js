const mongoose= require('mongoose');

const responseSchema= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    pollId:{type:mongoose.Schema.Types.ObjectId, ref:'Poll',required:true},
    choices:{type:String, required:true},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Response',responseSchema);