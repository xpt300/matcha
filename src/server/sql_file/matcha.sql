create database if not exists MATCHA;
USE MATCHA;
create table if not exists USER(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cle VARCHAR(255),
    prenom VARCHAR(255),
    nom VARCHAR(255),
    mail VARCHAR(255),
    mot_de_passe VARCHAR(255),
    compte_valide ENUM ('Y', 'N'),
    notification ENUM ('Y', 'N'),
    address VARCHAR(80),
    ville VARCHAR(80),
    pays VARCHAR(80),
    codePostal INT,
    biographie TEXT,
    connect ENUM ('Y', 'N'),
    dernier_co DATE,
    anniversaire DATE,
    popularite INT
);
create table if not exists IMG(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    path_img VARCHAR(255)
);
create table if not exists REGLAGE(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    latitude FLOAT(10, 6),
    longitude FLOAT(10, 6),
    distance INT,
    max_age INT,
    min_age INT,
    genre VARCHAR(80),
    target VARCHAR(80)
);
create table if not exists TAG(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(80)
);
create table if not exists TAG_ID(
    id_user INT,
    id_tag INT
);