import matplotlib.pyplot as plt
import numpy as np
import scipy

def cvh(fname: str):
    coordinates = np.genfromtxt(fname, delimiter=",")
    x,y = coordinates.T
    plt.scatter(x,y)
    plt.savefig('init.png')
