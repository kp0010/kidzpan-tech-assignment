-- Clean existing data
TRUNCATE child_milestones_progress, milestones, children RESTART IDENTITY CASCADE;

-- Inserting Children
INSERT INTO children (parent_id, name, age) VALUES
(1001, 'Aarav', 2),
(1002, 'Meera', 3),
(1003, 'Vihaan', 4);

-- Inserting Milestones
INSERT INTO milestones (title, description, age_group, is_custom) VALUES
-- Pre-Defined Milestones that are not custom
('Speak 2 words', 'Child can say words like “mama”, “dada”.', '[2,3)'::int4range, FALSE),
('Walk unassisted', 'Child walks without support.', '[2,3)'::int4range, FALSE),
('Use short sentences', 'Forms 2–3 word sentences.', '[3,4)'::int4range, FALSE),
('Follow instructions', 'Follows simple commands.', '[3,4)'::int4range, FALSE),
('Draw shapes', 'Can draw circles or squares.', '[4,5)'::int4range, FALSE),
('Identify colors', 'Identifies common colors.', '[4,5)'::int4range, FALSE),
('Count to 10', 'Counts up to 10 objects.', '[4,5)'::int4range, FALSE),

-- Custom Milestones
('Say pet’s name', 'Says the name of the family’s pet.', NULL, TRUE),
('Clap to music', 'Claps hands in rhythm.', NULL, TRUE),
('Ride tricycle', 'Can ride a tricycle in the park.', NULL, TRUE);

-- Inserting progress for children
INSERT INTO child_milestones_progress (child_id, milestone_id, status) VALUES
(1, 1, 'complete'),
(1, 2, 'in_progress'),
(1, 8, 'in_progress');

INSERT INTO child_milestones_progress (child_id, milestone_id, status) VALUES
(2, 3, 'complete'),
(2, 4, 'in_progress'),
(2, 9, 'in_progress');

INSERT INTO child_milestones_progress (child_id, milestone_id, status) VALUES
(3, 5, 'in_progress'),
(3, 6, 'complete'),
(3, 10, 'in_progress');
