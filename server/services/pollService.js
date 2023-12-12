const Poll=require('../models/Poll')
const User=require('../models/User')
const pollService={
    createPoll: async(pollData)=>{
        const { title,description,questions, creator } = pollData;
        const newPoll=new Poll({
            title:title,
            description:description,
            questions:questions.map((question)=>({
              questionText:question.questionText,
           choices:question.choices.map((choiceText)=>({choiceText,votes:0})),
        })),
            creator
        });
        newPoll.save();
        console.log(newPoll);
        await User.findByIdAndUpdate(creator,{$push:{createdPolls:newPoll._id}});
      
        return newPoll;
    },
    getPolls: async()=>{
        const polls= await Poll.find().populate('creator','username');
        return polls;
    },
    getPollDetails: async(pollId)=>{
       
        const pollDetails=await Poll.findById(pollId).populate('creator','username');
        
        return pollDetails;
    },
    updateDetails: async(pollId,questions)=>{
        try{
            const updatedPoll=await Poll.findByIdAndUpdate(
                pollId,
                {$set: {questions}},
                {new: true}
            );
            return updatedPoll;
        }
        catch (error){
            console.error(error);
            throw new Error('Failed to update Poll');
        }
    },
    deletePoll: async(pollId)=>{
        const deletedPoll=Poll.findByIdAndDelete(pollId);
        return deletedPoll;
    },
    validatePoll:  (selectedChoices,pollQuestions)=>{

        for(const question of pollQuestions){
           
            const selectedChoiceIndex=selectedChoices[question._id];
            
            if(selectedChoiceIndex==undefined || selectedChoiceIndex==null){
                return false;
            }
            if(selectedChoiceIndex<0 || selectedChoiceIndex>=question.choices.length){
                return false;
            }
           
        }
         return true;
    },
    submitVote:async(selectedChoices,pollId,userId)=>{
                try{
                    const poll=  await Poll.findById(pollId);
                    
                    if(!poll){
                        return { success:false, message:'Poll Not Found!'};
                    }
                    
                    const validatePoll= pollService.validatePoll(selectedChoices,poll.questions);
                    
                    if(!validatePoll){
                
                        return {success:false,message:'Invalid vote Structure!'};
                    }
                    
                   console.log("submitting vote");
                     poll.questions.forEach((question,questionIndex)=>{
                       
                        const selectedChoiceIndex= selectedChoices[question._id];
                        

                        poll.questions[questionIndex].choices[selectedChoiceIndex].votes+=1;
                    }
                    )
                    
                    await poll.save();
                    console.log("Vote saved");
                    
                    await User.findByIdAndUpdate(userId,{$push:{participatedPolls:pollId}});
                    return { success: true, message: 'Vote Submitted Successfully' };
                }
                catch(error){
                    
                    return { success: false, message: error.message };
                }
    },
    getProfile: async(userId)=>{   
                console.log(userId);     
                const userDetail=await User.findById(userId).populate('createdPolls').populate('participatedPolls');            
                return userDetail;        
    }

}
module.exports=pollService;