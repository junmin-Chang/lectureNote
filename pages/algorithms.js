import React from 'react'
import {getSortedPostsData} from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Head from 'next/head'
import Layout from "../components/layout";
import PostBlock from "../components/postblock";
import utilStyles from '../styles/util.module.css'
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
        <>
            <Head>
                <title>Jungorithm | 알고리즘 목록</title>
            </Head>
            <Layout>
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <ul className={utilStyles.list}>

                        {posts.filter(({ tag }) => tag === "algorithms")
                            .map(({ title, id, date, tag }) => (
                                <PostBlock date={date} title={title} id={id} tag={tag} key={id}/>
                            ))
                        }
                    </ul>
                </section>
            </Layout>
        </>

    )
}