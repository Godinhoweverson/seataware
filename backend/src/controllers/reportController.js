const db = require("../config/db");

//Report API
const report = (req, res) =>{
    const {
        issue_type_id,
        route_id,
        location_name,
        incident_datetime,
        description
    } = req.body;
    console.log(req.body);
    if(!issue_type_id ||
        !route_id ||
        !location_name ||
        !incident_datetime ||
        !description){
            return res.status(400).json({
                message: "All fields are required."
            });
    }

    const user_id = req.user.user_id;

    const sql = 
        `INSERT INTO reports (
        user_id,
        route_id,
        issue_type_id,
        location_name,
        description,
        incident_datetime
         )
        VALUES (?,?,?,?,?,?)`;

    db.query(sql,[
        user_id,
        route_id,
        issue_type_id,
        location_name,
        description,
        incident_datetime
        ],
        (err, result) =>{
            if(err){
                return res.status(500).json({
                    message:"Failed to create report.",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Report submitted successfully.",
                report_id: result.insertId
            });
        }
    );
}

module.exports = { report, };