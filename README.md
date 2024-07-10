## Gestión y administración de salón de belleza 

### Descripción del proyecto
El proyecto consiste en la creación de un sistema de gestión y administración de un salón de belleza, el cual permitirá llevar un control de los clientes, empleados, servicios y productos que se ofrecen en las diferentes sedes del salón de belleza.

### Integrantes
- **Andres Mardones**
- **Martin Alvarado**
- **Osvaldo Casas-Cordero**

## Contenidos



 ### Librerías utilizadas
- **Random**
- **Datetime**
- **faker**
- **pytz**
- **psycopg2**
- **dotenv**
- **schedule**

## Instalación y ejecución del proyecto
Para poder instalar y ejecutar el proyecto, se deben seguir los siguientes pasos:
1. Clonar el repositorio en la máquina local.
2. Abrir la terminal y ubicarse en la carpeta ```Scripts```.
3. Ejecutar el siguiente comando para instalar las librerías necesarias:
```bash
pip install -r requirements.txt
```
4. Crear un archivo .env en la carpeta ```Scripts``` con las siguientes variables de entorno:
```bash
DB_NAME_1=nombre_base_de_datos_transaccional
DB_USER_1=usuario_base_de_datos
DB_PASSWORD_1=contraseña_base_de_datos
DB_HOST_1=host_base_de_datos
DB_PORT_1=puerto_base_de_datos
DB_NAME_2=nombre_base_de_datos_tipo_estrella
INTERVALO=1
```
5. Crear las bases de datos en PostgreSQL con los nombres especificados en el archivo .env.

6. Ejecutar el siguiente comando en la carpeta ```Scripts``` para crear para crear e insertar datos en las tablas de la bases de datos transaccional:
```bash
python poblarTransaccional.py
```

7. Ejecutar el siguiente comando en la carpeta de Scripts para crear para crear e insertar datos en las tablas de la bases de dato tipo estrella:
```bash
python poblarEstrella.py
```
o automatizar la tarea cada una semana ejecutando el siguiente script:
```bash
python Scheduler.py
```







