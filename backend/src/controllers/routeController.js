const db = require("../config/db");

const getRoutes = (req, res) =>{

    const sql = `
        SELECT *
        FROM routes
        ORDER BY route_name ASC
    `;

    db.query(sql, (err, routes) =>{
        
        if(err){
            return res.status(500).json({
                message: "Database error.",
                error: err.message
            });
        }

        res.status(200).json(routes);
    });

};

module.exports = {getRoutes};