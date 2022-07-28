import unittest
from selenium import webdriver
import page

class ChopperTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("F:\Coding\Selenium\chromedriver.exe")
        self.driver.get("http://localhost:3000/login")

    def test_Upload(self):
        updatePage = page.testPage(self.driver)
        assert updatePage.upload_file()