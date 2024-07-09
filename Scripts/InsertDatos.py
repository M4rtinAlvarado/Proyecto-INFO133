from faker import Faker
import random
import pytz
from datetime import datetime
import BorrarBDD

#insercion de datos a la base de datos

fake = Faker('es_CL')
timezone = pytz.timezone('America/Santiago')

#constantes
CLIENTES_POR_SEDE = 1000
CANT_RUTS = CLIENTES_POR_SEDE*10 + 1000
HORARIO_INI = 9 ; HORARIO_FIN = 17
MIN_TIPO_EMPLEADOS = 3 ; MAX_TIPO_EMPLEADOS = 5
VENTAS_POR_SEDE = 3000
MAX_PRODUCTOS_POR_VENTA = 5
#ESTADOS DE CITA Y PAGO
PENDIENTE = 1
REALIZADA = 2
ANULADA = 3



#dict_cliente[id_cliente] = # [nombre_cliente,
                            # apellido_cliente,
                            # rut_cliente,
                            # sexo,
                            # id_comuna]
dict_cliente = dict()


#dict_pago[id_pago] = [fecha, monto, estado]
dict_pago = dict()


#dict_sede[id_sede] = [nombre_sede, direccion_sede, id_comuna]
dict_sede = dict()


#dict_producto[id_producto] = [nombre_producto,
                            # categoria,
                            # marca,
                            # precio_venta,
                            # precio_compra]
dict_producto = dict()

dict_venta_producto = dict()

dict_venta = dict()

#dict_sede_producto[[id_sede][id_producto]] = stock
dict_instancia_producto = dict()

#dict_empleado[id_empleado] = [nombre_empleado,
                            # apellido_empleado,
                            # rut_empleado,
                            # id_cargo,
                            # id_sede,
                            # sueldo,
                            # comision]
dict_empleado = dict()


#dict_servicio[id_servicio] = [nombre_servicio, precio_servicio]
dict_servicio = dict()


#dict_cita[id_cita] = [id_cliente,
                    # fecha,
                    # estado,
                    # id_cliente,
                    # id_servicio,
                    # id_empleado,
                    # id_pago]
dict_cita = dict()

dict_citas_empleado= dict()
#dict_citas_empleado[id_empleado] = [hora1, hora2, hora3, ...]

dict_sede_servicio = dict()

lista_rut = set()
#generar ruts al azar
inicio_rut = [i for i in range(5, 23)]
while len(lista_rut) < CANT_RUTS:
    rut = str(random.choice(inicio_rut)) + str(random.randint(100000,999999))
    lista_rut.add(rut)
lista_rut = list(lista_rut)
print("se generaron", len(lista_rut), "ruts")


nombres_comuna = ['Santiago', 'Providencia', 'Las Condes', 'La Florida',
                  'Maipu', 'La Reina', 'Quilicura', 'Pudahuel', 'La Cisterna', 'San Bernardo']


nombres_sexo = ["Masculino", "Femenino", "Otro"]

nombres_cargo = {1 : {'cargo': 'Administrador', 'servicios': []},
                 2 : {'cargo': 'Peluquero', 'servicios': [1,6,8,10]},
                 3 : {'cargo': 'Manicurista', 'servicios': [2,5,9]},
                 4 : {'cargo': 'Masajista', 'servicios': [3]},
                 5 : {'cargo': 'Depilador', 'servicios': [4]}
                 }


#SERVICIOS
dict_servicio = {
    1: {'nombre': 'Corte de Pelo', 'descripcion': 'Corte a la moda', 'precio_servicio': 5000.0, 'duracion': 30.0, 'id_cargo': 2},
    2: {'nombre': 'Manicure', 'descripcion': 'Cuidado de uñas', 'precio_servicio': 7000.0, 'duracion': 45.0, 'id_cargo': 3},
    3: {'nombre': 'Masaje', 'descripcion': 'Masaje relajante', 'precio_servicio': 10000.0, 'duracion': 60.0, 'id_cargo': 4},
    4: {'nombre': 'Depilacion', 'descripcion': 'Depilación completa', 'precio_servicio': 8000.0, 'duracion': 40.0, 'id_cargo': 5},
    5: {'nombre': 'Pedicure', 'descripcion': 'Cuidado de pies', 'precio_servicio': 6000.0, 'duracion': 50.0, 'id_cargo': 3},
    6: {'nombre': 'Tintura de Cabello', 'descripcion': 'Cambio de color', 'precio_servicio': 15000.0, 'duracion': 60.0, 'id_cargo': 2},
    7: {'nombre': 'Facial', 'descripcion': 'Limpieza profunda', 'precio_servicio': 12000.0, 'duracion': 60.0, 'id_cargo': 4},
    8: {'nombre': 'Peinado', 'descripcion': 'Estilo especial', 'precio_servicio': 4000.0, 'duracion': 30.0, 'id_cargo': 2},
    9: {'nombre': 'Maquillaje', 'descripcion': 'Maquillaje profesional', 'precio_servicio': 10000.0, 'duracion': 60.0, 'id_cargo': 3},
    10: {'nombre': 'Corte barba', 'descripcion': 'Perfilado perfecto', 'precio_servicio': 20000.0, 'duracion': 15.0, 'id_cargo': 2}
    
}

