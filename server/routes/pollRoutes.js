const express=require('express');
const router=express.Router();
const pollController=require('../controllers/PollController');
const config=require('../config')
const jwt=require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }
  
    const token = authHeader.split(' ')[1];
    console.log('token:');
    console.log(token);
  
    jwt.verify(token, config.secret, (err, user) => {
      if (err) return res.sendStatus(403);  
      const { id, username } = user;
    //   req.user = { id, username };
      next();
    });
  }
router.post('/create',pollController.createPoll);
// authenticateToken,
router.get('/all',pollController.getPolls);
// ,authenticateToken
router.get('/:pollId',pollController.getPollDetails);
// ,authenticateToken
router.delete('/:pollId',pollController.deletePoll);
// authenticateToken,
router.post('/:pollId/vote',pollController.submitVote);
// authenticateToken,

module.exports=router;