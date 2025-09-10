-- Create the admin_data table for storing admin panel data
CREATE TABLE IF NOT EXISTS admin_data (
  key VARCHAR(255) PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_data_key ON admin_data(key);