print("se generaron", len(dict_servicio), "servicios")



#HORARIOS
horarios = {
    1: (9, 10),
    2: (10, 11),
    3: (11, 12),
    4: (12, 13),
    5: (13, 14),
    6: (14, 15),
    7: (15, 16),
    8: (16, 17),
    9: (17, 18)  
}


#SEDES
for i in range(1, 11):
    id_sede = i 
    dict_sede[id_sede] = {
        'nombre_sede': nombres_comuna[i-1] + " Salon",
        'direccion_sede': nombres_comuna[i-1],    
        'id_comuna': i
    }
print("se generaron", len(dict_sede), "sedes")



#CLIENTES
id_cliente = 1
for id_sede in dict_sede:
    for i in range(0, CLIENTES_POR_SEDE):
        dict_cliente[id_cliente] = {
            'nombre_cliente': fake.first_name(),
            'apellido_cliente': fake.last_name(),
            'rut_cliente': random.choice(lista_rut),
            'sexo': random.randint(1, 3),
            'id_comuna': dict_sede[id_sede]['id_comuna']
        }        
        lista_rut.remove(dict_cliente[id_cliente]['rut_cliente'])
        id_cliente += 1
print("se generaron", len(dict_cliente), "clientes")

#PRODUCTOS
marca = ["Loreal", "Nivea", "Dove", "Pantene", "Garnier"]
categorias = {
    'Cabello': {'Shampoo','Acondicionador', 'Tinte', 'Tratamiento'},
    'Uñas': {'Esmalte', 'Removedor', 'Lima', 'Acrilico'},
    'Piel': {'Crema', 'Exfoliante', 'Mascarilla', 'Protector Solar'},
    'Depilación': {'Cera', 'Crema', 'Maquina', 'Cuchilla'},
    'Masajes': {'Aceite', 'Crema', 'Aparato', 'Guante'}
}


for i in range(1, 51):
    id_producto = i
    categoria = random.choice(list(categorias.keys()))
    nombre_producto = random.choice(list(categorias[categoria]))
    precio_compra = random.randint(3500, 10000)
    precio_venta = precio_compra*random.uniform(1.2, 1.5)
    #comprobar que no se repita un producto(misma marca y categoria)


    dict_producto[id_producto] = {
        'nombre_producto': nombre_producto,
        'categoria': categoria,
        'marca': random.choice(marca),
        'precio_venta': precio_venta,
        'precio_compra': precio_compra 
    }
    
print("se generaron", len(dict_producto), "productos")

#INSTANCIA_PRODUCTO
id_instancia_producto = 1
for id_sede in dict_sede:
    for id_producto in dict_producto:
        dict_instancia_producto[id_instancia_producto] = {
            'id_sede': id_sede,
            'id_producto': id_producto,
            'stock': random.randint(10, 100)
        }
        id_instancia_producto += 1 
print("se generaron", len(dict_instancia_producto), "instancias de productos")
        
#EMPLEADOS
id_empleado = 1
for id_sede in dict_sede:
    #poner un administrador por sede
    dict_empleado[id_empleado] = {
        'nombre_empleado': fake.first_name(),
        'apellido_empleado': fake.last_name(),
        'rut_empleado': random.choice(lista_rut),
        'id_cargo': 1,
        'id_sede': id_sede,
        'sueldo': random.randint(1000000, 2000000),
        'comision': '0.0'
    }
    lista_rut.remove(dict_empleado[id_empleado]['rut_empleado'])
    id_empleado += 1
    
    #generar de 3 a 5 empleados por cargo   
    for id_cargo in nombres_cargo:
        if id_cargo != 1:
            for i in range(1, random.randint(MIN_TIPO_EMPLEADOS,MAX_TIPO_EMPLEADOS)):
                dict_empleado[id_empleado] = {
                    'nombre_empleado': fake.first_name(),
                    'apellido_empleado': fake.last_name(),
                    'rut_empleado': random.choice(lista_rut),
                    'id_cargo': id_cargo,
                    'id_sede': id_sede,
                    'sueldo': random.randint(300000, 600000),
                    'comision': random.uniform(0.1, 0.3)
                }
                lista_rut.remove(dict_empleado[id_empleado]['rut_empleado'])
                dict_citas_empleado[id_empleado] = []
                id_empleado += 1
            
