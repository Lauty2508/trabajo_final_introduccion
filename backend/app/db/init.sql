create table NAVE (Nave_id SERIAL primary key, 
Modelo VARCHAR(30) NOT NULL,
Tiempo_de_uso INT,
Anio_fabricacion INT,
Kilometraje_recorrido BIGINT, 
Capacidad_max_pasajeros INT NOT NULL CHECK(Capacidad_max_pasajeros>0),
Estado VARCHAR(20) NOT NULL);

create table PASAJEROS (Pasajero_id SERIAL primary key,
Documento VARCHAR(20) NOT NULL UNIQUE,
Nombre VARCHAR(40) NOT NULL,
Apellido VARCHAR(40) NOT NULL,
Edad INT NOT NULL CHECK(Edad>=0),
Telefono VARCHAR(20),
Estado_salud VARCHAR(30) NOT NULL,
Direccion VARCHAR(30));

create table PLATAFORMA(Plataforma_id SERIAL primary key,
Pais VARCHAR(30) NOT NULL,
Latitud DECIMAL(10,6) NOT NULL,
Longitud DECIMAL(10,6) NOT NULL,
Capacidad_max_naves INT NOT NULL CHECK (Capacidad_max_naves>0),
Estado_plataforma VARCHAR(30)NOT NULL);

create table VIAJE (Viaje_id SERIAL primary key,
Fecha_despegue DATE NOT NULL,
Horario_salida TIME NOT NULL,
Duracion INT NOT NULL CHECK (Duracion>0),
Estado_despegues VARCHAR(30) NOT NULL,
Plataforma_origen_id INT NOT NULL, 
Plataforma_destino_id INT NOT NULL, 
Naves_id INT,
foreign key (Plataforma_origen_id) references PLATAFORMA(Plataforma_id),
foreign key (Plataforma_destino_id) references PLATAFORMA(Plataforma_id),
foreign key (Naves_id) references NAVE(Nave_id)
);

create table RESERVA (Reserva_id SERIAL primary key,
Codigo_asiento VARCHAR(10)NOT NULL,
Fecha_reserva DATE NOT NULL,
Precio_pasaje DECIMAL(10,6) NOT NULL CHECK (Precio_pasaje>=0),
Vuelo_id INT NOT NULL, 
Pasajero_id INT NOT NULL,
foreign key (Vuelo_id) references VIAJE(Viaje_id),
foreign key (Pasajero_id) references PASAJEROS(Pasajero_id)
ON DELETE cascade
);


INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('StarCruiser V', 1500, 2018, 5000000, 100, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('AstroCarga X', 3200, 2012, 12000000, 20, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Galactica 3000', 500, 2024, 800000, 250, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('StarCruiser V', 800, 2020, 2500000, 100, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Lunar Eclipse', 4500, 2010, 18000000, 50, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Mars Explorer II', 120, 2025, 150000, 30, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Galactica 3000', 600, 2023, 950000, 250, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('AstroCarga Y', 2800, 2015, 8000000, 20, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Titan Vanguard', 45, 2026, 50000, 400, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Orion X', 6000, 2005, 30000000, 15, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Voyager Mk1', 1500, 2021, 400000, 10, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Comet Chaser', 300, 2026, 15000, 5, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Nebula Jumper', 8000, 1999, 50000000, 150, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Horizon X', 210, 2025, 80000, 50, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Icarus V', 9500, 2008, 25000000, 80, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Zenith Prime', 45, 2026, 10000, 200, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Apollo Legacy', 12000, 1985, 99000000, 3, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Nova Runner', 600, 2023, 1200000, 15, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Starlight', 3200, 2017, 8500000, 300, 'En revision tecnica');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Omega Transport', 410, 2024, 750000, 80, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Pegasus V', 4500, 2012, 12000000, 45, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Vanguard', 120, 2025, 30000, 20, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Cosmos 99', 8500, 1998, 45000000, 150, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Aether Rider', 320, 2024, 150000, 8, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Prometheus', 6000, 2008, 25000000, 300, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Triton Base', 10000, 1990, 80000000, 5, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Aurora', 45, 2026, 8000, 12, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Eclipse', 2300, 2019, 5000000, 80, 'En revision tecnica');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Sol Invictus', 900, 2022, 1200000, 250, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Lunar Moth', 1500, 2018, 3000000, 2, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Hyperion', 4000, 2015, 9000000, 40, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Atlas Cargo', 7500, 2005, 35000000, 10, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Genesis', 50, 2025, 20000, 100, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Odyssey', 11000, 1985, 99000000, 500, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Comet Dash', 300, 2023, 400000, 4, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Orion Belt', 5500, 2010, 18000000, 60, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Stellar Fox', 150, 2024, 50000, 15, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Void Walker', 800, 2020, 2000000, 25, 'En revision tecnica');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Infinity', 9500, 2000, 60000000, 200, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Pioneer', 1200, 2019, 1500000, 30, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Centauri', 450, 2023, 600000, 80, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Lyra', 60, 2026, 12000, 5, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Cygnus', 3300, 2016, 7000000, 120, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Draco', 10500, 1995, 75000000, 20, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Vela', 2100, 2017, 4000000, 45, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Phoenix', 85, 2025, 25000, 300, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Aquila', 4000, 2014, 11000000, 50, 'En revision tecnica');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Pegasus VI', 250, 2024, 180000, 45, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Chariot', 7000, 2007, 28000000, 15, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Nomad', 15000, 1980, 99999999, 1, 'Fuera de servicio');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Wanderer', 950, 2021, 2200000, 10, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Seeker', 110, 2025, 45000, 6, 'En mantenimiento');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Pathfinder', 5600, 2009, 16000000, 100, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Trailblazer', 300, 2023, 500000, 25, 'Operativa');

INSERT INTO public.nave
(modelo, tiempo_de_uso, anio_fabricacion, kilometraje_recorrido, capacidad_max_pasajeros, estado)
VALUES('Horizon Y', 15, 2026, 5000, 400, 'Operativa');








INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('25333444', 'Laura', 'Martinez', 35, '+541155557777', 'Apto', 'Calle Falsa 123');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('40999888', 'Julian', 'Alvarez', 24, '+541155558888', 'Requiere medicacion', 'Av. Libertador 5500');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('18555666', 'Carmen', 'Lopez', 62, '+541155551111', 'Control estricto', 'Florida 900');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('12345678', 'Ana', 'García', 29, '+541166661111', 'Optimo', 'San Martin 444');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('87654321', 'Pedro', 'Pascal', 48, '+56988887777', 'Apto', 'Av. Siempreviva 742');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('55667788', 'Lionel', 'Messi', 39, '+13059998888', 'Optimo', 'Miami Beach 10');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('66778899', 'Emma', 'Stone', 35, '+12125550198', 'Apto', 'Hollywood Blvd 100');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('77889900', 'Ricardo', 'Darin', 67, '+541133332222', 'Apto', 'Palermo Chico 50');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99887766', 'Guillermo', 'Francella', 69, '+541144445555', 'Control estricto', 'Belgrano 1200');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('20304050', 'Charly', 'Garcia', 72, '+541122221111', 'Requiere medicacion', 'Coronel Diaz 1905');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('30405060', 'Natalia', 'Oreiro', 46, '+59829001122', 'Apto', 'Montevideo 300');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000022', 'Clint', 'Eastwood', 93, '+13105550002', 'Apto', 'Carmel 15');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000023', 'Carl', 'Fredricksen', 90, '+15550003333', 'Requiere medicacion', 'Paradise Falls 1');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000024', 'Rose', 'Dawson', 101, '+15550004444', 'Control estricto', 'Ocean Blvd 84');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000025', 'Julio', 'Bocca', 57, '+541188880005', 'Optimo', 'Corrientes 800');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000029', 'Susana', 'Gimenez', 80, '+59825550009', 'Apto', 'Punta del Este 10');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000030', 'Mick', 'Jagger', 80, '+44205550010', 'Optimo', 'London West 5');
INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000032', 'Emilia', 'Mernes', 27, '+541188880012', 'Optimo', 'Belgrano 34');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000039', 'Morgan', 'Freeman', 87, '+16625550019', 'Apto', 'Charleston 20');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000040', 'Guillermo', 'Del Toro', 59, '+52555550020', 'Requiere medicacion', 'Guadalajara 90');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('30111222', 'Ramón', 'Ábila', 28, '+541155554444', 'Optimo', 'Av. Corrientes 1234');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('22334455', 'Mariano', 'Gómez', 51, '+573001234567', 'Optimo', 'Calle 8 N 12');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('33445566', 'Ezequiel', 'Cerutti', 60, '+541100009999', 'Requiere medicacion', 'Segurola y Habana 4310');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('44556677', 'Javier', 'Pastore', 80, '+541177778888', 'Control estricto', 'Arroyo 800');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('11223344', 'Walter', 'Lugones', 27, '+13105550123', 'Optimo', 'Beverly Hills 90210');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('10203040', 'Jordy', 'Caicedo', 28, '+442079460958', 'Optimo', 'London St 5');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('40506070', 'Manuel', 'Ginobili', 48, '+12105550147', 'Optimo', 'San Antonio 20');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('50607080', 'Juan Carlos', 'Jiménez', 74, '+541199990000', 'Control estricto', 'Tucuman 100');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('60708090', 'Javier', 'Campo', 25, '+541155556666', 'Optimo', 'Ramos Mejia 10');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000021', 'Pedro', 'Zalewski', 97, '+541188880001', 'Control estricto', 'Av. Libertador 2000');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000026', 'Rudi', 'Goretzka', 32, '+541188880006', 'Optimo', 'Palermo 123');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000027', 'John', 'Guehi', 68, '+14255550007', 'Requiere medicacion', 'Medina 18');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000028', 'Pablo', 'Rodríguez', 35, '+541188880008', 'Optimo', 'Nuñez 500');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000031', 'Sofía', 'Cáceres', 27, '+541188880011', 'Apto', 'Almagro 99');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000033', 'Jordan', 'Partey', 52, '+15125550013', 'Optimo', 'Boca Chica 1');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000034', 'Wan', 'Wisa', 60, '+12065550014', 'Apto', 'Seattle 45');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000035', 'Ismalia', 'Mendy', 40, '+16505550015', 'Optimo', 'Palo Alto 1');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000036', 'Roberto', 'Diccesare', 81, '+5625550016', 'Requiere medicacion', 'Santiago 100');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000037', 'Federico', 'Lombardi', 88, '+34915550017', 'Control estricto', 'Madrid 55');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('90000038', 'Santiago', 'Gutiérrez', 86, '+13105550018', 'Apto', 'Malibu 7');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000041', 'Joao', 'Maniche', 59, '+13105559901', 'Optimo', 'Hollywood 101');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000042', 'Danilo', 'Militao', 74, '+12125559902', 'Apto', 'New York 55');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000043', 'Paloma', 'Andrada', 67, '+13105559903', 'Requiere medicacion', 'Los Angeles 20');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000044', 'David', 'Pellistri', 39, '+12125559904', 'Optimo', 'Manhattan 3');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000045', 'Kaled', 'Nández', 80, '+12125559905', 'Control estricto', 'Tribeca 10');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000046', 'Matías', 'Silva', 60, '+13105559906', 'Apto', 'Beverly Hills 99');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000047', 'Luciano', 'Gómez', 49, '+13105559907', 'Optimo', 'Malibu 15');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000048', 'George', 'Kashia', 42, '+12125559908', 'Optimo', 'Brooklyn 44');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000049', 'Facundo', 'Silva', 83, '+13105559909', 'Control estricto', 'Beverly Hills 77');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000050', 'Dejan', 'Elanga', 48, '+13105559910', 'Apto', 'Los Feliz 5');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000051', 'Martin', 'Ostigard', 34, '+44205559911', 'Optimo', 'London 12');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000052', 'Angela', 'Di Lorenzo', 34, '+44205559912', 'Optimo', 'Fulham 8');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000053', 'Oliver', 'Matuidi', 75, '+13105559913', 'Requiere medicacion', 'Inglewood 22');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000054', 'Luciana', 'Castilla', 81, '+13075559914', 'Control estricto', 'Jackson Hole 1');

