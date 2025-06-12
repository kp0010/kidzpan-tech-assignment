DROP TABLE IF EXISTS children, milestones, child_milestones_progress CASCADE;

-- Children Table
CREATE TABLE children (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER NOT NULL,
    name VARCHAR(127) NOT NULL,
    age INTEGER NOT NULL
);

-- Milestones Table
CREATE TABLE milestones (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    age_group INT4RANGE,
    is_custom BOOL DEFAULT FALSE
);

-- Child Milestones Progress Table
CREATE TABLE child_milestones_progress (
    child_id INTEGER REFERENCES children(id) ON DELETE CASCADE,
    milestone_id INTEGER REFERENCES milestones(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('in_progress', 'complete')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(child_id, milestone_id)
);
