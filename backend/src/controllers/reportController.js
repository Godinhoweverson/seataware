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

//Get all reports
const getReports = (req, res) =>{
     
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const countSql = `SELECT COUNT(*) AS total FROM reports`;
    const selectSql = `
        SELECT
            r.report_id,
            r.route_id,
            r.issue_type_id,
            r.location_name,
            r.description,
            r.status,
            r.incident_datetime,
            r.created_at,
            rt.route_name,
            rt.operator_name,
            rt.transport_type_id,
            tt.name AS transport_type,
            it.name AS issue_type
            FROM reports r
            JOIN routes rt ON r.route_id = rt.route_id
            JOIN transport_types tt ON rt.transport_type_id = tt.transport_type_id
            JOIN issue_types it ON r.issue_type_id = it.issue_type_id
            ORDER BY r.created_at DESC
            LIMIT ? OFFSET ?
    `;

    db.query(countSql, (err, countResult) => {
        if(err){
            return res.status(500).json({
                message: "Database error."
            });
        }

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        db.query(selectSql, [limit, offset], (err, reports) => {
            if(err){
                return res.status(500).json({
                    message: "Database error."
                });
            }

            res.status(200).json({
                message: "Reports retrieved successfully",
                reports,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalReports: total,
                    limit
                }
            });
        });
    });
};

// GET one specific report
const getReport = (req, res) =>{
     
    const {report_id } = req.params;
    
    const sql = `
        SELECT
        r.report_id,
        r.location_name,
        r.description,
        r.status,
        r.incident_datetime,
        r.created_at,
        rt.route_name,
        rt.operator_name,
        tt.name AS transport_type,
        it.name AS issue_type,
        u.full_name AS reported_by
        FROM reports r
        JOIN users u ON r.user_id = u.user_id
        JOIN routes rt ON r.route_id = rt.route_id
        JOIN transport_types tt ON rt.transport_type_id = tt.transport_type_id
        JOIN issue_types it ON r.issue_type_id = it.issue_type_id
        ORDER BY r.created_at DESC
    `;

    db.query(sql, [report_id], async(err, reports) =>{
        if(err){
            return res.status(500).json({
                message: "Database error",
            });
        }

        if(reports.length === 0){
            return res.status(404).json({
                message:"Report not found."
            });
        }

        const user = reports[0];

        res.status(200).json({
            message: "Report retrieved successfully",
        });
    });
}

// Update Report
const UpdateReport = (req, res) =>{
    const {report_id} = req.params;
    const user_id = req.user.user_id;
    const user_role = req.user.role;

    const{
        issue_type_id,
        route_id,
        location_name,
        incident_datetime,
        description
    } = req.body;

    if(!issue_type_id || !route_id || !location_name || ! incident_datetime || !description){
        return res.status(400).json({
            message: "All fields are required,",
        });
    }
    
    const sql = "SELECT * FROM reports WHERE report_id = ?";

    db.query(sql, [report_id] , (err, reports) => {

        if(err){
            return res.status(404).json({
                message: "Database error."
            });
        }

        if(reports.length === 0){
            return res.status(404).json({
                message: "Report not found."
            });
        }

        const report = reports[0];

        if(report.user_id !== user_id && user_role !== "admin"){
            return res.status(403).json({
                message: "You are not allowed to update this report."
            });
        }

        const updateSql =  `
            UPDATE reports
            SET
                issue_type_id = ?,
                route_id = ?,
                location_name = ?,
                incident_datetime = ?,
                description = ?
            WHERE report_id = ?
            `;

        db.query(updateSql, 
            [
                issue_type_id,
                route_id,
                location_name,
                incident_datetime,
                description,
                report_id
            ],
            (err) =>{
                if(err){
                    return res.status(500).json({
                        message: "Failed to update report.",
                        error: err.message
                    });
                }

                res.status(200).json({
                    message: "Report updated successfully."
                });
            }
        );
    });
};

// Delete Report
const deleteReport = (req, res) => {
    const { report_id } = req.params;
    const user_id = req.user.user_id;
    const user_role = req.user.role;

    const sql = `SELECT * FROM reports WHERE report_id = ?`;

    db.query(sql, [report_id], (err, reports) => {

        if (err) {
            return res.status(500).json({
                message: "Database error.",
                error: err.message
            });
        }

        if (reports.length === 0) {
            return res.status(404).json({
                message: "Report not found."
            });
        }

        const report = reports[0];

        if (report.user_id !== user_id && user_role !== "admin") {
            return res.status(403).json({
                message: "You are not allowed to delete this report."
            });
        }

        const deleteSql = `DELETE FROM reports WHERE report_id = ?`;

        db.query(deleteSql, [report_id], (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to delete report.",
                    error: err.message
                });
            }

            res.status(200).json({
                message: "Report deleted successfully."
            });

        });

    });
};

module.exports = { report, getReport, getReports, UpdateReport, deleteReport};