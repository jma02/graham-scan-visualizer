from PyQt5.QtGui import QPixmap, QMovie
from matplotlib import pyplot as plt
import convexhull
import sys

from PyQt5 import uic
from PyQt5.QtWidgets import QMainWindow, QApplication, QPushButton, QFileDialog, QLabel, QComboBox, QFrame

def clear_all_plots():
            fig = plt.figure()
            plt.figure().clear()
            plt.close()
            plt.cla()
            plt.clf()

class UI(QMainWindow):
    def __init__(self):
        super(UI, self).__init__()

        # load ui file
        uic.loadUi("dialog.ui", self)

        self.setWindowTitle("Convex Hull Visualizer")
        # define widgets
        self.filesearch = self.findChild(QPushButton, "pushButton")
        self.coords = self.findChild(QLabel, "label")
        self.display = self.findChild(QLabel, "label_2")
        self.select = self.findChild(QComboBox, "comboBox")
        self.loading = self.findChild(QLabel, "label_3")
        # click dropdown box
        self.filesearch.clicked.connect(self.fileclicker)
        self.select.currentIndexChanged.connect(self.change_display)
        # show app
        self.show()

    def change_display(self):
        if self.select.currentIndex() == 0:
            pixmap = QPixmap("init.png")
            self.display.setPixmap(pixmap)
        elif self.select.currentIndex() == 1:
            pixmap = QPixmap("hull.png")
            self.display.setPixmap(pixmap)
        elif self.select.currentIndex() == 2:
            movie = QMovie("gscan.gif")
            self.display.setMovie(movie)
            movie.start()

    def loadingtext(self):
        self.loading.setFrameShape(QFrame.StyledPanel)
        self.loading.setText("Loading -- this may take a while")

    def fileclicker(self):
        self.loadingtext()
        fname, _ = QFileDialog.getOpenFileName(self, "Open CSV File", "~", "CSV Files(*.csv);;TXT Files(*.txt)")
        if fname:
            clear_all_plots()
            coordinates = convexhull.load_data(fname)
            self.coords.setText(str(coordinates))
            sorted_points = convexhull.graham_scan(coordinates)
            animation = convexhull.Animator(sorted_points)
            animation.animate()
            self.change_display()

        self.loading.setText("")
        self.loading.setFrameShape(QFrame.NoFrame)


app = QApplication(sys.argv)
UIWindow = UI()
app.exec()
