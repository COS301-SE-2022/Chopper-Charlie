import time
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import os

class BasePage(object):
    def __init__(self, driver):
        self.driver = driver
