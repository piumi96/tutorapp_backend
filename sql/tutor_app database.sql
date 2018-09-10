create database tutor_app;

use tutor_app;

select*from tutor;
select*from student;

drop table Tutor;
drop table  Student;
drop table achievements;
drop table boost;
drop table chat;
drop table contactno;
drop table district;
drop table rate;
drop table review;
drop table subjects;
drop table suggestions;
drop table tutor_schedule;

create table Student(
	email varchar(30) primary key,
    pword varchar(100),
    name varchar(50),
    location varchar(20),
    mobile varchar(10)
);

create table Tutor(
	email varchar(30) primary key,
    pword varchar(100),
    FirstName varchar(20),
    LastName varchar(20),
    Location varchar(20),
    Mobile varchar(10),
    Subject varchar(20)
);

create table Boost(
	TutorID varchar(30),
    boostType varchar(20),
    price float,
    duration int,
    discount float,
    constraint primary key pk_boost (TutorID, boostType),
    constraint foreign key fk_boost (TutorID) references Tutor (username)
);

create table Achievements(
	TutorID varchar(30),
    AchievementID int,
    Achievement varchar(1000),
    constraint primary key pk_achieve (TutorID, AchievementID),
    constraint foreign key fk_achieve (TutorID) references Tutor (username)
);

create table Tutor_Schedule(
	TutorID varchar(30),
    Sch_Date date,
    Sch_time time,
    avaialability boolean,
    constraint primary key pk_schedule (TutorID, Sch_Date, Sch_time),
    constraint foreign key fk_schedule (TutorID) references Tutor (username)
);

create table District(
	TutorID varchar(30),
    districtID int,
    district varchar(20),
    constraint primary key pk_district (TutorID, districtID),
    constraint foreign key fk_district (TutorID) references Tutor (username)
);

create table Subjects(
	TutorID varchar(20),
    subjectID int,
    SubjectName varchar(50),
    SubjLevel varchar(30),
    price float,
    constraint primary key pk_subject (TutorID, subjectID, subjLevel),
    constraint foreign key fk_subject (TutorID) references Tutor (username)
    
);

create table ContactNo(
	TutorID varchar(30),
    contactNo char(10),
    constraint primary key pk_contact (TutorID, contactNo),
    constraint foreign key fk_contact (TutorID) references Tutor (username)
);

create table Request(
	ReqID int primary key,
	TutorID varchar(30),
    StudentID varchar(30),
    ReqStatus boolean,
    ReqDate date,
    ReqTime time,
    Req_SentDate date,
    constraint foreign key fk_TutRequest (TutorID) references Tutor (username),
    constraint foreign key fk_StudRequest (StudentID) references Student (username)
);

create table Review(
	ReviewID int,
    TutorID varchar(30),
    StudentID varchar(30),
    RevDate date,
    content varchar(1000),
    constraint foreign key fk_TutRev (TutorID) references Tutor (username),
    constraint foreign key fk_StudRev (StudentID) references Student (username)
);

create table Rate(
	RateID int,
    TutorID varchar(30),
    StudentID varchar(30),
    Rate float,
    constraint foreign key fk_TutRate (TutorID) references Tutor (username),
    constraint foreign key fk_StudRate (StudentID) references Student (username)
);

create table Chat(
	ChatID int,
    TutorID varchar(30),
    StudentID varchar(30),
    ChatDate date,
    ChatTime time,
    Message varchar(1000),
	constraint foreign key fk_TutChat (TutorID) references Tutor (username),
    constraint foreign key fk_StudChat (StudentID) references Student (username)   
);

create table Suggestions(
	suggestionID int,
    username varchar(30),
    content varchar(1000),
	constraint foreign key fk_TutSuggest (username) references Tutor (username),
    constraint foreign key fk_StudSuggest (username) references Student (username)
);