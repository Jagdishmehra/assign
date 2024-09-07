const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const availabilityRoutes = require('./routes/availability');
const sessionRoutes = require('./routes/session');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/api/availability', availabilityRoutes);
app.use('/api/session', sessionRoutes);


mongoose.connect('mongodb+srv://jagdish:jagdish01@assingproject.xmxdl.mongodb.net/?retryWrites=true&w=majority&appName=assingProject', 

).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
