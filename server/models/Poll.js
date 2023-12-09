const mongoose=require('mongoose');

// Schema for choices
const choiceSchema=new mongoose.Schema({
    choiceText:{type:String,required:true},
    votes:{type:Number,default:0}
})
// Schema for questions
const questionSchema=new mongoose.Schema({
    questionText:{type:String , required:true},
    choices:[choiceSchema],
});

// Schema for poll
const pollSchema=new mongoose.Schema({
    questions:[questionSchema],
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    createdAt:{type:Date , default:Date.now()}
})

module.exports=mongoose.model('Poll',pollSchema);