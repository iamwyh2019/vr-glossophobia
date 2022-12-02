const scene_root = document.querySelector('a-scene');
const all_texts = [];

const peoplerow = [0,0];
const peoplecol = [-1,1];

// randomly choose one topic
let cur_topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

function load_assets() {
    const assets_root = document.createElement('a-assets');
    for (const key in ASSETS) {
        id = ASSETS[key].id;
        src = ASSETS[key].src;
        // add a tag
        const tag = document.createElement('a-asset-item');
        tag.setAttribute('id', id);
        tag.setAttribute('src', src);
        assets_root.appendChild(tag);
    }
    scene_root.appendChild(assets_root);
}

function create_tag(asset, row, col) {
    const tag = document.createElement('a-entity');
    tag.setAttribute('id', asset.name + '-' + row + '-' + col);
    if (asset.src.endsWith('.gltf')) {
        tag.setAttribute('gltf-model', `#${asset.id}`);
    }
    else if (asset.src.endsWith('.obj')) {
        tag.setAttribute('obj-model', `obj: #${asset.id}; mtl: #${asset.id}-mtl`);
    }
    tag.setAttribute('position', {x: asset.getX(row, col), y: asset.getY(row, col), z: asset.getZ(row, col)});
    tag.setAttribute('rotation', asset.rotation);
    tag.setAttribute('scale', asset.scale);
    tag.setAttribute('shadow', 'cast: true; receive: true');
    return tag;
}

function draw_scene() {
    // draw 2*3 blackboards, row 0~1, col -1~1
    for (let row = 0; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
            const asset = ASSETS['blackboard'];
            const tag = create_tag(asset, row, col);

            const text = document.createElement('a-text');
            const textid = 'text-' + row + '-' + col;
            all_texts.push(textid);
            text.setAttribute('id', textid);
            text.setAttribute('value', TOPICS[0]);
            text.setAttribute('position', {x: 0, y: 0, z: 0.01});
            text.setAttribute('rotation', {x: 0, y: 0, z: 0});
            text.setAttribute('scale', {x: 0.05, y: 0.05, z: 0.05});
            text.setAttribute('letter-spacing', 10);
            text.setAttribute('color', 'white');
            text.setAttribute('align', 'center');
            text.setAttribute('width', 25);

            tag.appendChild(text);

            scene_root.appendChild(tag);
        }
    }

    // draw 2*5 tables, row 0~1, col -2~2
    for (let row = peoplerow[0]; row <= peoplerow[1]; row++) {
        for (let col = peoplecol[0]; col <= peoplecol[1]; col++) {
            const asset = ASSETS['table'];
            const tag = create_tag(asset, row, col);

            // each table has a pencil
            const pencil = create_tag(ASSETS['pencil'], row, col);
            tag.appendChild(pencil);

            // each table has a notebook
            const notebook = create_tag(ASSETS['notebook'], row, col);
            tag.appendChild(notebook);

            // each table has a student
            const student = create_tag(ASSETS['student'], row, col);
            tag.appendChild(student);

            scene_root.appendChild(tag);
        }
    }
}

function main() {
    load_assets();
    draw_scene();
}

main();

function studentRotate(targetPos, duration = 400) {
    // animate each student's rotation
    const interval = 10;
    const steps = duration / interval;

    // compute each student's rotation
    for (let row = peoplerow[0]; row <= peoplerow[1]; row++) {
        for (let col = peoplecol[0]; col <= peoplecol[1]; col++) {
            const student = document.querySelector('#student-' + row + '-' + col);
            const studentPos = student.object3D.getWorldPosition(new THREE.Vector3());
            if (targetPos) {
                const dx = targetPos.x - studentPos.x;
                const dz = targetPos.z - studentPos.z;
                const theta = -Math.atan2(dz, dx) * 180 / Math.PI;
                student.setAttribute('rotate_', theta);
            }
            else {
                // random rotation for each student
                // [60, 120]
                const theta = Math.random() * 60 + 60;
                student.setAttribute('rotate_', theta);
            }

            const rotation = student.getAttribute('rotation');
            student.setAttribute('inity', rotation.y);
        }
    }

    let step = 0;

    // start the animation
    const timer = setInterval(() => {
        step++;
        if (step > steps) {
            clearInterval(timer);
        }
        else {
            for (let row = peoplerow[0]; row <= peoplerow[1]; row++) {
                for (let col = peoplecol[0]; col <= peoplecol[1]; col++) {
                    const student = document.querySelector('#student-' + row + '-' + col);
                    const rotate = parseFloat(student.getAttribute('rotate_'));
                    const inity = parseFloat(student.getAttribute('inity'));
                    const rotation = student.getAttribute('rotation');
                    student.setAttribute('rotation', {
                        x: rotation.x,
                        y: inity + (rotate - inity) * step / steps,
                        z: rotation.z,
                    });
                }
            }
        }
    }, interval);
}

document.addEventListener('keyup',(e)=>{
    if (e.key === ' ') {
        let newTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        while (newTopic === cur_topic) {
            newTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        }
        cur_topic = newTopic;

        for (let i = 0; i < all_texts.length; i++) {
            document.getElementById(all_texts[i]).setAttribute('value', cur_topic);
        }
    }
    // when press c
    else if (e.key === 'c') {
        const camera = document.querySelector('#camera');
        const camera_pos = camera.object3D.getWorldPosition(new THREE.Vector3());

        studentRotate(camera_pos);
    }
})

// follow the camera in real time
// const timer = setInterval(() => {
//     const camera = document.querySelector('#camera');
//     const camera_pos = camera.object3D.getWorldPosition(new THREE.Vector3());

//     studentRotate(camera_pos);
// }, 100);

// every 10 seconds, rotate the students
setInterval(() => {
    studentRotate(null, 2500);
}, 10000);