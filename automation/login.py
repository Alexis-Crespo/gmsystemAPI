from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import sys
import json
ser = Service(r".\automation\chromedriver.exe")
op = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=ser, options=op)





def login(du_value, usuario_value, password_value):
    try:
        result = {}
        result['du'] = du_value
        result['usuario'] = usuario_value
        result['password'] = password_value

        driver.get("https://onbh.bancogalicia.com.ar/login")
        driver.maximize_window()

        du = "//input[contains(@id,'DocumentNumber')]"
        nombre = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, du)))
        nombre.send_keys(du_value)
        usuarioInput = "//input[contains(@id,'UserName')]"
        usuario = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, usuarioInput)))
        usuario.send_keys(usuario_value)
        passInput = "//input[@id='Password']"
        password = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, passInput)))
        password.send_keys(password_value)

        botonInput = "//button[contains(@id,'submitButton')]"
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, botonInput))).click()

        success_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//h1[@class='main_title'][contains(.,'Inicio')]")))
        result['status'] = 'success'
        print(json.dumps(result))
        return True
    except Exception as e:
       result['status'] = 'error'
       print(json.dumps(result))
       return False

# Llamada a la función con argumentos proporcionados por la línea de comandos
login(sys.argv[1], sys.argv[2], sys.argv[3])



    