const scene_root = document.querySelector('a-scene');
const all_texts = [];

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
    for (let row = 0; row <= 0; row++) {
        for (let col = 0; col <= 0; col++) {
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

document.addEventListener('keyup',(e)=>{
    if (e.keyCode === 32) {
        let newTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        while (newTopic === cur_topic) {
            newTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        }
        cur_topic = newTopic;

        for (let i = 0; i < all_texts.length; i++) {
            document.getElementById(all_texts[i]).setAttribute('value', cur_topic);
        }
    }
})