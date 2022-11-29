const scene_root = document.querySelector('a-scene');

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
    tag.setAttribute('gltf-model', `#${asset.id}`);
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
            scene_root.appendChild(tag);
        }
    }

    // draw 2*5 tables, row 0~1, col -2~2
    for (let row = 0; row <= 1; row++) {
        for (let col = -2; col <= 2; col++) {
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