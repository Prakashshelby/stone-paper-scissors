const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const cors = require('cors');  

const app = express();
app.use(cors());  
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/stone-paper-scissors', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/api', gameRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