INSERT INTO public.pasajeros (documento, nombre, apellido, edad, telefono, estado_salud, direccion) VALUES('99000055', 'Katherine', 'Morgan', 74, '+34915559915', 'Apto', 'Madrid 100');








INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Argentina', -34.603700, -58.381600, 5, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Estados Unidos', 28.392200, -80.607700, 12, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Japon', 30.400000, 130.970000, 8, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Brasil', -15.793800, -47.882700, 6, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Francia', 48.856600, 2.352200, 10, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('China', 39.904200, 116.407400, 20, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Australia', -35.280900, 149.130000, 8, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('España', 40.416700, -3.703200, 5, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Canada', 45.421500, -75.697100, 7, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('India', 28.613900, 77.209000, 15, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Mexico', 19.432600, -99.133200, 12, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Reino Unido', 51.507400, -0.127800, 8, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Sudafrica', -33.924900, 18.424100, 5, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Emiratos Arabes', 25.204800, 55.270800, 25, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Rusia', 55.755800, 37.617300, 10, 'Fuera de servicio');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Chile', -33.448900, -70.669300, 4, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Italia', 41.902800, 12.496400, 6, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Egipto', 30.044400, 31.235700, 3, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Alemania', 52.520000, 13.405000, 15, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Corea del Sur', 37.566500, 126.978000, 12, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Peru', -12.046400, -77.042800, 8, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Colombia', 4.711000, -74.072100, 10, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Uruguay', -34.901100, -56.164500, 5, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Bolivia', -16.500000, -68.119300, 3, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Paraguay', -25.263700, -57.575900, 4, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Venezuela', 10.480600, -66.903600, 6, 'Fuera de servicio');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Ecuador', -0.180700, -78.467800, 7, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Noruega', 59.913900, 10.752200, 12, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Suecia', 59.329300, 18.068600, 15, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Finlandia', 60.169500, 24.935500, 9, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Grecia', 37.983800, 23.727500, 8, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Turquia', 39.920800, 32.854100, 14, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Nueva Zelanda', -41.286500, 174.776200, 11, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Singapur', 1.352100, 103.819800, 20, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Tailandia', 13.756300, 100.501800, 16, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Marruecos', 34.020900, -6.841600, 5, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Kenia', -1.292100, 36.821900, 7, 'Fuera de servicio');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Nigeria', 9.082000, 8.675300, 10, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Sudan', 15.500700, 32.559900, 3, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Angola', -8.839000, 13.289400, 4, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Portugal', 38.722300, -9.139300, 9, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Irlanda', 53.349800, -6.260300, 6, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Polonia', 52.229700, 21.012200, 13, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Ucrania', 50.450100, 30.523400, 11, 'Fuera de servicio');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Suiza', 46.948000, 7.447400, 5, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Austria', 48.208200, 16.373800, 8, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Belgica', 50.850300, 4.351700, 10, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Holanda', 52.367600, 4.904100, 14, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Dinamarca', 55.676100, 12.568300, 9, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Islandia', 64.146600, -21.942600, 4, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Cuba', 23.113600, -82.366600, 5, 'Fuera de servicio');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Jamaica', 18.017900, -76.809900, 3, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Costa Rica', 9.928100, -84.090700, 6, 'Activa');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Panama', 8.982400, -79.519900, 15, 'Mantenimiento preventivo');

INSERT INTO public.plataforma
(pais, latitud, longitud, capacidad_max_naves, estado_plataforma)
VALUES('Puerto Rico', 18.465500, -66.105700, 8, 'Activa');







INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-15', '08:00:00', 48, 'Programado', 1, 2, 1);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-09-10', '14:30:00', 72, 'Atrasado', 2, 3, 3);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-01', '06:15:00', 120, 'Programado', 3, 1, 1);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-05', '09:00:00', 24, 'Programado', 4, 1, 4);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-20', '18:45:00', 80, 'Programado', 5, 2, 7);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-07-01', '10:00:00', 48, 'Finalizado', 6, 10, 9);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-07-15', '22:30:00', 110, 'Finalizado', 10, 7, 6);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-01-10', '05:00:00', 72, 'Programado', 7, 9, 4);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-05', '13:15:00', 36, 'Cancelado', 8, 5, 10);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-09-25', '16:00:00', 90, 'Atrasado', 9, 4, 7);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-02-14', '08:00:00', 120, 'Programado', 1, 6, 9);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-03-01', '11:00:00', 45, 'Programado', 2, 5, 4);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-20', '20:00:00', 60, 'En vuelo', 4, 7, 6);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-30', '07:30:00', 25, 'Programado', 5, 8, 8);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-05-25', '12:00:00', 150, 'Programado', 1, 10, 9);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-10', '09:00:00', 45, 'Programado', 11, 12, 11);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-12', '14:30:00', 30, 'Atrasado', 13, 14, 12);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-15', '18:00:00', 60, 'Cancelado', 15, 16, 13);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-01', '06:15:00', 20, 'Programado', 17, 18, 16);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-05', '22:00:00', 80, 'Atrasado', 19, 20, 18);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-10', '11:45:00', 90, 'Cancelado', 1, 11, 14);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-01-15', '08:30:00', 120, 'Programado', 3, 12, 20);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-07-26', '15:00:00', 50, 'En vuelo', 14, 7, 11);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-10', '07:00:00', 40, 'Atrasado', 16, 9, 16);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-20', '19:30:00', 110, 'Cancelado', 4, 15, 15);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-09-05', '10:15:00', 15, 'Atrasado', 8, 17, 12);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-09-15', '13:00:00', 35, 'Programado', 10, 13, 18);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-01', '16:45:00', 100, 'Programado', 20, 1, 20);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-05-10', '05:30:00', 25, 'Finalizado', 18, 5, 16);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-20', '21:00:00', 95, 'Atrasado', 12, 3, 11);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-20', '08:00:00', 45, 'Programado', 21, 28, 21);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-22', '12:30:00', 60, 'Cancelado', 26, 30, 23);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-05-15', '16:00:00', 120, 'Finalizado', 22, 55, 25);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-01', '04:15:00', 30, 'Programado', 24, 25, 27);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-10', '18:45:00', 90, 'Atrasado', 29, 31, 28);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-05', '09:30:00', 15, 'Cancelado', 33, 34, 32);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-01-20', '14:00:00', 180, 'Programado', 35, 1, 36);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-15', '22:10:00', 50, 'Atrasado', 41, 45, 38);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-02-14', '07:00:00', 72, 'Programado', 48, 50, 41);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-06-30', '11:20:00', 85, 'Finalizado', 52, 53, 43);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-09-12', '15:45:00', 40, 'En vuelo', 21, 22, 45);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-05', '06:30:00', 25, 'Programado', 47, 49, 48);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-25', '23:59:00', 200, 'Programado', 15, 26, 51);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-07-10', '10:00:00', 10, 'Cancelado', 44, 51, 50);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-30', '13:15:00', 55, 'Atrasado', 38, 40, 52);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-03-01', '08:45:00', 110, 'Programado', 55, 21, 53);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-08-25', '17:30:00', 35, 'Finalizado', 36, 39, 54);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-31', '21:00:00', 150, 'Programado', 5, 28, 55);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-04-15', '05:00:00', 60, 'Programado', 27, 30, 22);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-11-18', '19:20:00', 80, 'Cancelado', 37, 44, 26);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-09-01', '12:00:00', 45, 'Atrasado', 32, 42, 29);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-10-05', '14:10:00', 20, 'En vuelo', 23, 25, 30);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2027-05-10', '09:00:00', 140, 'Programado', 10, 48, 31);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-07-20', '16:30:00', 55, 'Cancelado', 19, 29, 39);

