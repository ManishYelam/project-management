const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');  // Ensure the path is correct

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results, metadata] = await sequelize.query(
      'CALL UserLogin(:email, :password)', 
      {
        replacements: { email, password },
        type: QueryTypes.SELECT 
      }
    );
    res.status(200).json(results)

    console.log('Query Results:', results);  

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ Success: 'false', Message: 'An error occurred. Please try again.' });
  }
};

  

module.exports = {
  login
};
