import matplotlib.pyplot as plt
import numpy as np
from scipy import linalg
from matplotlib.animation import FuncAnimation


def load_data(fname: str) -> np.ndarray:
    coordinates = np.unique(np.genfromtxt(fname, delimiter=","), axis=0)
    return coordinates


def polar_angle_sort(p1, p2) -> float:
    if p1[1] == p2[1]:
        return float('inf')
    else:
        return -(p2[0] - p1[0]) / (p2[1] - p1[1])  # sort by reciprocal of slope


def is_left_turn(p1: list, p2: list, p3: list) -> bool:
    matrix = np.array(
        [[p1[0], p2[0], p3[0]],
         [p1[1], p2[1], p3[1]],
         [1.0, 1.0, 1.0]]
    )
    return True if linalg.det(matrix) > 0 else False  # negative determinant implies clockwise orientation of vectors


# Creates and saves a .gif file of finding convex hull using graham scan
def graham_scan(coordinates: np.ndarray) -> np.ndarray:
    plt.style.use('Solarize_Light2')
    # step 1 of graham scan -- find the minimum y-coordinate, if more than 1, find max x value of set
    y_min = np.amin(coordinates, axis=0)  # find minimum y value
    y_mins = y_min.reshape([1, 2])
    for i in coordinates:
        if i[1] == y_min[1]:
            y_mins = np.append(y_mins, [i], axis=0)  # reshaping i into 2d array
    starting_point = np.amax(y_mins, axis=0)  # finding max x value

    # step 2 of graham scan -- sort points by polar angle to starting point
    sorted_points = coordinates.tolist()
    sorted_points.sort(key=lambda p: polar_angle_sort(p, starting_point))  # convert to python list to use custom sort
    sorted_points = np.array(sorted_points)
    print(sorted_points)
    x, y = sorted_points.T
    plt.scatter(x, y, color='blue')
    plt.savefig('init.png')  # save an initial image of our points

    # step 3 of graham scan -- using a stack, find the convex hull
    hull = []  # stack

    for i in sorted_points:
        while len(hull) > 2 and not is_left_turn(hull[-3], hull[-2], hull[-1]):  # pop until left turn found
            hull.pop(-2)  # pop point if it forms a clockwise/right turn
        hull.append(i.tolist())

    x, y = np.array(hull).T
    plt.plot(x, y, color='black')
    plt.plot((x[0], x[-1]), (y[0], y[-1]), 'black')
    plt.savefig("hull.png")  # save initial image of convex hull
    return sorted_points


def instructions(sorted_points: np.ndarray) -> dict:
    instructions_list = {}
    hull = []
    j = 0
    for i in range(0, len(sorted_points)):
        while len(hull) > 2 and not is_left_turn(hull[-3], hull[-2], hull[-1]):
            instructions_list[j] = "POP:"+str(hull[-2])
            j += 1
            hull.pop(-2)
        hull.append(sorted_points[i].tolist())
        instructions_list[j] = "PUSH:"+str(sorted_points[i])
        j += 1
    return instructions_list

def call_animate(sorted_points: np.ndarray, hull: list):
    fig = plt.figure()
    ax = plt.subplot()
    instructions_list = instructions(sorted_points)
    anim = FuncAnimation(fig, animate, frame=np.arange(0,len(instructions_list)),
                         fargs=instructions_list,)


def animate(i: int, instructions_list: dict):
    pass

def main():
    c = load_data("/Users/johnma/PycharmProjects/Convex-hull-visualization/sample.csv")
    s = graham_scan(c)
    i = instructions(s)
    print(i)
main()
