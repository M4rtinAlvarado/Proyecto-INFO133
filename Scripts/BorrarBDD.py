import psycopg2



def reset_database(DB_NAME: str, DB_USER: str, DB_PASSWORD: str, DB_PORT: str, DB_HOST: str,archivo:str):

    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute("DROP SCHEMA public CASCADE;")
                cur.execute("CREATE SCHEMA public;")

        print("Tablas eliminadas exitosamentes")
        

    except psycopg2.Error as e:
        print(f"Error al eliminar tabla: {e}")
        


    finally:
        if conn is not None:
            with open(archivo, 'r') as file:
                script_sql = file.read()

            with conn:
                with conn.cursor() as cur:
                    # Ejecutar el script SQL
                    cur.execute(script_sql)
                    print("Tablas creadas exitosamentes")
            conn.close()