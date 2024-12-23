create database college_db;

use college_db;

create table users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    email varchar(255) UNIQUE,
    password varchar(255),
    role ENUM('student','admin'),
    department varchar(255),
    year integer,
    attendance float
);

create table notes(
    id integer PRIMARY KEY AUTO_INCREMENT,
    title varchar(255),
    content text,
    uploaded_by integer,
    department varchar(255),
    uploaded_on timestamp NOT NULL DEFAULT NOW(),
    foreign key (uploaded_by) references users(id)
);

create table attendances(
    id integer AUTO_INCREMENT PRIMARY KEY,
    student_id integer,
    total_classes integer,
    present_classes integer,
    foreign key (student_id) references users(id)
);