// record_id	INT	PRIMARY KEY, AUTO_INCREMENT
// user_id	INT	FOREIGN KEY REFERENCES Users(user_id)
// book_id	INT	FOREIGN KEY REFERENCES Books(book_id)
// borrow_date	DATETIME	NOT NULL, DEFAULT CURRENT_TIMESTAMP
// return_date	DATETIME	NULL (until returned)
// status	ENUM('borrowed', 'returned')	DEFAULT 'borrowed'