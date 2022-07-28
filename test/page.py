import time
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import os

class BasePage(object):
    def __init__(self, driver):
        self.driver = driver

class testPage(BasePage):
    def is_title(self):
        return "Chopper" in self.driver.title

    def click_login(self):
        username = self.driver.find_element("id", "username")
        username.send_keys("u20486783@tuks.co.za")
        password = self.driver.find_element("id", "pass")
        password.send_keys("12345678")
        lgnbtn = self.driver.find_element("id", "login")
        lgnbtn.click()
        time.sleep(2)

    def is_login(self):
        self.click_login()
        userid = self.driver.find_element("id", "user-id")
        if userid.text == "u20486783@tuks.co.za":
            return True
        else:
            return False

    def click_logout(self):
        self.click_login()
        logout = self.driver.find_element(By.CLASS_NAME, "logout")
        logout.click()
        time.sleep(1)
        if "Login" in self.driver.page_source:
            return True
        else:
            return False   

    def upload_page(self):
        self.click_login()
        self.driver.get("http://localhost:3000/upload")
    
    def delete_page(self):
        self.click_login()
        self.driver.get("http://localhost:3000/delete")
    
    def download_page(self):
        self.click_login()
        self.driver.get("http://localhost:3000/download")

    def analysis_page(self):
        self.click_login()
        self.driver.get("http://localhost:3000/analysevideo")

    def upload_file(self):
        self.upload_page()
        upbtn = self.driver.find_element("id", "up")
        upbtn.click()
        os.startfile("F:\Coding\Selenium\pupload.exe")
        time.sleep(5)
        return True

    def download_File(self):
        self.download_page()
        time.sleep(3)
        downbtn = self.driver.find_element("id", "down")
        downbtn.click()
        time.sleep(2)
        if any(File.endswith(".png") for File in os.listdir("F:\Coding\PROJECT\Chopper-Charlie\\backend\AzureBlobRetrieve")):
            return True
        else:
            return False


    def analyse_File(self):
        self.analysis_page()
        time.sleep(4)