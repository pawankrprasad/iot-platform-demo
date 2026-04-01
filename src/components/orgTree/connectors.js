import { NODE_WIDTH, NODE_HEIGHT } from "./layout";

export function getLinks(root) {
    const links = [];

    function walk(node) {
        if (node.children && !node.collapsed) {
            node.children.forEach((child) => {
                links.push({ from: node, to: child });
                walk(child);
            });
        }
    }

    walk(root);
    return links;
}

export function getColumnTrunks(nodes) {
    const map = {};

    nodes.forEach((n) => {
        const x = n.x - 20;

        if (!map[x]) {
            map[x] = { x, top: n.y, bottom: n.y };
        } else {
            map[x].top = Math.min(map[x].top, n.y);
            map[x].bottom = Math.max(map[x].bottom, n.y);
        }
    });

    return Object.values(map);
}