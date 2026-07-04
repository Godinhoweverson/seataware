USE seataware_db;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transport_types (
  transport_type_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE routes (
  route_id INT AUTO_INCREMENT PRIMARY KEY,
  transport_type_id INT NOT NULL,
  route_name VARCHAR(100) NOT NULL,
  operator_name VARCHAR(100),
  FOREIGN KEY (transport_type_id) REFERENCES transport_types(transport_type_id)
);

CREATE TABLE issue_types (
  issue_type_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE reports (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  route_id INT NOT NULL,
  issue_type_id INT NOT NULL,
  location_name VARCHAR(150) NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  description TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  incident_datetime TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (route_id) REFERENCES routes(route_id),
  FOREIGN KEY (issue_type_id) REFERENCES issue_types(issue_type_id)
);

CREATE TABLE admin_actions (
  action_id INT AUTO_INCREMENT PRIMARY KEY,
  admin_user_id INT NOT NULL,
  report_id INT NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  notes TEXT,
  action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_user_id) REFERENCES users(user_id),
  FOREIGN KEY (report_id) REFERENCES reports(report_id)
);