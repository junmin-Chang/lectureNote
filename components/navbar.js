import React from "react";
import { bubble as Menu } from "react-burger-menu";
import Link from 'next/link'

export default function SideBar(props) {
    return (
        // Pass on our props
        <Menu {...props}>
            <div>
                <Link href="/posts/algorithms">
                    <a className="bm-item">
                        Algorithms
                    </a>

                </Link>
            </div>
            <div>
                <Link href="/posts/data-structure">
                    <a className="bm-item">
                        자료구조
                    </a>
                </Link>
            </div>
        </Menu>
    );
};
