const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const apiRoutes=require('./routes/api')
const pollRoutes=require('./routes/pollRoutes')
const password=process.env.PASSWORD;
const port=process.env.PORT;
const app=express();

mongoose.connect(`mongodb+srv://pahwagautam47:${password}@cluster0.vmvwcul.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',err=>{
    console.log(`MongoDB Connection error : ${err}`)
})
db.once('open',()=>{
    console.log('Connected to MongoDB');
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
  }));
app.use('/polls',pollRoutes);
app.use('/api',apiRoutes);
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

