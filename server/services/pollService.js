const Poll=require('../models/Poll')

const pollService={
    createPoll: async(pollData)=>{
        const newPoll=new Poll(pollData);
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
    }

}
module.exports=pollService;