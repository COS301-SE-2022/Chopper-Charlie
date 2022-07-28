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