const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' })
})

// App routes
const userRoutes = require('./routes/user.route');
app.use('/users', userRoutes);

const vendorRoutes = require('./routes/vendor.route');
app.use('/vendors', vendorRoutes);

const productRoutes = require('./routes/product.route');
app.use('/products', productRoutes)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server start on port ', port)
});