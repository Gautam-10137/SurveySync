const express=require('express');
const router=express.Router();
const pollController=require('../controllers/PollController')

router.post('/create',pollController.createPoll);
router.get('/all',pollController.getPolls);
router.get('/:pollId',pollController.getPollDetails);
router.delete('/:pollId',pollController.deletePoll);

module.exports=router;