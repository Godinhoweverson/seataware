INSERT INTO transport_types (name)
VALUES
('Bus'),
('Luas'),
('Train'),
('DART');

INSERT INTO issue_types (name, description)
VALUES
('Priority Seat Misuse', 'Priority seats occupied by passengers who may not need them.'),
('Overcrowding', 'Vehicle is overcrowded.'),
('Accessibility Issue', 'Accessibility-related issue.'),
('Driver Behaviour', 'Issue related to driver behaviour.'),
('Cleanliness', 'Cleanliness issue on the vehicle.'),
('Safety', 'Passenger safety concern.'),
('Other', 'Any other issue.');


INSERT INTO users (full_name, email, password_hash, role)
VALUES
('John Murphy', 'john@test.com', '$2b$10$2mZ9sDwY5P4WnJk1YB0JxOsJgkD4e6Yk4H8mQJx2bX5t6YjWlM4qK', 'user'),
('Sarah Kelly', 'sarah@test.com', '$2b$10$2mZ9sDwY5P4WnJk1YB0JxOsJgkD4e6Yk4H8mQJx2bX5t6YjWlM4qK', 'user'),
('Michael Byrne', 'michael@test.com', '$2b$10$2mZ9sDwY5P4WnJk1YB0JxOsJgkD4e6Yk4H8mQJx2bX5t6YjWlM4qK', 'user'),
('Emma Doyle', 'emma@test.com', '$2b$10$2mZ9sDwY5P4WnJk1YB0JxOsJgkD4e6Yk4H8mQJx2bX5t6YjWlM4qK', 'user'),
('David Walsh', 'david@test.com', '$2b$10$2mZ9sDwY5P4WnJk1YB0JxOsJgkD4e6Yk4H8mQJx2bX5t6YjWlM4qK', 'user');

INSERT INTO reports
(
  user_id,
  route_id,
  issue_type_id,
  location_name,
  latitude,
  longitude,
  description,
  incident_datetime,
  status
)
VALUES
(1, 138, 1, 'O''Connell Street, Dublin', 53.3498, -6.2603,
 'Priority seat occupied by a passenger who refused to move after being asked.',
 '2026-07-05 08:30:00', 'pending'),

(2, 140, 2, 'Heuston Station, Dublin', 53.3463, -6.2922,
 'Vehicle was overcrowded and several passengers could not board.',
 '2026-07-05 17:20:00', 'approved'),

(3, 225, 4, 'Tallaght Luas Stop', 53.2868, -6.3731,
 'Driver ignored a passenger requesting accessibility assistance.',
 '2026-07-06 09:10:00', 'resolved'),

(4, 242, 3, 'Ranelagh Luas Stop', 53.3255, -6.2525,
 'Wheelchair space was blocked by bicycles.',
 '2026-07-06 15:45:00', 'pending'),

(5, 130, 5, 'Cork Kent Station', 51.9016, -8.4584,
 'Station platform seating area was dirty.',
 '2026-07-07 11:15:00', 'approved'),

(6, 140, 1, 'Bray Station', 53.2024, -6.1102,
 'Passenger refused to leave the priority seating area.',
 '2026-07-07 18:00:00', 'pending'),

(7, 138, 4, 'Parnell Street, Dublin', 53.3534, -6.2656,
 'Driver closed the doors before an elderly passenger had boarded.',
 '2026-07-08 08:05:00', 'resolved'),

(8, 225, 2, 'Red Cow Luas Stop', 53.3167, -6.3698,
 'Vehicle exceeded safe passenger capacity.',
 '2026-07-08 17:40:00', 'approved'),

(1, 242, 3, 'Sandyford Luas Stop', 53.2777, -6.2165,
 'Accessibility button at the stop was not functioning.',
 '2026-07-09 09:25:00', 'pending'),

(2, 130, 5, 'Galway Ceannt Station', 53.2746, -9.0489,
 'Poor lighting around the waiting area.',
 '2026-07-09 20:10:00', 'pending'),

(3, 138, 1, 'St Stephen''s Green', 53.3381, -6.2591,
 'Priority seat occupied while an elderly passenger was standing.',
 '2026-07-10 13:20:00', 'approved'),

(4, 225, 2, 'The Point Luas Stop', 53.3488, -6.2286,
 'Large crowd prevented passengers from entering.',
 '2026-07-10 17:50:00', 'resolved'),

(5, 242, 4, 'Beechwood Luas Stop', 53.3208, -6.2484,
 'Driver departed before a visually impaired passenger was seated.',
 '2026-07-11 08:15:00', 'pending'),

(6, 140, 3, 'Pearse Station', 53.3437, -6.2496,
 'Lift to the platform was out of service.',
 '2026-07-11 10:45:00', 'approved'),

(7, 130, 5, 'Limerick Colbert Station', 52.6589, -8.6232,
 'Passenger information display was blank.',
 '2026-07-11 19:00:00', 'pending'),

(8, 138, 4, 'Drumcondra Station', 53.3693, -6.2525,
 'Driver failed to announce the next stop.',
 '2026-07-12 07:55:00', 'resolved'),

(1, 225, 1, 'Smithfield Luas Stop', 53.3481, -6.2785,
 'Passenger ignored multiple requests to vacate priority seating.',
 '2026-07-12 16:10:00', 'approved'),

(2, 242, 2, 'Charlemont Luas Stop', 53.3304, -6.2587,
 'Tram became overcrowded during peak hours.',
 '2026-07-13 08:40:00', 'pending'),

(3, 130, 3, 'Waterford Plunkett Station', 52.2613, -7.1118,
 'Platform access ramp was obstructed by maintenance equipment.',
 '2026-07-13 12:15:00', 'approved'),

(4, 140, 5, 'Connolly Station, Dublin', 53.3523, -6.2507,
 'Public announcement system was not working correctly.',
 '2026-07-13 18:45:00', 'pending');