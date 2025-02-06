CREATE TABLE users (
  id SERIAL PRIMARY KEY,               -- Unique user ID
  email VARCHAR(255) UNIQUE NOT NULL,   -- User's email (for login)
  password VARCHAR(255) NOT NULL,       -- User's hashed password
  first_name VARCHAR(255),              -- Optional: User's first name
  last_name VARCHAR(255),               -- Optional: User's last name
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the user was created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When user info was last updated
);

CREATE TABLE itineraries (
  id SERIAL PRIMARY KEY,                      -- Unique itinerary ID
  user_id INT REFERENCES users(id),           -- Foreign key to the users table
  destination VARCHAR(255),                    -- Destination (e.g., Paris, New York)
  start_date DATE,                             -- Start date of the itinerary
  end_date DATE,                               -- End date of the itinerary
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the itinerary was created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When itinerary was last updated
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,                     -- Unique activity ID
  itinerary_id INT REFERENCES itineraries(id), -- Foreign key to the itineraries table
  name VARCHAR(255),                          -- Activity name (e.g., Eiffel Tower Tour)
  description TEXT,                           -- Detailed description of the activity
  type VARCHAR(255),                          -- Activity type (e.g., sightseeing, food, adventure)
  start_time TIMESTAMP,                       -- Start time of the activity
  end_time TIMESTAMP,                         -- End time of the activity
  location VARCHAR(255),                      -- Location of the activity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the activity was added
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When the activity was last updated
);