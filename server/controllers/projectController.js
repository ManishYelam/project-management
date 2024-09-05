const sequelize = require('../config/database'); // Adjust the path to your database configuration

const createProject = async (req, res) => {
  const {
    projectTheme,
    reason,
    projectType,
    division,
    category,
    priority,
    department,
    startDate,
    endDate,
    location,
    status
  } = req.body;

  try {
    await sequelize.query(
      'CALL CreateProject(:projectTheme, :reason, :projectType, :division, :category, :priority, :department, :startDate, :endDate, :location, :status)', 
      {
        replacements: {
          projectTheme,
          reason,
          projectType,
          division,
          category,
          priority,
          department,
          startDate,
          endDate,
          location,
          status
        }
      }
    );
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'An error occurred while creating the project' });
  }
};


const getSortedProjects = async (req, res) => {
    const { page = 1, limits = 9 } = req.query; 

    try {
        const offsets = (page - 1) * limits;
        const [projects] = await sequelize.query(
            `CALL GetProjectsWithPagination(:offsets, :limits)`,
            {
                replacements: { offsets, limits },
                type: sequelize.QueryTypes.SELECT
            }
        );

        // Total count of projects for pagination
        const [[totalCountResult]] = await sequelize.query(
            `SELECT COUNT(*) AS total FROM projects`
        );
        const totalCount = totalCountResult.total;

        res.status(200).json({
            projects,
            totalPages: Math.ceil(totalCount / limits),
            currentPage: parseInt(page),
            totalCount
        });
    } catch (error) {
        console.error('Error fetching sorted projects:', error);
        res.status(500).json({ error: 'Failed to fetch sorted projects' });
    }
};

const updateProjectStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ['Running', 'Closed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const [results] = await sequelize.query('CALL UpdateProjectStatus(:id, :status)', {
      replacements: { id, status },
    });
    res.json({ message: 'Project status updated successfully' });
    
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const counters=  async (req, res) => {
  try {
    const [results] = await sequelize.query(`CALL counters()`);
    res.json(results);
  } catch (error) {
    console.error('Error fetching project counters:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const closuredelay = async (req, res) => {
  try {
    const [results] = await sequelize.query(`CALL closuredelay()`);
    res.json(results);
  } catch (error) {
    console.error('Error fetching closure delay count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const projectDeptChart = async (req, res) => {
  try {
      // Replace with your direct SQL query
      const query = `
          SELECT 
              department,
              COUNT(*) AS totalRegistered,
              SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) AS totalClosed
          FROM 
              projects
          GROUP BY 
              department;
      `;
      
      const [rows] = await sequelize.query(query); // Execute the query

      // Log the result to debug
      console.log('Rows:', rows);

      if (Array.isArray(rows)) {
          // Extract data for chart
          const categories = rows.map(row => row.department);
          const registered = rows.map(row => row.totalRegistered);
          const closed = rows.map(row => row.totalClosed);

          res.json({ categories, registered, closed });
      } else {
          throw new Error('Unexpected result format');
      }
  } catch (err) {
      console.error('Error fetching chart data:', err.message);
      res.status(500).send('Server Error');
  }
};


module.exports = {
    createProject,
    getSortedProjects,
    updateProjectStatus,
    counters,
    closuredelay,
    projectDeptChart
}