const ASSETS = {
    'blackboard': {
        id: 'blackboard-gltf',
        src: 'https://dinotoju.github.io/blackboard/Blackboard.gltf',
        getX: (row, col) => 5.75*col,
        getY: (row, col) => 3*row+1.8,
        getZ: (row, col) => -7.5,
        rotation: "0 0 0",
        scale: "4.5 4 5",
    },
    'table': {
        id: 'table-gltf',
        src: 'https://dinotoju.github.io/table/Table_Large_Rectangular_01.gltf',
        getX: (row, col) => 2*col,
        getY: (row, col) => 0,
        getZ: (row, col) => 2.5*row-0.5,
        rotation: "0 90 0",
        scale: ".1 .1 .08",
    },
    'pencil': {
        id: 'pencil-gltf',
        src: 'https://dinotoju.github.io/pencil/Pencil_01.gltf',
        getX: (row, col) => -1,
        getY: (row, col) => 8,
        getZ: (row, col) => 4,
        rotation: "0 -90 0",
        scale: ".5 .7 .5",
    },
    'notebook': {
        id: 'notebook-gltf',
        src: 'https://dinotoju.github.io/notebook/model.gltf',
        getX: (row, col) => -4.5,
        getY: (row, col) => -1.5,
        getZ: (row, col) => -4,
        rotation: "0 -90 0",
        scale: "7.5 5 7.5",
    },
    'student': {
        id: 'student-obj',
        //src: 'https://dinotoju.github.io/student/model.gltf',
        src: './man1chair1/man.obj',
        getX: (row, col) => -12,
        getY: (row, col) => 0,
        getZ: (row, col) => 0,
        rotation: "0 90 0",
        scale: ".5 .35 .5",
    },
    'student-mtl': {
        id: 'student-obj-mtl',
        src: './man1chair1/man.mtl',
    },
}

// add a "name" to each asset
for (const key in ASSETS) {
    ASSETS[key].name = key;
}