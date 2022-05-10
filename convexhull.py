import matplotlib.pyplot as plt
from matplotlib import animation
import numpy as np
from scipy import linalg


def load_data(fname: str) -> np.ndarray:
    coordinates = np.genfromtxt(fname, delimiter=",")
    return coordinates


def polar_angle_sort(p1, p2) -> float:
    if p1[0] == p2[0]:
        return float('inf')
    else:
        return 1.0 * (p1[1] - p2[1]) / (p1[0] - p2[0])


def is_left_turn(p1: list, p2: list, p3: list) -> bool:
    matrix = np.array(
        [[p1[0], p2[0], p3[0]],
         [p1[1], p2[1], p3[1]],
         [1.0,    1.0,   1.0]]
    )
    return True if linalg.det(matrix) > 0 else False


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

    x, y = sorted_points.T

    plt.scatter(x, y, cmap="jet")
    plt.savefig('init.png')

    # step 3 of graham scan -- using a stack, find the convex hull
    hull = []  # stack
    for i in sorted_points:
        while len(hull) > 2 and not is_left_turn(hull[-3], hull[-2], hull[-1]):
            hull.pop(-2)
        hull.append(i.tolist())
    x,y = np.array(hull).T
    plt.plot(x, y)
    plt.plot((x[0],x[-1]), (y[0],y[-1]))
    print(hull)
    plt.savefig("hull.png")





def main():
    c = load_data("/Users/johnma/PycharmProjects/Convex-hull-visualization/sample.csv")
    graham_scan(c)


main()