print("se generaron", len(dict_empleado), "empleados")


#CITAS    
id_cita = 1
id_pago = 1
for id_empleado in dict_empleado:
    if(dict_empleado[id_empleado]['id_cargo'] != 1):
        for i in range(0, random.randint(365, 365*4)):
            fecha = fake.date_time_between(start_date='-6y', end_date='+1y')
            key_hora = random.choice(list(horarios.keys()))
            hora = horarios[key_hora]
            fecha_hora = fecha.replace(hour=hora[0], minute=0, second=0, microsecond=0)
            # Formatear la fecha(DATE)
            fecha_formateada = fecha.strftime("%Y-%m-%d")
            
            # Buscar una fecha única
            while fecha_hora in dict_citas_empleado[id_empleado]:
                fecha = fake.date_time_between(start_date='-6y', end_date='+1y')
                key_hora = random.choice(list(horarios.keys()))
                hora = horarios[key_hora]
                fecha_hora = fecha.replace(hour=hora[0], minute=0, second=0, microsecond=0)
                fecha_formateada = fecha.strftime("%Y-%m-%d")

            dict_citas_empleado[id_empleado].append(fecha_formateada)


            # Convertir fecha_formateada a objeto datetime para comparar
            fecha_obj = datetime.strptime(fecha_formateada, "%Y-%m-%d")
            
            # Determinar el estado basado en la fecha actual
            if fecha_obj < datetime.now():
                estado = random.choices([REALIZADA, ANULADA], weights=[0.8, 0.2])[0]
            else:
                estado = PENDIENTE

            if estado == REALIZADA:
                dict_cita[id_cita] = {
                    'fecha': fecha_formateada,
                    'estado': estado,
                    'id_horario': key_hora,
                    'id_cliente': random.choice(list(dict_cliente.keys())),
                    'id_servicio': random.choice(nombres_cargo[dict_empleado[id_empleado]['id_cargo']]['servicios']),
                    'id_empleado': id_empleado,
                    'id_pago': id_pago
                }
                id_pago += 1
            else:
                dict_cita[id_cita] = {
                    'fecha': fecha_formateada,
                    'estado': estado,
                    'id_horario': key_hora,
                    'id_cliente': random.choice(list(dict_cliente.keys())),
                    'id_servicio': random.choice(nombres_cargo[dict_empleado[id_empleado]['id_cargo']]['servicios']),
                    'id_empleado': id_empleado,
                    'id_pago': None
                }
            id_cita += 1


print("se generaron", len(dict_cita), "citas")


#VENTA_PRODUCTOS y VENTA
id_venta_producto = 1

for id_venta in range(1, (VENTAS_POR_SEDE*10) +1):
    fecha = fake.date_time_between(start_date='-6y', end_date='now')
    if fecha.hour < HORARIO_INI or fecha.hour >= HORARIO_FIN:
        fecha = fecha.replace(hour=random.choice(range(HORARIO_INI, HORARIO_FIN)), minute=random.choice(range(0,60)), second=0, microsecond=0)
    fecha = fecha.strftime("%Y-%m-%d")
    #j productos por venta
    total = 0
    id_sede = random.choice(list(dict_sede.keys()))
    for _ in range(0,random.randint(1, MAX_PRODUCTOS_POR_VENTA+1)):
        #elejir una sede al azar
        #elejir una instancia_producto al azar de la sede
        id_instancia_producto = random.choice([id_ip for id_ip in dict_instancia_producto if dict_instancia_producto[id_ip]['id_sede'] == id_sede])
        precio_producto = dict_producto[dict_instancia_producto[id_instancia_producto]['id_producto']]['precio_venta']
        cantidad = random.randint(1, 3)
        total += precio_producto*cantidad
        dict_venta_producto[id_venta_producto] = {
            'id_venta': id_venta,
            'id_instancia_producto': id_instancia_producto,
            'cantidad': cantidad
        }
        id_venta_producto += 1
    dict_venta[id_venta] = {
        'fecha': fecha,
        'total': total,
        'id_pago': id_pago
    }
    id_pago += 1
    
print("se generaron", len(dict_venta), "ventas")
print("se generaron", len(dict_venta_producto), "productos vendidos")



