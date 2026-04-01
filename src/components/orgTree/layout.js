export const NODE_WIDTH = 160;
export const NODE_HEIGHT = 60;
export const H_GAP = 220;
export const V_GAP = 40;

export function layoutTree(root) {
    let yOffset = 0;

    function dfs(node, depth = 0) {
        node.x = depth * H_GAP;

        if (!node.children || node.collapsed) {
            node.y = yOffset;
            yOffset += NODE_HEIGHT + V_GAP;
        } else {
            node.children.forEach((child) => dfs(child, depth + 1));

            const first = node.children[0];
            const last = node.children[node.children.length - 1];
            node.y = (first.y + last.y) / 2;
        }
    }

    dfs(root);
    return root;
}