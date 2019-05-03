CREATE TABLE Citoyen (
	ID INT(100) AUTO_INCREMENT,
    Nom VARCHAR(100),
    Prénom VARCHAR(100),
    Année_naissance INT(4),
    ID_adresse INT(100),
    ID_contact INT(100),
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_adresse) REFERENCES adresse (ID),
    FOREIGN KEY (ID_contact) REFERENCES contact (ID)
);

CREATE TABLE ADRESSE (
    ID INT(100) AUTO_INCREMENT,
    Numero_rue INT(100),
    Nom_rue VARCHAR(250) NOT NULL,
    Zip_code INT(100),
    Localite VARCHAR(150) NOT NULL
);
CREATE TABLE CITOYEN (
	ID INT(100) AUTO_INCREMENT,
    Nom VARCHAR(100),
    Prénom VARCHAR(100),
    Année_naissance INT(4),
    ID_adresse INT(100),
    ID_contact INT(100),
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_adresse) REFERENCES adresse (ID),
    FOREIGN KEY (ID_contact) REFERENCES contact (ID)
);
CREATE TABLE CONTACT (
    ID INT(100) AUTO_INCREMENT,
    Telephone INT,
    Email VARCHAR(200) NOT NULL
);

INSERT INTO `ADRESSE` (`ID`, `Numero_rue`, `Nom_rue`, `Zip_code`, `Localite`)
VALUES ('4', '201', 'Vivamus Ave', '39766', 'Bradford');
