import matplotlib.pyplot as plt
import numpy as np
import scipy


def load_data(fname: str) -> np.ndarray:
    coordinates = np.genfromtxt(fname, delimiter=",")
    x, y = coordinates.T
    plt.scatter(x, y)
    plt.savefig('init.png')
    return coordinates


# Creates and saves a .gif file of finding convex hull using graham scan
def graham_scan(coordinates: np.ndarray):
    # step 1 of graham scan -- find the minimum y-coordinate, if more than 1, find max x value of set
    y_min = np.amin(coordinates, axis=0)  # find minimum y value
    y_mins = y_min.reshape([1, 2])  # numpy reshaping
    for i in coordinates:
        if i[1] == y_min[1]:
            y_mins = np.append(y_mins, [i], axis=0)  # reshaping i into 2d array
    starting_point = np.amax(y_mins, axis=0)  # finding max x value

    # step 2 of graham scan -- sort points by polar angle to starting point
    # we will use a python dictionary to store indices / angle
    polar_angles = {}
    for i in range(0,len(coordinates)):







def main():
    c = load_data("/Users/johnma/PycharmProjects/Convex-hull-visualization/sample.csv")
    graham_scan(c)


main()
