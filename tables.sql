CREATE TABLE IF NOT EXISTS artist(
	id SERIAL PRIMARY KEY,
	name TEXT,
	artist_cover TEXT
);

CREATE TABLE IF NOT EXISTS song(
	id SERIAL PRIMARY KEY,
	title TEXT,
	artist_id INTEGER
);

CREATE TABLE IF NOT EXISTS verse(
	id SERIAL PRIMARY KEY,
	content TEXT,
	position INTEGER,
	song_id INTEGER
);

CREATE TABLE IF NOT EXISTS interpretation(
	id SERIAL PRIMARY KEY,
	content TEXT,
	likes INTEGER,
	verse_id INTEGER
);