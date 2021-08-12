import React from 'react'
import Layout from "../components/layout";
import {getSortedPostsData} from "../lib/posts";
import utilStyles from '../styles/util.module.css'
import Link from "next/link";
import Head from 'next/head'
import Date from "../components/date";
export async function getStaticProps() {
    const posts = getSortedPostsData()

    return {
        props: {
            posts
        }
    }
}
export default function DataStructure({ posts }) {
    return (
        <>
            <Head>
                <title>Jungorithm | 자료구조 목록</title>
            </Head>
            <Layout>
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <ul className={utilStyles.list}>
                        {posts.filter(({ tag }) => tag === "data-structure")
                            .map(({ id, title, date }) => (
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
        </>

    )
}