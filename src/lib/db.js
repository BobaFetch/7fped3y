import sqlite from 'better-sqlite3';

const db = new sqlite('./monette.sqlite');

const initialize = `
CREATE TABLE IF NOT EXISTS contacts(
  contact_id INTEGER NOT NULL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT,
  info TEXT,
  description TEXT,
  location TEXT,
  owner_id INTEGER NOT NULL);

CREATE TABLE IF NOT EXISTS users(
  user_id INTEGER NOT NULL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT,
  company_id INTEGER,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT);

CREATE TABLE IF NOT EXISTS companies(
  company_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS deals(
  client_id INTEGER NOT NULL,
  owner_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  dealName TEXT NOT NULL,
  active TINYINT NOT NULL,
  status TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS socials(
  social_id INTEGER NOT NULL PRIMARY KEY,
  contact_id INTEGER NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  followers TEXT
);


  `;

db.exec(initialize);

// const firstRun = `INSERT INTO contacts(firstName, lastName, email, phone, category, info, description, location, owner_id) VALUES
// ('Antoinette', 'Victoria', 'antoinette@mail.com', NULL, 'Fashion Blogger', NULL, NULL, 'New York,NY', 1),
// ('Kara', 'Jewel', 'kara@mail.com', '555-555-5555', 'Influencer', NULL, NULL, 'Los Angeles,CA', 2),
// ('David', 'Robb', 'david@mail.com', '555-555-7575', 'Comedian', NULL, NULL, 'Toronto,ON', 1);

// INSERT INTO users(firstName, lastName, company_id, email, phone, role) VALUES
// ('Amanda', 'Emmanuel', 1, 'amanda@company.com', '555-555-1415', 'Admin'),
// ('Bianca', 'Chatham', 1, 'bianca@company.com', NULL, 'Editor');

// INSERT INTO companies(name, admin_id) VALUES('Dealflow');

// INSERT INTO deals(client_id, owner_id, team_id, dealName, active, status) VALUES
// (2, 2, 1, 'Kara Jewel X iOS App Promo', 0, 'Paid'),
// (2, 1, 1, 'Kara Jewel', 1, 'Lead');

// INSERT INTO socials(contact_id, platform, url, followers) VALUES
// (3, 'Instagram', 'https://instagram.com', '250k'),
// (3, 'Youtube', 'https://youtube.com', '500k'),
// (2, 'TikTok', 'https://tiktok.com', '175k'),
// (2, 'Instagram', 'https://instagram.com', '250k'),
// (1, 'TikTok', 'https://tiktok.com', '200k'),
// (1, 'Instagram', 'https://instagram.com', '54k'),
// (1, 'Twitter', 'https://twitter.com', '2k');
// `;

// db.exec(firstRun);

export default db;
