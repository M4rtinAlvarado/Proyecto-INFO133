#Programa encargado de realizar la carga de datos a la base de datos estrella

import psycopg2
import os
from dotenv import load_dotenv
import BorrarBDD

def updateEstrella():

    load_dotenv()


    # Cargar las credenciales de la base de datos desde el archivo .env
    DB_NAME_1 = os.getenv('DB_NAME_1')
    DB_USER_1 = os.getenv('DB_USER_1')
    DB_PASSWORD_1 = os.getenv('DB_PASSWORD_1')
    DB_PORT_1 = os.getenv('DB_PORT_1')
    DB_HOST_1 = os.getenv('DB_HOST_1')
    DB_NAME_2 = os.getenv('DB_NAME_2')




    BorrarBDD.reset_database(DB_NAME_2, DB_USER_1, DB_PASSWORD_1, DB_PORT_1, DB_HOST_1, "createTablesDBE.sql")


    conn1 = psycopg2.connect(
        host=DB_HOST_1,
        database=DB_NAME_1,
        user=DB_USER_1,
        password=DB_PASSWORD_1,
        port=DB_PORT_1
    )

    print("Conexión exitosa a la base de datos relacional")

    conn2 = psycopg2.connect(
        host=DB_HOST_1,
        database=DB_NAME_2,
        user=DB_USER_1,
        password=DB_PASSWORD_1,
        port=DB_PORT_1
    )

    dict_sexos = dict()
    dict_cargos = dict()
    dict_horarios = dict()
    dict_comunas = dict()
    dict_sedes = dict()
    dict_productos = dict()
    dict_servicios = dict()
    dict_clientes = dict()
    dict_empleados = dict()
    dict_ip = dict()
    dict_pagos = dict()
    dict_citas = dict()
    dict_ventas = dict()
    dict_vp = dict()


    print("Conexión exitosa a la base de datos estrella")

    #pasar datos de la tabla de datos relacional a la tabla de datos estrella
    #CONSEGUIR LA TABLA SEXO
    with conn1.cursor() as cur:
        cur.execute("SELECT id_sexo, nombre_sexo FROM sexo;")
        sexos = cur.fetchall()
        for sexo in sexos:
            dict_sexos[sexo[0]] = {
                "nombre_sexo": sexo[1]
            
            }
            

    #CONSEGUIR LA TABLA CARGO
    with conn1.cursor() as cur:
        cur.execute("SELECT id_cargo, nombre_cargo FROM cargo;")
        cargos = cur.fetchall()
        for cargo in cargos:
            dict_cargos[cargo[0]] = {
                "nombre_cargo": cargo[1]
            
            }
            
    #CONSEGUIR TABLA instancia producto
    with conn1.cursor() as cur:
        cur.execute("SELECT id_instancia_producto, id_producto, id_sede, stock FROM instancia_producto;")
        ips = cur.fetchall()
        for ip in ips:
            dict_ip[ip[0]] = {
                "id_producto": ip[1],
                "id_sede": ip[2],
                "stock": ip[3]
            }
            
    #HORARIOS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_horario, hora_inicio, hora_fin FROM horario;")
        horarios = cur.fetchall()

    with conn2.cursor() as cur:
        for horario in horarios:
            dict_horarios[horario[0]] = {
                "hora_inicio": horario[1],
                "hora_fin": horario[2]
            }
            cur.execute("INSERT INTO horario (id_horario, hora_inicio, hora_fin) VALUES (%s,%s,%s)", horario)
        conn2.commit()
        print("Horarios cargados exitosamente")

    #COMUNAS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_comuna,nombre_comuna FROM comuna;")
        comunas = cur.fetchall()

    with conn2.cursor() as cur:
        for comuna in comunas:
            dict_comunas[comuna[0]] = {
                "nombre_comuna": comuna[1]
            }
            cur.execute("INSERT INTO comuna (id_comuna, nombre_comuna) VALUES (%s,%s)", comuna)
        conn2.commit()
        print("Comunas cargadas exitosamente")


    #SEDES
    with conn1.cursor() as cur:
        cur.execute("SELECT id_sede, nombre_sede, direccion_sede,id_comuna FROM sede;")
        sedes = cur.fetchall()

    with conn2.cursor() as cur:
        for sede in sedes:
            dict_sedes[sede[0]] = {
                "nombre_sede": sede[1],
                "direccion_sede": sede[2],
                "id_comuna": sede[3]
            }
            sede = list(sede)
            sede.pop(3)
            cur.execute("INSERT INTO sede (id_sede, nombre_sede, direccion_sede) VALUES (%s,%s,%s)", sede)
        conn2.commit()
        print("Sedes cargadas exitosamente")

    #PRODUCTOS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_producto, nombre_producto,categoria,marca,precio_venta,precio_compra FROM producto;")
        productos = cur.fetchall()
        
    with conn2.cursor() as cur:
        for producto in productos:
            dict_productos[producto[0]] = {
                "nombre_producto": producto[1],
                "categoria": producto[2],
                "marca": producto[3],
                "precio_venta": producto[4],
                "precio_compra": producto[5]
            }
            cur.execute("INSERT INTO producto (id_producto, nombre_producto,categoria,marca,precio_venta,precio_compra) VALUES (%s,%s,%s,%s,%s,%s)", producto)
        conn2.commit()
        print("Productos cargados exitosamente")

    #SERVICIOS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_servicio, nombre, descripcion, precio_servicio, duracion FROM servicio;")
        servicios = cur.fetchall()

    with conn2.cursor() as cur:
        for servicio in servicios:
            dict_servicios[servicio[0]] = {
                "nombre": servicio[1],
                "descripcion": servicio[2],
                "precio_servicio": servicio[3],
                "duracion": servicio[4]
            }
            cur.execute("INSERT INTO servicio (id_servicio, nombre, descripcion, precio_servicio, duracion) VALUES (%s,%s,%s,%s,%s)", servicio)
        conn2.commit()
        print("Servicios cargados exitosamente")
        

    #CLIENTES
    with conn1.cursor() as cur:
        cur.execute("SELECT id_cliente, nombre_cliente, apellido_cliente, rut_cliente, id_sexo, id_comuna FROM cliente;")
        clientes = cur.fetchall()

    with conn2.cursor() as cur:
        for cliente in clientes:
            dict_clientes[cliente[0]] = {
                "nombre_cliente": cliente[1],
                "apellido_cliente": cliente[2],
                "rut_cliente": cliente[3],
                "id_sexo": cliente[4],
                "id_comuna": cliente[5]
            }
            cliente = list(cliente)
            #id_sexo a nombre_sexo
            cliente[4] = dict_sexos[cliente[4]]["nombre_sexo"]
            #id_comuna a nombre_comuna
            cliente[5] = dict_comunas[cliente[5]]["nombre_comuna"]
            cur.execute("INSERT INTO cliente (id_cliente, nombre_cliente, apellido_cliente, rut_cliente, sexo, comuna) VALUES (%s,%s,%s,%s,%s,%s)", cliente)
        conn2.commit()
        print("Clientes cargados exitosamente")




    #EMPLEADOS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_empleado, nombre, apellido, rut, id_cargo, id_sede, sueldo, comision FROM empleado;")#no se pide el id_sede
        empleados = cur.fetchall()

    with conn2.cursor() as cur:
        for empleado in empleados:
            dict_empleados[empleado[0]] = {
                "nombre": empleado[1],
                "apellido": empleado[2],
                "rut": empleado[3],
                "id_cargo": empleado[4],
                "id_sede": empleado[5],
                "sueldo": empleado[6],
                "comision": empleado[7]
            }
            empleado = list(empleado)
            #id_cargo a nombre_cargo
            empleado[4] = dict_cargos[empleado[4]]["nombre_cargo"]
            #id_sede se elimina
            empleado.pop(5)
            cur.execute("INSERT INTO empleado (id_empleado, nombre, apellido, rut, cargo, sueldo, comision) VALUES (%s,%s,%s,%s,%s,%s,%s)", empleado)
        conn2.commit()
        print("Empleados cargados exitosamente")
        
        

    #PAGOS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_pago, fecha, monto FROM pago;")
        pagos = cur.fetchall()

    with conn2.cursor() as cur:
        for pago in pagos:
            dict_pagos[pago[0]] = {
                "fecha": pago[1],
                "monto": pago[2]
            }
            cur.execute("INSERT INTO pago (id_pago, fecha, monto) VALUES (%s,%s,%s)", pago)
        conn2.commit()
        print("Pagos cargados exitosamente")

        
    #CITAS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_cita, fecha,id_horario, estado, id_cliente, id_servicio, id_empleado, id_pago FROM cita;")
        citas = cur.fetchall()

    with conn2.cursor() as cur:
        for cita in citas:
            dict_citas[cita] = {
                "fecha": cita[1],
                "id_horario": cita[2],
                "estado": cita[3],
                "id_cliente": cita[4],
                "id_servicio": cita[5],
                "id_empleado": cita[6],
                "id_pago": cita[7]
            }
            cita = list(cita)
            id_sede = dict_empleados[cita[6]]["id_sede"]
            id_comuna = dict_sedes[id_sede]["id_comuna"]
            cita.append(id_comuna)
            cita.append(id_sede)
            cur.execute("INSERT INTO fact_cita (id_cita, fecha, id_horario, estado, id_cliente, id_servicio, id_empleado,id_pago, id_comuna, id_sede) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", cita)
        print("Citas cargadas exitosamente")


    #VENTAS
    with conn1.cursor() as cur:
        cur.execute("SELECT id_venta, fecha, total, id_pago FROM venta;")
        ventas = cur.fetchall()

    with conn2.cursor() as cur:
        for venta in ventas:
            dict_ventas[venta[0]] = {
                "fecha": venta[1],
                "total": venta[2],
                "id_pago": venta[3]
            }
            venta = list(venta)
            venta.pop(3)
            cur.execute("INSERT INTO venta (id_venta, fecha, total) VALUES (%s,%s,%s)", venta)
        conn2.commit()
        print("Ventas cargadas exitosamente")
        

    #VENTAS_PRODUCTOS(vp)
    with conn1.cursor() as cur:
        cur.execute("SELECT id_venta_producto, id_venta, id_instancia_producto, cantidad FROM venta_producto;")
        vps = cur.fetchall()  

    with conn2.cursor() as cur:
        for vp in vps:
            dict_vp[vp[0]] = {
                "id_venta": vp[1],
                "id_instancia_producto": vp[2],
                "cantidad": vp[3]
            }
            vp = list(vp)
            id_producto = dict_ip[vp[2]]["id_producto"]
            id_pago = dict_ventas[vp[1]]["id_pago"]
            id_comuna = dict_sedes[dict_ip[vp[2]]["id_sede"]]["id_comuna"]
            id_sede = dict_ip[vp[2]]["id_sede"]
            vp.pop(2)
            vp.insert(2, id_producto)
            vp.insert(3, id_pago)
            vp.insert(4, id_comuna)
            vp.insert(5, id_sede)
            cur.execute("INSERT INTO fact_venta_producto (id_venta_producto, id_venta, id_producto, id_pago, id_comuna, id_sede, cantidad) VALUES (%s,%s,%s,%s,%s,%s,%s)", vp)
        conn2.commit()
        
        
        print("Ventas productos cargadas exitosamente")
        
    #TERMINAR
    conn1.close()
    conn2.close()
    print("Datos cargados exitosamente en la base de datos: ", DB_NAME_2)


updateEstrella()