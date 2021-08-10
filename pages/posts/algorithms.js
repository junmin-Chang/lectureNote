import React from 'react'
import {getSortedPostsData} from "../../lib/posts";
import Link from "next/link";
import Date from "../../components/date";
import Layout from "../../components/layout";
import utilStyles from '../../styles/util.module.css'
export async function getStaticProps() {
    const posts = getSortedPostsData()

    return {
        props: {
            posts
        }
    }
}
export default function Algorithms({ posts }) {
    return (
        <Layout>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <ul className={utilStyles.list}>

                {posts.filter(({ tag }) => tag === "algorithms")
                .map(({ title, id, date }) => (
                        <li key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br/>
                            <small>
                                <Date dateString={date}/>
                            </small>
                        </li>
                ))
            }
                </ul>
            </section>
        </Layout>
    )
}