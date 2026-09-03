CREATE TABLE IF NOT EXISTS bookings (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  gender VARCHAR(40) NOT NULL,
  email VARCHAR(180) NOT NULL,
  mobile VARCHAR(25) NOT NULL DEFAULT '',
  service VARCHAR(80) NOT NULL,
  appointment_time DATETIME(3) NOT NULL,
  timezone VARCHAR(80),
  notes TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'received',
  created_at DATETIME(3) NOT NULL,
  INDEX idx_bookings_appointment_time (appointment_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
