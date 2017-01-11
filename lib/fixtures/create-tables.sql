-- Create table
CREATE TABLE IF NOT EXISTS insights (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  url TEXT,
  type VARCHAR(30) NOT NULL
  CHECK (type IN
  ('Case Study', 'Paper', 'Presentation', 'Report', 'Video', 'Workshop Summary')
  ),
  author VARCHAR(50),
  org_id INTEGER REFERENCES organisations (id),
  creator_id INTEGER REFERENCES people (id),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  active BOOLEAN NOT NULL,
  resource BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS tags_insights (
  tags_id INTEGER REFERENCES tags (id),
  insights_id INTEGER REFERENCES insights (id)
);
