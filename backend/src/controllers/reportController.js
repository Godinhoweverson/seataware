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
const getReports = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const { transport_type, route_id, issue_type_id, status } = req.query;

  let whereSql = " WHERE 1 = 1 ";
  const values = [];

  if (transport_type) {
    whereSql += " AND tt.name = ?";
    values.push(transport_type);
  }

  if (route_id) {
    whereSql += " AND r.route_id = ?";
    values.push(route_id);
  }

  if (issue_type_id) {
    whereSql += " AND r.issue_type_id = ?";
    values.push(issue_type_id);
  }

  if (status) {
    whereSql += " AND r.status = ?";
    values.push(status);
  }

  const countSql = `
    SELECT COUNT(*) AS total
    FROM reports r
    JOIN routes rt ON r.route_id = rt.route_id
    JOIN transport_types tt ON rt.transport_type_id = tt.transport_type_id
    JOIN issue_types it ON r.issue_type_id = it.issue_type_id
    ${whereSql}
  `;

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
    ${whereSql}
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(countSql, values, (err, countResult) => {
    if (err) {
      return res.status(500).json({
        message: "Database error.",
        error: err.message,
      });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(selectSql, [...values, limit, offset], (err, reports) => {
      if (err) {
        return res.status(500).json({
          message: "Database error.",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Reports retrieved successfully",
        reports,
        pagination: {
          currentPage: page,
          totalPages,
          totalReports: total,
          limit,
        },
      });
    });
  });
};

// GET one specific report
const getReport = (req, res) =>{
    
    const { report_id } = req.params;

    const sql = `
        SELECT *
        FROM reports
        WHERE report_id = ?
    `;

    db.query(sql, [report_id], (err, reports) => {
        if (err) {
        return res.status(500).json({
            message: "Database error",
            error: err.message,
        });
        }

        if (reports.length === 0) {
        return res.status(404).json({
            message: "Report not found.",
        });
        }

        res.status(200).json({
        message: "Report retrieved successfully",
        report: reports[0],
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