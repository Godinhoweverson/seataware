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