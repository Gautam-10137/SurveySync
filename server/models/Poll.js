const mongoose=require('mongoose');

// Schema for questions
const questionSchema=new mongoose.Schema({
    text:{type:String , required:true},
    choices:[{type:String , required:true}],
});

// Schema for poll
const pollSchema=new mongoose.Schema({
    questions:[questionSchema],
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    createdAt:{type:Date , default:Date.now()}
})

module.exports=mongoose.model('Poll',pollSchema);