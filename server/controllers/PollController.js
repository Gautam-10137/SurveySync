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
            const id=req.params.pollId;
            
            const pollDetails=await pollService.getPollDetails(id);
            res.status(200).json(pollDetails);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },
    updatePoll : async (req,res)=>{
        try{
            const pollId=req.params.pollId;
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
            const pollId=req.params.pollId;
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
            const pollId=req.params.pollId;
          
            const {selectedChoices,userId}=req.body;
            
            const result= await pollService.submitVote(selectedChoices,pollId,userId);
            
            if(result.success){
                res.status(200).json({message:result.message});
            }
            else{
                res.status(404).json({message:result.message});
            }
           
        }
        catch(error){
           
            res.status(500).json({error:error.message});
        }
    },
    getProfile: async(req,res)=>{
        try{
          
            const userId=req.params.userId;
            const result=await pollService.getProfile(userId);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },
    getCategoryPolls: async(req,res)=>{
        try{
            const categoryId=req.params.categoryId;
            const result=await pollService.getCategoryPolls(categoryId);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    }

}

module.exports=pollController;