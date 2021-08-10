import React from 'react'
import Link from "next/link";

export default function Category() {
    return (
        <>
            <div>
                <Link href="/posts/algorithms">
                    <a>Algorithms</a>
                </Link>
            </div>
            <div>
                <Link href="/posts/data-structure">
                    <a>자료구조</a>
                </Link>
            </div>
        </>

    )
}