const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


// App routes
const userRoutes = require('./routes/user.route');
app.get('/',(req,res)=>{
    res.json({message:'Server is running'})
})

app.use('/users', userRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server start on port ', port)
});