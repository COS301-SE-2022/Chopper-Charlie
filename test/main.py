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

    def test_Analysis(self):
        print('Testing Pipeline Creation..\n')
        analysisPage = page.testPage(self.driver)
        analysisPage.analyse_File()
        assert True 

    def test_Download(self):
        print('Testing Download..\n')
        downPage = page.testPage(self.driver)
        assert downPage.download_File()

    def test_Delete(self):
        print('Testing Delete..\n')
        fname = "image-testing.png"
        delete = page.testPage(self.driver)
        assert delete.delete_file(fname)

    def test_Logout(self):
        print('Testing Logout..\n')
        profile = page.testPage(self.driver)
        assert profile.click_logout()