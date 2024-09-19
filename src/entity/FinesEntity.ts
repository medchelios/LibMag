// fine_id	INT	PRIMARY KEY, AUTO_INCREMENT
// user_id	INT	FOREIGN KEY REFERENCES Users(user_id)
// borrow_id	INT	FOREIGN KEY REFERENCES BorrowRecords(record_id)
// fine_amount	DECIMAL(10,2)	NOT NULL
// paid	BOOLEAN	DEFAULT FALSE
// due_date	DATETIME	NOT NULL