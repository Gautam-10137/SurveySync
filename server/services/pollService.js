const Poll=require('../models/Poll')

const pollService={
    createPoll: async(pollData)=>{
        const { questions, creator } = pollData;
        const newPoll=new Poll({
            questions:questions.map((question)=>({
              questionText:question.questionText,
           choices:question.choices.map((choiceText)=>({choiceText,votes:0})),
        })),
            creator
        });
        await newPoll.save();
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
            const updatedPoll=Poll.findByIdAndUpdate(
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
    validatePoll: (selectedChoices,pollQuestions)=>{
        for(const question of pollQuestions){
            const selectedChoiceIndex=selectedChoices[question._id];

            if(selectedChoiceIndex==undefined || selectedChoiceIndex==null){
                return false;
            }
            if(selectedChoiceIndex<0 || selectedChoiceIndex>=question.choices.length){
                return false;
            }
            return true;
        }
    },
    submitVote:async(selectedChoices,pollId)=>{
                try{
                    const poll= Poll.findById(pollId);
                    if(!poll){
                        return { success:false, message:'Poll Not Found!'};
                    }
                    const validatePoll=pollService.validatePoll(selectedChoices,poll.questions);
                    if(!validatePoll){
                        return {success:false,message:'Invalid vote Structure!'};
                    }
                    poll.questions.forEach((question,questionIndex)=>{
                        const selectedChoiceIndex= selectedChoices[questionIndex];
                        poll.questions[questionIndex].questions.choices[selectedChoiceIndex].vote+=1;
                    }
                    )
                    await poll.save();
                    return res.status(200).json({message:"Vote Submitted Successfully"});
                }
                catch(error){
                    res.status(500).json({error:error.message});
                }
    }



}
module.exports=pollService;