INSERT INTO public.viaje
(fecha_despegue, horario_salida, duracion, estado_despegues, plataforma_origen_id, plataforma_destino_id, naves_id)
VALUES('2026-12-08', '08:15:00', 95, 'Programado', 54, 52, 40);







INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-01', '2026-01-15', 1500.500000, 1, 1);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-02', '2026-01-16', 1500.500000, 1, 2);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-1', '2026-02-20', 4500.000000, 2, 3);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-10', '2026-03-01', 1200.000000, 2, 4);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-05', '2026-01-20', 1350.000000, 3, 1);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-01', '2026-05-10', 1200.500000, 4, 10);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-02', '2026-05-11', 1200.500000, 4, 11);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-15', '2026-06-01', 3500.000000, 5, 12);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-16', '2026-06-01', 3500.000000, 5, 14);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-1', '2026-01-20', 8500.000000, 6, 6);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-2', '2026-01-25', 8500.000000, 6, 13);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-08', '2026-02-14', 2100.250000, 7, 15);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-09', '2026-02-14', 2100.250000, 7, 5);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-10', '2026-08-10', 4300.000000, 8, 7);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-11', '2026-08-12', 4300.000000, 8, 17);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-12', '2026-08-15', 4300.000000, 8, 18);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('F-01', '2026-04-05', 950.000000, 9, 8);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('F-02', '2026-04-06', 950.000000, 9, 9);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-01', '2026-07-01', 5400.000000, 10, 20);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-3', '2026-09-15', 9900.990000, 11, 10);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-4', '2026-09-15', 9900.990000, 11, 16);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-22', '2026-10-10', 2800.500000, 12, 11);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-23', '2026-10-10', 2800.500000, 12, 13);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('D-14', '2026-06-15', 3100.000000, 13, 1);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('D-15', '2026-06-16', 3100.000000, 13, 19);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('E-05', '2026-08-01', 800.000000, 14, 5);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('E-06', '2026-08-02', 800.000000, 14, 6);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-1', '2026-12-01', 9950.000000, 15, 8);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-2', '2026-12-01', 9950.000000, 15, 14);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-3', '2026-12-02', 9950.000000, 15, 18);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-01', '2026-12-10', 5000.000000, 15, 2);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-02', '2026-12-10', 5000.000000, 15, 3);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-10', '2026-12-11', 4500.000000, 15, 4);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-11', '2026-12-12', 4500.000000, 15, 7);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-30', '2026-12-15', 3000.000000, 15, 20);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-1', '2026-01-05', 8500.000000, 16, 21);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-2', '2026-01-05', 8500.000000, 16, 22);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-05', '2026-02-10', 3200.500000, 16, 23);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-06', '2026-02-12', 3200.500000, 17, 24);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-01', '2026-03-01', 1500.000000, 17, 25);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-02', '2026-03-01', 1500.000000, 17, 26);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-10', '2026-04-15', 4100.000000, 18, 27);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-11', '2026-04-15', 4100.000000, 18, 28);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-12', '2026-04-16', 4100.000000, 18, 29);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-3', '2026-05-20', 9900.000000, 19, 30);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('D-01', '2026-05-21', 2500.000000, 19, 31);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('D-02', '2026-05-21', 2500.000000, 19, 32);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-1', '2026-06-10', 9999.990000, 20, 33);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-2', '2026-06-10', 9999.990000, 20, 34);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('VIP-3', '2026-06-11', 9999.990000, 20, 35);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('A-10', '2026-06-12', 1200.000000, 20, 36);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-05', '2026-07-01', 3400.500000, 21, 37);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('B-06', '2026-07-02', 3400.500000, 21, 38);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-01', '2026-08-15', 5600.000000, 22, 39);

INSERT INTO public.reserva
(codigo_asiento, fecha_reserva, precio_pasaje, vuelo_id, pasajero_id)
VALUES('C-02', '2026-08-15', 5600.000000, 22, 40);