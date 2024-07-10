#llamar a una funcion que se encargue de ejecutar el script para pasar los datos de una base de datos a otra

import schedule
from dotenv import load_dotenv
import os
import ElPasador


load_dotenv()

INTERVALO = int(os.getenv("INTERVALO"))


def ejScript():
    while True:
        print("Ejecutando Script")
        ElPasador.updateEstrella()
        


schedule.every(INTERVALO).weeks.do(ejScript)


while True:
    schedule.run_pending()