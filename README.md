### Visualizing Graham's Convex Hull Algorithm Using Python
[The Graham Scan](https://mathweb.ucsd.edu/~ronspubs/72_10_convex_hull.pdf) is one of the most well-known algorithms in computing history.
![alt-text](https://github.com/johnma02/Convex-hull-visualization/blob/master/gscan.gif)
Using [Matplotlib](https://matplotlib.org/), [Numpy](https://numpy.org/), [SciPy](https://scipy.org/), and [Qt](https://www.qt.io/qt-for-python) for Python, this application visualizes the implementation of the Graham Scan, and finds the [convex hull](https://mathworld.wolfram.com/ConvexHull.html) of a finite set of points in ℝ².


### Running
If all dependencies are present, run the following shell command to run the application.
```shell
python dialog.py
```

Currently, only CSV files are supported for use. See [sample.csv](https://github.com/johnma02/Convex-hull-visualization/blob/master/sample.csv) for a formatting guide.


### Dependencies
Get started with Python installation [here](https://www.python.org/downloads/) (Python 3.X ≥ **required**).


If your machine already has Python, or after you've installed Python, ensure that your machine has PIP installed. 
**If your machine has Anaconda installed, Matplotlib and Numpy will already be available and ready for use.**

**PyQt5 will still need to be installed.**

### Platform Dependent Instructions
Depending on your platform, you may be able to use your native package manager to retrieve python dependencies. For example, on...
#### Debian/Ubuntu
```shell
sudo apt-get install python3-matplotlib
```
 
Consult your platform's package manager's documentation for concise instructions on installing each dependency individually.


Alternatively, one can use PIP to retrieve dependencies.
### PIP

Run the following shell command to check if your machine has PIP installed.
#### Linux/MacOS
```shell
python -m ensurepip --upgrade
```
#### Windows
```shell
py -m ensurepip --upgrade
```
If your machine does not have PIP installed, follow the instructions on [this website](https://pip.pypa.io/en/stable/installation/) to install PIP.
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
#### SciPy
```shell
pip install scipy
```
