create table NAVE (Nave_id SERIAL primary key, 
Modelo VARCHAR(30) NOT NULL,
Tiempo_de_uso INT,
Anio_fabricacion INT NOT NULL CHECK (Anio_fabricacion >= 2000),
Kilometraje_recorrido BIGINT, 
Capacidad_max_pasajeros INT NOT NULL CHECK(Capacidad_max_pasajeros > 0),
Estado VARCHAR(20) NOT NULL);

create table PASAJEROS (Pasajero_id SERIAL primary key,
Documento VARCHAR(20) NOT NULL UNIQUE,
Nombre VARCHAR(40) NOT NULL,
Apellido VARCHAR(40) NOT NULL,
Edad INT NOT NULL CHECK(Edad>=0),
Telefono VARCHAR(20),
Estado_salud BOOLEAN NOT NULL,
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
foreign key (Plataforma_origen_id) references PLATAFORMA(Plataforma_id) ON DELETE cascade,
foreign key (Plataforma_destino_id) references PLATAFORMA(Plataforma_id) ON DELETE cascade,
foreign key (Naves_id) references NAVE(Nave_id) ON DELETE cascade);

create table RESERVA (Reserva_id SERIAL primary key,
Codigo_asiento VARCHAR(10)NOT NULL,
Fecha_reserva DATE NOT NULL,
Precio_pasaje DECIMAL(10,6) NOT NULL CHECK (Precio_pasaje>=0),
Vuelo_id INT NOT NULL, 
Pasajero_id INT NOT NULL,
foreign key (Vuelo_id) references VIAJE(Viaje_id) ON DELETE cascade,
foreign key (Pasajero_id) references PASAJEROS(Pasajero_id) ON DELETE cascade);
