function fallDown(strength, bounciness, timeout) {
    let elems = [...document.querySelectorAll("img")];

    elems = elems.filter(
        (elem) =>
            elem.getBoundingClientRect().bottom <
            document.body.getBoundingClientRect().bottom
    );
    elems = elems.map((elem) => ({
        node: elem,
        x: elem.getBoundingClientRect().left,
        y: elem.getBoundingClientRect().top,
        vel: 0,
    }));
    elems.forEach((elem) => {
        elem.node.style.width = elem.node.getBoundingClientRect().width + "px";
        elem.node.style.position = "fixed";
        elem.node.style.left = elem.x + "px";
        elem.node.style.top = elem.y + "px";
    });

    physicsLoop(elems, strength, bounciness, timeout);
}

function applyGravity(elems, strength, bounciness) {
    elems.forEach((elem) => {
        elem.vel += strength;
        elem.y += elem.vel;
        elem.node.style.top = elem.y + "px";
        const distance =
            document.body.getBoundingClientRect().bottom -
            elem.node.getBoundingClientRect().bottom;
        if (distance <= 0) {
            elem.vel *= -bounciness;
            elem.y += distance;
        }
    });
}

function physicsLoop(elems, strength, bounciness, timeout) {
    applyGravity(elems, strength, bounciness);
    setTimeout(physicsLoop, timeout, ...arguments);
}
