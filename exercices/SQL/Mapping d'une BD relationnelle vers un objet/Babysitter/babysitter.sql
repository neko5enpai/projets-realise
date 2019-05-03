CREATE USER 'adminBaby'@'localhost' IDENTIFIED BY 'B@bysitt3r';

CREATE DATABASE Babysitter;
GRANT ALL PRIVILEGES ON Babysitter.* TO 'adminBaby'@'localhost';
USE Babysitter;

CREATE TABLE Babysitter (
    id INT(100) AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    age INT(100),
    PRIMARY KEY (id)
);

CREATE TABLE Parent (
    id INT(100) AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    adresse VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Enfant (
    id INT(100) AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    age INT(100),
    PRIMARY KEY (id)
);

CREATE TABLE Contrat (
    id INT(100) AUTO_INCREMENT,
    dateDebut Date,
    parent INT,
    babysitter INT,
    enfant INT,
    CONSTRAINT fk_babysitter FOREIGN KEY (babysitter) REFERENCES Babysitter(id),
    CONSTRAINT fk_parent FOREIGN KEY (parent) REFERENCES Parent(id),
    CONSTRAINT fk_enfant FOREIGN KEY (enfant) REFERENCES Enfant(id),
    PRIMARY KEY (id)
);