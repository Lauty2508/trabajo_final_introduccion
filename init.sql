create table NAVE (Nave_id SERIAL primary key, 
Modelo VARCHAR(30),
Tiempo_de_uso INT,
Anio_fabricacion INT,
Kilometraje_recorrido_ BIGINT, 
Capacidad_max_pasajeros INT,
Estado VARCHAR(20));

create table PASAJEROS (Pasajero_id SERIAL primary key,
Documento VARCHAR(20),
Nombre VARCHAR(40),
Apellido VARCHAR(40),
Edad INT,
Telefono VARCHAR(20),
Estado_salud VARCHAR(30),
Direccion VARCHAR(30));

create table PLATAFORMA(Plataforma_id SERIAL primary key,
Pais VARCHAR(30),
Latitud DECIMAL(10,6),
Longitud DECIMAL(10,6),
Capacidad_max_naves INT,
Estado_plataforma VARCHAR(30));

create table VIAJE (Viaje_id SERIAL primary key,
Fecha_despegue DATE,
Horario_salida TIME,
Duracion INT,
Estado_despegues VARCHAR(30),
Plataforma_origen_id INT, 
foreign key (Plataforma_origen_id) references PLATAFORMA(Plataforma_id),
Plataforma_destino_id INT, 
foreign key (Plataforma_destino_id) references PLATAFORMA(Plataforma_id),
Naves_id INT,
foreign key (Naves_id) references NAVE(Nave_id)
);

create table RESERVA (Reserva_id SERIAL primary key,
Codigo_asiento VARCHAR(10),
Fecha_reserva DATE,
Precio_pasaje DECIMAL(10,6),
Vuelo_id INT, 
foreign key (Vuelo_id) references VIAJE(Viaje_id),
Pasajero_id INT,
foreign key (Pasajero_id) references PASAJEROS(Pasajero_id)
);