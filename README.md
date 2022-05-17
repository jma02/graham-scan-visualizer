### Visualizing Graham's Convex Hull Algorithm Using Python
[The Graham Scan](https://mathweb.ucsd.edu/~ronspubs/72_10_convex_hull.pdf) is one of the most well-known algorithms in computing history.
![alt-text](https://github.com/johnma02/Convex-hull-visualization/blob/master/gscan.gif)
Using [Matplotlib](https://matplotlib.org/), [Numpy](https://numpy.org/), [SciPy](https://scipy.org/), and [Qt](https://www.qt.io/qt-for-python) for Python, this application visualizes the implementation of the Graham Scan, and finds the convex hull of a finite set of points in ℝ2.

### Dependencies
**If your machine has Anaconda installed, Matplotlib and Numpy will already be available and ready for use.**
Otherwise, check run the following shell command to check if your machine has PIP installed.
#### Linux/MacOS
```shell
python -m ensurepip --upgrade
```
#### Windows
```shell
py -m ensurepip --upgrade

```
If your machine does not have PIP installed, follow the instructions on [this website](https://pip.pypa.io/en/stable/installation/)
After ensuring your machine has PIP, run the following PIP commands.
#### Matplotlib
```shell
python -m pip install -U matplotlib
```
#### Numpy
```shell
pip install numpy
```
#### PyQt5
```shell
pip install PyQt5
```
