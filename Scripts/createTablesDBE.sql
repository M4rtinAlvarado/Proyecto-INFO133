--BASE DE DATOS MODELO ESTRELLA PARA UNA PELUQUERIA


CREATE TABLE comuna(--LISTO
    id_comuna SERIAL PRIMARY KEY,
    nombre_comuna VARCHAR(50) NOT NULL
);



--TABLA CLIENTE
CREATE TABLE cliente(--LISTO
    id_cliente SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    apellido_cliente VARCHAR(50) NOT NULL,
    rut_cliente VARCHAR(12) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    comuna VARCHAR(50) NOT NULL
);



CREATE TABLE horario(--LISTO
    id_horario SERIAL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);


--TABLA PAGO
CREATE TABLE pago(--LISTO
    id_pago SERIAL PRIMARY KEY,
    fecha DATE NULL,
    monto FLOAT NOT NULL
);


--TABLA SEDE
CREATE TABLE sede(--LISTO
    id_sede SERIAL PRIMARY KEY,
    nombre_sede VARCHAR(50) NOT NULL,
    direccion_sede VARCHAR(50) NOT NULL
);


--TABLA PRODUCTO
CREATE TABLE producto(--LISTO
    id_producto INT PRIMARY KEY,
    nombre_producto VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    precio_venta FLOAT NOT NULL,
    precio_compra FLOAT NOT NULL
); 


--TABLA SERVICIO
CREATE TABLE servicio(--LISTO
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio_servicio FLOAT NOT NULL,
    duracion FLOAT NOT NULL
);



--TABLA EMPLEADO
CREATE TABLE empleado(--LISTO
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    cargo VARCHAR(30) NOT NULL,
    sueldo FLOAT NOT NULL,
    comision FLOAT
);

--TABLA VENTA
CREATE TABLE venta(-- LISTO
    id_venta SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    total FLOAT NOT NULL
);


--TABLA CITA
CREATE TABLE fact_cita(--LISTO
    id_cita SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    estado INT NOT NULL,
    id_horario INT NOT NULL,
    id_cliente INT NOT NULL,
    id_servicio INT NOT NULL,
    id_empleado INT NOT NULL,
    id_pago INT NULL,
    id_comuna INT NOT NULL,
    id_sede INT NOT NULL,
    FOREIGN KEY (id_horario) REFERENCES horario(id_horario),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado),
    FOREIGN KEY (id_pago) REFERENCES pago(id_pago),
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna),
    FOREIGN KEY (id_sede) REFERENCES sede(id_sede)
);



--TABLA venta_producto
CREATE TABLE fact_venta_producto(
    id_venta_producto SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    id_pago INT NOT NULL,
    id_comuna INT NOT NULL,
    id_sede INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_pago) REFERENCES pago(id_pago),
    FOREIGN KEY (id_sede) REFERENCES sede(id_sede),
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna)
);