import React from 'react'
import Link from "next/link";
import categoryStyles from './category.module.css'

export default function Category() {
    return (
        <>
            <div className={categoryStyles.categoryWrapper}>
                <Link href="/posts/algorithms">
                    <a className={categoryStyles.category}>Algorithms</a>
                </Link>
                <Link href="/posts/data-structure">
                    <a className={categoryStyles.category}>자료구조</a>
                </Link>
            </div>
            <hr/>
        </>

    )
}