#PAGO
for id_cita in dict_cita:
    if(dict_cita[id_cita]['estado'] == REALIZADA):
        id_pago = dict_cita[id_cita]['id_pago'] 
        fecha = dict_cita[id_cita]['fecha']
        monto = dict_servicio[dict_cita[id_cita]['id_servicio']]['precio_servicio']
        dict_pago[id_pago] = {
            'fecha': fecha,
            'monto': monto,
            'estado': estado
        }
    
for id_venta in dict_venta:
    id_pago = dict_venta[id_venta]['id_pago']
    fecha = dict_venta[id_venta]['fecha']
    monto = dict_venta[id_venta]['total']
    dict_pago[id_pago] = {
        'fecha': fecha,
        'monto': monto,
        'estado': estado
    }


print("se generaron", len(dict_pago), "pagos en total")


#CONECRTAR A LA BASE DE DATOS(postgreSQL)
#insertar datos a la base de datos

import psycopg2
from dotenv import load_dotenv
import os


load_dotenv()

DB_NAME_1 = os.getenv('DB_NAME_1')
DB_USER_1 = os.getenv('DB_USER_1')
DB_PASSWORD_1 = os.getenv('DB_PASSWORD_1')
DB_HOST_1 = os.getenv('DB_HOST_1')
DB_PORT_1 = os.getenv('DB_PORT_1')

