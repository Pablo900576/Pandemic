CREATE TABLE usuarios (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    nombre VARCHAR(50),  
    Nick varchar(50) unique not null, 
    apellido VARCHAR(50),  
    email VARCHAR(50),  
    password VARCHAR(50) 
); 

CREATE TABLE partidas ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    usuario_id INT,  
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE  
); 

CREATE TABLE estado_ciudades ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    partida_id INT, 
    ciudad VARCHAR(100) NOT NULL, 
    virus_rojo INT DEFAULT 0, 
    virus_verde INT DEFAULT 0, 
    virus_azul INT DEFAULT 0, 
    virus_amarillo INT DEFAULT 0, 
    brote_rojo BOOLEAN DEFAULT FALSE, 
    brote_verde BOOLEAN DEFAULT FALSE, 
    brote_azul BOOLEAN DEFAULT FALSE, 
    brote_amarillo BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (partida_id) REFERENCES partidas(id) ON DELETE CASCADE 
); 

 