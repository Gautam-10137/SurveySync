const pollService=require('../services/pollService');

const pollController={
    createPoll: async(req,res)=>{
        try{
            const newPoll=await pollService.createPoll(req.body);
            res.status(201).json(newPoll);
        }
        catch (error){
            res.status(500).json({error: error.message});
        }
    },
    getPolls : async(req,res)=>{
        try{
            const polls=await pollService.getPolls();
            res.status(200).json(polls);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },
    getPollDetails: async (req,res)=>{
        try{
            const pollDetails=await pollService.getPollDetails(req.params.id);
            res.status(200).json(pollDetails);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },
    updatePoll : async (req,res)=>{
        try{
            const {pollId}=req.params;
            const {questions}=req.body;
            const updatedPoll=await pollService.updateDetails(pollId,questions);
            if(!updatedPoll){
                return res.status(404).json({message:'Poll Not Found'});
            }
            res.status(200).json(updatedPoll);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },
    deletePoll: async(req,res)=>{
        try{
            const {pollId}=req.params;
            const deletedPoll=await pollService.deletePoll(pollId);
            if(!deletedPoll){
                return res.status(404).json({message:'Poll Not Found!'});
            }
            res.status(200).json(deletedPoll);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },
    submitVote: async(req,res)=>{
        try{
            const {pollId}=req.params;
            const {selectedChoices}=req.body;
              
            const result= await pollService.submitVote(selectedChoices,pollId);
            if(result.sucess){
                res.status(200).json({message:result.message});
            }
            else{
                res.status(404).json({message:result.message});
            }
           
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }

}

module.exports=pollController;