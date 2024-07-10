--Base de datos para las peluquerias
--POSTGRESQL


CREATE TABLE comuna(--LISTO
    id_comuna SERIAL PRIMARY KEY,
    nombre_comuna VARCHAR(50) NOT NULL
);


CREATE TABLE estado(--LISTO
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL
);

COMMENT ON COLUMN estado.id_estado 
IS 'Pendiente = 1, Realizada = 2,  Anulada = 3';

CREATE TABLE sexo(--LISTO
    id_sexo SERIAL PRIMARY KEY,
    nombre_sexo VARCHAR(50) NOT NULL
);

COMMENT ON COLUMN sexo.id_sexo 
IS 'Masculino = 1, Femenino = 2, Otro = 3';



--TABLA CLIENTE
CREATE TABLE cliente(--LISTO
    id_cliente SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    apellido_cliente VARCHAR(50) NOT NULL,
    rut_cliente VARCHAR(12) NOT NULL,
    id_sexo INT NOT NULL,
    id_comuna INT NOT NULL,
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna),
    FOREIGN KEY (id_sexo) REFERENCES sexo(id_sexo)
);


--TABLA CARGO
CREATE TABLE cargo(--LISTO
    id_cargo SERIAL PRIMARY KEY,
    nombre_cargo VARCHAR(50) NOT NULL
);

CREATE TABLE horario(--LISTO
    id_horario SERIAL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);


--TABLA PAGO
CREATE TABLE pago(
    id_pago SERIAL PRIMARY KEY,
    fecha DATE NULL,--ANTES ERA NOT NULL
    monto FLOAT NOT NULL
);


--TABLA SEDE
CREATE TABLE sede(--LISTO
    id_sede SERIAL PRIMARY KEY,
    nombre_sede VARCHAR(50) NOT NULL,
    direccion_sede VARCHAR(50) NOT NULL,
    id_comuna INT NOT NULL,
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna)
);



--TABLA PRODUCTO
CREATE TABLE producto(--LISTO
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    precio_venta FLOAT NOT NULL,
    precio_compra FLOAT NOT NULL
); 

--TABLA INSTANCIA_PRODUCTO
CREATE TABLE instancia_producto(--LISTO
    id_instancia_producto SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    id_sede INT NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_sede) REFERENCES sede(id_sede)
);



--TABLA SERVICIO
CREATE TABLE servicio(--LISTO
    id_servicio SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio_servicio FLOAT NOT NULL,
    duracion FLOAT NOT NULL,
    id_cargo INT NOT NULL,
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)
);


--TABLA SEDE_SERVICIO ELIMINADA


--TABLA EMPLEADO
CREATE TABLE empleado(--LISTO
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    rut VARCHAR(12) NOT NULL,
    id_cargo INT NOT NULL,
    id_sede INT NOT NULL,
    sueldo FLOAT NOT NULL,
    comision FLOAT,
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo),
    FOREIGN KEY (id_sede) REFERENCES sede(id_sede)
);



--TABLA CITA
CREATE TABLE cita(--LISTO
    id_cita SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    id_horario INT NOT NULL,
    estado int NOT NULL,
    id_cliente INT NOT NULL,
    id_servicio INT NOT NULL,
    id_empleado INT NOT NULL,
    id_pago INT NULL, -- antes era NOT NULL
    FOREIGN KEY (id_horario) REFERENCES horario(id_horario),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado),
    FOREIGN KEY (id_pago) REFERENCES pago(id_pago)
);

COMMENT ON COLUMN cita.estado IS 'PENDIENTE, CONFIRMADA, CANCELADA';

--TABLA VENTA
CREATE TABLE venta(--LISTO
    id_venta SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    total FLOAT NOT NULL,
    id_pago INT NOT NULL,
    FOREIGN KEY (id_pago) REFERENCES pago(id_pago)
);


--TABLA venta_producto
CREATE TABLE venta_producto(--LISTO
    id_venta_producto SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_instancia_producto INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_instancia_producto) REFERENCES instancia_producto(id_instancia_producto)
);





