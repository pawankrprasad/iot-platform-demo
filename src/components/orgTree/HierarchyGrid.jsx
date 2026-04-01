import React, { useMemo, useState } from "react";
import NodeCard from "./NodeCard";
import {
    layoutTree,
    NODE_WIDTH,
    NODE_HEIGHT
} from "./layout";
import {
    getLinks,
    getColumnTrunks
} from "./connectors";
import "./styles.css";

export default function HierarchyGrid({ data }) {
    const [tree, setTree] = useState(data);

    const toggle = (id, node = tree) => {
        if (node.id === id) {
            node.collapsed = !node.collapsed;
        } else if (node.children) {
            node.children.forEach((c) => toggle(id, c));
        }
        setTree({ ...tree });
    };

    const layout = useMemo(
        () => layoutTree(structuredClone(tree)),
        [tree]
    );

    const nodes = [];
    function collect(n) {
        nodes.push(n);
        if (n.children && !n.collapsed) {
            n.children.forEach(collect);
        }
    }
    collect(layout);

    const links = getLinks(layout);
    const trunks = getColumnTrunks(nodes);

    return (
        <div className="canvas">
            {/* SVG CONNECTORS */}
            <svg className="edges">
                {/* vertical trunks */}
                {trunks.map((t, i) => (
                    <line
                        key={i}
                        x1={t.x}
                        y1={t.top}
                        x2={t.x}
                        y2={t.bottom + NODE_HEIGHT}
                        stroke="#cbd5e1"
                        strokeWidth="2"
                    />
                ))}

                {/* horizontal + elbow connectors */}
                {links.map((l, i) => {
                    const y1 = l.from.y + NODE_HEIGHT / 2;
                    const y2 = l.to.y + NODE_HEIGHT / 2;
                    const trunkX = l.to.x - 20;

                    return (
                        <g key={i}>
                            <line x1={l.from.x + NODE_WIDTH} y1={y1} x2={trunkX} y2={y1} stroke="#cbd5e1" />
                            <line x1={trunkX} y1={y1} x2={trunkX} y2={y2} stroke="#cbd5e1" />
                            <line x1={trunkX} y1={y2} x2={l.to.x} y2={y2} stroke="#cbd5e1" />

                            {/* junction */}
                            <circle cx={trunkX} cy={y2} r="4" fill="#94a3b8" />
                        </g>
                    );
                })}
            </svg>

            {/* NODES */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className="node"
                    style={{
                        transform: `translate(${node.x}px, ${node.y}px)`
                    }}
                >
                    <NodeCard node={node} onToggle={toggle} />
                </div>
            ))}
        </div>
    );
}