CREATE DATABASE my_pc_pokemon;

USE my_pc_pokemon;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE box_pokemon (
    id_box INT AUTO_INCREMENT PRIMARY KEY,
    nome_box VARCHAR(50) NOT NULL
);

CREATE TABLE pokemons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_box INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    level_pokemon INT NOT NULL CHECK (level_pokemon >= 1 AND level_pokemon <= 100),
    hp INT NOT NULL,
    atk INT NOT NULL,
    def INT NOT NULL,
    sp_atk INT NOT NULL,
    sp_def INT NOT NULL,
    speed INT NOT NULL,
    poder_total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_box)
	REFERENCES box_pokemon(id_box)
);