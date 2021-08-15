import React from 'react'
import Link from "next/link";
import utilStyles from "../styles/util.module.css";
import Image from "next/image";
import Date from "./date";

export default function PostBlock({ id, date, tag, title }) {
    return (
        <Link href={`/posts/${id}`}>
            <a>
                <li className={utilStyles.postItemList}>
                    <div className={utilStyles.imageWrapper}>
                        <Image
                            src={`/images/${id}.png`}
                            width={339}
                            height={130}
                            priority
                            alt={tag}
                        />
                    </div>
                    <h3>{title}</h3>
                    <small className={utilStyles.date}>
                        <Date dateString={date}/>
                    </small>
                </li>
            </a>
        </Link>
    )
}