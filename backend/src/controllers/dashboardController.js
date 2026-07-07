const db = require("../config/db");

const getDashBoardStats = (req, res) =>{
    const totalReportsSql = `
        SELECT COUNT(*) AS totalReports
        FROM reports
    `;

    const mostReportedRouteSql =`
        SELECT 
            rt.route_name,
            COUNT(*) AS total
        FROM reports r
        JOIN routes rt ON r.route_id = rt.route_id
        GROUP BY rt.route_name
        ORDER BY total DESC
        LIMIT 1
  `;

     const mostCommonIssueSql = `
        SELECT 
            it.name AS issue_type,
            COUNT(*) AS total
        FROM reports r
        JOIN issue_types it ON r.issue_type_id = it.issue_type_id
        GROUP BY it.name
        ORDER BY total DESC
        LIMIT 1
    `;

  const reportsByTransportSql = `
        SELECT 
            tt.name AS transport_type,
            COUNT(*) AS total
        FROM reports r
        JOIN routes rt ON r.route_id = rt.route_id
        JOIN transport_types tt ON rt.transport_type_id = tt.transport_type_id
        GROUP BY tt.name
        ORDER BY total DESC
    `;

    const reportsByIssueSql = `
        SELECT 
            it.name AS issue_type,
            COUNT(*) AS total
        FROM reports r
        JOIN issue_types it ON r.issue_type_id = it.issue_type_id
        GROUP BY it.name
        ORDER BY total DESC
    `;

    db.query(totalReportsSql, (err, totalResult) => {
        if (err){
            return res.status(500).json({ message: "Database error", error: err.message });
        } 

        db.query(mostReportedRouteSql, (err, routeResult) => {
            if (err){
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            db.query(mostCommonIssueSql, (err, issueResult) => {
                if (err){
                    return res.status(500).json({ message: "Database error", error: err.message });
                }
                db.query(reportsByTransportSql, (err, transportResult) => {
                    if (err) {
                        return res.status(500).json({ message: "Database error", error: err.message });
                    }
                    db.query(reportsByIssueSql, (err, issueStatsResult) =>{
                        if (err) {
                            return res.status(500).json({ message: "Database error", error: err.message });
                        }
                        res.status(200).json({
                            totalReports: totalResult[0].totalReports,
                            mostReportedRoute: routeResult[0] || null,
                            mostCommonIssue: issueResult[0] || null,
                            reportsByTransport: transportResult,
                            reportsByIssue: issueStatsResult,
                        });
                    });
                   
                });
            });
        });
    });
}

const latestReports = (req, res) => {
    const latestReportsSql = `
        SELECT
            r.report_id,
            rt.route_name,
            it.name AS issue_type,
            r.status,
            r.created_at
        FROM reports r
        JOIN routes rt ON r.route_id = rt.route_id
        JOIN issue_types it ON r.issue_type_id = it.issue_type_id
        ORDER BY r.created_at DESC
        LIMIT 5;`

    db.query(latestReportsSql, (err, reports) =>{
        if(err){
            return res.status(500).json({
                message: "Data error",
                error: err.message
            });
        }

        res.status(200).json({
            latestReports: reports
        })
    });
}

module.exports = {getDashBoardStats, latestReports};