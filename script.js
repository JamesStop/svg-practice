const points = {
    point1: [30, 30, 30],
    point2: [30, 70, 30],
    point3: [70, 30, 30],
    point4: [70, 70, 30],
    point5: [30, 30, 70],
    point6: [30, 70, 70],
    point7: [70, 30, 70],
    point8: [70, 70, 70],
}

const cube = {
    line1: ["point1", "point2"],
    line2: ["point1", "point3"],
    line3: ["point1", "point5"],
    line4: ["point2", "point6"],
    line5: ["point2", "point4"],
    line6: ["point3", "point4"],
    line7: ["point3", "point7"],
    line8: ["point4", "point8"],
    line9: ["point5", "point6"],
    line10: ["point5", "point7"],
    line11: ["point6", "point8"],
    line12: ["point7", "point8"],
}

const updateCube = () => {
    Object.keys(cube).map((lineid) => {
        $(`#${lineid}`).attr({
            x1: `${points[cube[lineid][0]][0]}`,
            x2: `${points[cube[lineid][1]][0]}`,
            y1: `${points[cube[lineid][0]][1]}`,
            y2: `${points[cube[lineid][1]][1]}`,
        })
    })
}

const createCube = () => {
    Object.keys(cube).map((lineid) => {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("class", "cube-line")
        line.setAttribute("id", lineid)
        $(`#cube`).append(line);
    })
    updateCube()
}

createCube()


let movement;
const mid = 50

const startMove = (direction) => {
    movement = setInterval(() => {
        let radians = .08
        if (direction == "down" || direction == "left") {
            radians *= -1
        }
        if (direction == "left" || direction == "right") {
            for(var i=0; i<Object.keys(points).length; i++) {
            x = points[Object.keys(points)[i]][0] - mid;
            z = points[Object.keys(points)[i]][2] - mid;
            d = Math.sqrt(x*x + z*z);
            theta  = Math.atan2(x, z) + radians;
            points[Object.keys(points)[i]][0] = mid + d * Math.sin(theta);
            points[Object.keys(points)[i]][2] = mid + d * Math.cos(theta);
            }
        } else {
            for(var i=0; i<Object.keys(points).length; i++)
        {
            x = points[Object.keys(points)[i]][1] - mid;
            z = points[Object.keys(points)[i]][2] - mid;
            d = Math.sqrt(x*x + z*z);
            theta  = Math.atan2(x, z) + radians;
            points[Object.keys(points)[i]][1] = mid + d * Math.sin(theta);
            points[Object.keys(points)[i]][2] = mid + d * Math.cos(theta);
        }
        }
        updateCube()
    }, 50)
}

const endMove = () => {
    clearInterval(movement)
}

