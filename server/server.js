const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 
const projectRoutes = require('./routes/projectRoutes');
const {sequelize} = require('./config/index')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());  
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/', projectRoutes);

sequelize.sync();
// sequelize.drop()




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
