CREATE TABLE `user` (
  `username` varchar(50) PRIMARY KEY,
  `user_type` char(1),
  `email` varchar(255),
  `password` varchar(255),
  `name` varchar(255),
  `description` varchar(255),
  `profile_img` varbinary(8000),
  `created_at` timestamp
);

CREATE TABLE `modules` (
  `module_id` integer PRIMARY KEY,
  `username` varchar(50),
  `title` varchar(255),
  `description` varchar(255),
  `no_of_quizzes` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `quizzes` (
  `quiz_id` integer PRIMARY KEY,
  `module_id` integer,
  `title` varchar(255),
  `no_of_que` int,
  `total_attempted` int,
  `open_to_Guest` bit,
  `created_at` timestamp
);

CREATE TABLE `questions` (
  `que_id` integer PRIMARY KEY,
  `quiz_id` integer,
  `question` varchar(500),
  `image` varbinary(8000),
  `optionA` varchar(255),
  `optionB` varchar(255),
  `optionC` varchar(255),
  `optionD` varchar(255),
  `correct_option` char,
  `explanation` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `responses` (
  `response_id` integer PRIMARY KEY,
  `username` varchar(50),
  `quiz_id` integer,
  `marks` int,
  `attempt_no` int,
  `response` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `guest_responses` (
  `guest_name` varchar(50),
  `quiz_id` integer,
  `score` int,
  `created_at` timestamp
);

CREATE UNIQUE INDEX `guest_responses_index_0` ON `guest_responses` (`guest_name`, `quiz_id`);

ALTER TABLE `guest_responses` ADD FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`);

ALTER TABLE `modules` ADD FOREIGN KEY (`username`) REFERENCES `user` (`username`);

ALTER TABLE `quizzes` ADD FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`);

ALTER TABLE `questions` ADD FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`);

ALTER TABLE `responses` ADD FOREIGN KEY (`username`) REFERENCES `user` (`username`);

ALTER TABLE `responses` ADD FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`);