def create_connection(DB_NAME_1: str, DB_USER_1: str, DB_PASSWORD_1: str, DB_PORT_1: str, DB_HOST_1: str):
    

    try:
        conn = psycopg2.connect(
            host= DB_HOST_1,
            user= DB_USER_1,
            password= DB_PASSWORD_1,
            port= DB_PORT_1,
            database= DB_NAME_1
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

conn = create_connection(DB_NAME_1, DB_USER_1, DB_PASSWORD_1, DB_PORT_1, DB_HOST_1)

if conn is not None:
    try:
    
        BorrarBDD.reset_database(DB_NAME_1, DB_USER_1, DB_PASSWORD_1, DB_PORT_1, DB_HOST_1, 'Create.sql')

        with conn:
            #INSERTAR COMUNAS
            with conn.cursor() as cur:
                for nombre in nombres_comuna:
                    cur.execute("INSERT INTO comuna (nombre_comuna) VALUES (%s)", (nombre,))
            conn.commit()  # Confirmar la transacción para comuna
            print("Se insertaron las comunas correctamente")
            
            
            #INSERTAR SEXO
            with conn.cursor() as cur:
                for sexo in nombres_sexo:
                    cur.execute("INSERT INTO sexo (nombre_sexo) VALUES (%s)", (sexo,))
            conn.commit() 
            print("Se insertaron los sexos correctamente")
            
            #INSERTAR CLIENTES
            with conn.cursor() as cur:
                for id_cliente in dict_cliente:
                    cur.execute("INSERT INTO cliente (nombre_cliente, apellido_cliente, rut_cliente, id_sexo, id_comuna) VALUES (%s, %s, %s, %s, %s)",
                                (dict_cliente[id_cliente]['nombre_cliente'], dict_cliente[id_cliente]['apellido_cliente'], dict_cliente[id_cliente]['rut_cliente'], dict_cliente[id_cliente]['sexo'], dict_cliente[id_cliente]['id_comuna']))
            conn.commit()
            print("Se insertaron los clientes correctamente")

            #INSERTAR CARGOS
            with conn.cursor() as cur:
                for cargo in nombres_cargo:
                    cur.execute("INSERT INTO cargo (nombre_cargo) VALUES (%s)", (nombres_cargo[cargo]['cargo'],))
            conn.commit()
            print("Se insertaron los cargos correctamente")
            
            #INSERTAR HORARIOS
            with conn.cursor() as cur:
                for id_horario in horarios:
                    cur.execute("INSERT INTO horario (hora_inicio, hora_fin) VALUES (%s, %s)",
                                (f'{horarios[id_horario][0]}:00:00', f'{horarios[id_horario][1]}:00:00'))
            conn.commit()
            print("Se insertaron los horarios correctamente")
            
            #INSERTAR PAGOS
            with conn.cursor() as cur:
                for id_pago in dict_pago:
                    cur.execute("INSERT INTO pago (fecha, monto) VALUES (%s, %s)",
                                (dict_pago[id_pago]['fecha'], dict_pago[id_pago]['monto']))
            conn.commit()
            print("Se insertaron los pagos correctamente")
            
            #INSERTAR SEDES
            with conn.cursor() as cur:
                for id_sede in dict_sede:
                    cur.execute("INSERT INTO sede (nombre_sede, direccion_sede, id_comuna) VALUES (%s, %s, %s)",
                                (dict_sede[id_sede]['nombre_sede'], dict_sede[id_sede]['direccion_sede'], dict_sede[id_sede]['id_comuna']))
            conn.commit()
            print("Se insertaron las sedes correctamente")
            
            #INSERTAR PRODUCTOS
            with conn.cursor() as cur:
                for id_producto in dict_producto:
                    cur.execute("INSERT INTO producto (nombre_producto, categoria, marca, precio_venta, precio_compra) VALUES (%s, %s, %s, %s, %s)",
                                (dict_producto[id_producto]['nombre_producto'], dict_producto[id_producto]['categoria'], dict_producto[id_producto]['marca'], dict_producto[id_producto]['precio_venta'], dict_producto[id_producto]['precio_compra']))
            conn.commit()
            print("Se insertaron los productos correctamente")
            
            #INSERTAR instancia_producto
            with conn.cursor() as cur:
                for id_ip in dict_instancia_producto:
                    cur.execute("INSERT INTO instancia_producto (id_producto, id_sede, stock) VALUES (%s, %s, %s)",
                                (dict_instancia_producto[id_ip]['id_producto'], dict_instancia_producto[id_ip]['id_sede'], dict_instancia_producto[id_ip]['stock']))
            conn.commit()
            print("Se insertaron los productos por sede correctamente")
            
            #INSERTAR SERVICIOS
            with conn.cursor() as cur:
                for id_servicio in dict_servicio:
                    cur.execute("INSERT INTO servicio (nombre, descripcion, precio_servicio, duracion, id_cargo) VALUES (%s, %s,%s,%s,%s)",
                                (dict_servicio[id_servicio]['nombre'], dict_servicio[id_servicio]['descripcion'], dict_servicio[id_servicio]['precio_servicio'], dict_servicio[id_servicio]['duracion'], dict_servicio[id_servicio]['id_cargo']))
            conn.commit()
            print("Se insertaron los servicios correctamente")
            
            #INSERTAR CARGO_SERVICIO
          
          
          
          
          
            
            #INSERTAR EMPLEADOS
            with conn.cursor() as cur:
                for id_empleado in dict_empleado:
                    cur.execute("INSERT INTO empleado (nombre, apellido, rut, id_cargo, id_sede, sueldo, comision) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                                (dict_empleado[id_empleado]['nombre_empleado'], dict_empleado[id_empleado]['apellido_empleado'], dict_empleado[id_empleado]['rut_empleado'], dict_empleado[id_empleado]['id_cargo'], dict_empleado[id_empleado]['id_sede'], dict_empleado[id_empleado]['sueldo'], dict_empleado[id_empleado]['comision']))
            conn.commit()
            print("Se insertaron los empleados correctamente")
            
            #INSERTAR CITAS
            with conn.cursor() as cur:
                for id_cita in dict_cita:
                    cur.execute("INSERT INTO cita (fecha, id_horario, estado, id_cliente, id_servicio, id_empleado, id_pago) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                                (dict_cita[id_cita]['fecha'],dict_cita[id_cita]['id_horario'], dict_cita[id_cita]['estado'], dict_cita[id_cita]['id_cliente'], dict_cita[id_cita]['id_servicio'], dict_cita[id_cita]['id_empleado'], dict_cita[id_cita]['id_pago']))
            conn.commit()
            print("Se insertaron las citas correctamente")
            
            #INSERTAR VENTAS
            with conn.cursor() as cur:
                for id_venta in dict_venta:
                    cur.execute("INSERT INTO venta (fecha, total, id_pago) VALUES (%s, %s, %s)",
                                (dict_venta[id_venta]['fecha'], dict_venta[id_venta]['total'], dict_venta[id_venta]['id_pago']))
            conn.commit()
            print("Se insertaron las ventas correctamente")
            
            #INSERTAR VENTA_PRODUCTO
            with conn.cursor() as cur:
                for id_venta_producto in dict_venta_producto:
                    cur.execute("INSERT INTO venta_producto (id_venta, id_instancia_producto, cantidad) VALUES (%s, %s, %s)",
                                (dict_venta_producto[id_venta_producto]['id_venta'], dict_venta_producto[id_venta_producto]['id_instancia_producto'], dict_venta_producto[id_venta_producto]['cantidad']))
            conn.commit()
            print("Se insertaron los productos vendidos correctamente")
        print("Se insertaron todos los datos correctamente")

    except psycopg2.Error as e:
        print(f"Error al insertar datos: {e}")

    finally:
        if conn is not None:
            conn.close()
            print("Conexión cerrada")
else:
    print("No se pudo conectar a la base de datos")

