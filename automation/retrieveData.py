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

        #Trae cuentas
        # click en cuentas.
        
        botonCuentas = "//a[@href='/navigation/menulink/2']"
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, botonCuentas))).click()
        time.sleep(2)

        divCuentasPath = '.box_ctas'
        
        allBoxes = driver.find_elements(By.CSS_SELECTOR, divCuentasPath)
        cuentas_list = []

        for box in allBoxes:
            account_info = box.text.split('\n')

            tipo_cuenta = account_info[0]
            es_principal = tipo_cuenta == 'PRINCIPAL'
            tipo = 'CAS' if tipo_cuenta.startswith('CA$') else 'USD' if tipo_cuenta.startswith('U$D') else 'CC'
            if(es_principal):
            
                saldo = account_info[4]
                
            else:
                saldo = account_info[2]
            
            if (tipo == 'CC' and es_principal) or tipo == 'CAS':
                numero_cuenta = ''.join([c for c in account_info[-1] if c.isdigit()])
            else:
                numero_cuenta = ''.join([c for c in account_info[-2] if c.isdigit()])


            cuenta_objeto = {
                'principal': es_principal,
                'tipo': tipo,
                'saldo': saldo,
                'numero_cuenta': numero_cuenta
            }

            cuentas_list.append(cuenta_objeto)
            
            result['cuentas'] = []  # Inicializa 'cuentas' como una lista vacía

            for cuenta in cuentas_list:
                result['cuentas'].append(cuenta)

    #print(cuentas_list) 

        # div con todas las cuentas: 

        # div: xpath: /html/body/div[2]/div[4]/div[2]/div[2]/div[1]


        ##montoAnotherAcc = driver.find_element(By.CSS_SELECTOR, '#ContainerCuentas > div > div:nth-child(1) > h2:nth-child(2) > strong')
        ##montoAnotherAccText = montoAnotherAcc.text
        # -- print(anotherAcctype)
        # --- print(montoAnotherAccText)
        ## allBoxes = driver.find_elements(By.CSS_SELECTOR, '.sm-box-container .sm-box')

        ##print(allBoxes)


        ## ------------------------------------------- ##

        print(json.dumps(result))
        return True
    except Exception as e:
       result['status'] = 'error'
       print(json.dumps(result))
       return False

# Llamada a la función con argumentos proporcionados por la línea de comandos
login(sys.argv[1], sys.argv[2], sys.argv[3])




    
   
    