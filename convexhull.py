import matplotlib.pyplot as plt
import numpy as np
import scipy


def load_data(fname: str) -> np.ndarray:
    coordinates = np.genfromtxt(fname, delimiter=",")
    return coordinates


def polar_angle_sort(p1, p2) -> float:
    if p1[0] == p2[0]:
        return float('inf')
    else:
        return 1.0 * (p1[1] - p2[1]) / (p1[0] - p2[0])

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
    sorted_points = coordinates.tolist()
    sorted_points.sort(key=lambda p: (polar_angle_sort(p, starting_point), -p[1], p[0]))
    sorted_points = np.array(sorted_points)

    x,y = sorted_points.T

    plt.scatter(x, y, cmap="jet")
    plt.savefig('init.png')

    # step 3 of graham scan -- using a stack, find the convex hull
    hull = [] # stack




def main():
    c = load_data("/Users/johnma/PycharmProjects/Convex-hull-visualization/sample.csv")
    graham_scan(c)


main()
