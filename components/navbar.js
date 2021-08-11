import React, { useState } from "react";
import { bubble as Menu } from "react-burger-menu";
import Link from 'next/link'

export default function SideBar(props) {


    const [count, setCount] = useState({
        algoCount: 0,
        dataCount: 0
    })
    return (
        // Pass on our props
        <Menu {...props}>
            <div>
                <Link href="/posts/algorithms">
                    <a>
                        {`알고리즘(${count.algoCount})`}
                    </a>

                </Link>
            </div>
            <div>
                <Link href="/posts/data-structure">
                    <a>
                        {`자료구조(${count.dataCount})`}
                    </a>
                </Link>
            </div>
        </Menu>
    );
};
