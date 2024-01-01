const express=require('express');
const router=express.Router();
const pollController=require('../controllers/PollController');
const config=require('../config')
const jwt=require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }
  
    const token = authHeader.split(' ')[1];
    // console.log('token:',token);
    
  
    jwt.verify(token, config.secret, (err, user) => {
      if (err) return res.sendStatus(403);  
      const { id, username } = user;
    //   req.user = { id, username };
      next();
    });
  }
router.post('/create',authenticateToken,pollController.createPoll);

router.get('/all',authenticateToken,pollController.getPolls);

router.get('/:pollId',authenticateToken,pollController.getPollDetails);

router.delete('/:pollId',authenticateToken,pollController.deletePoll);

router.post('/:pollId/vote',authenticateToken,pollController.submitVote);

router.get('/:userId/profile',authenticateToken,pollController.getProfile);

router.get('/category/:categoryId',authenticateToken,pollController.getCategoryPolls);

router.post('/update/:pollId',authenticateToken,pollController.updatePoll);

module.exports=router;