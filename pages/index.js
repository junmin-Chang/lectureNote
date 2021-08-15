import Head from 'next/head'
import Link from 'next/link'
import Layout from "../components/layout";
import {siteTitle} from "../components/layout";
import utilStyles from '../styles/util.module.css'
import Date from "../components/date";
import { useState } from 'react'
import {getSortedPostsData} from "../lib/posts";
import Image from 'next/image'
import PostBlock from "../components/postblock";
export async function getStaticProps() {
    const allPostData = getSortedPostsData()

    return {
        props: {
            allPostData
        }
    }
}
export default function Home({ allPostData }) {
    const [postCount, setPostCount] = useState({
        algo: allPostData.filter(({ tag }) => tag === "algorithms").length,
        dataStructure: allPostData.filter(({ tag }) => tag === "data-structure").length
    })

  return (

    <Layout home algo={postCount.algo} dataStructure={postCount.dataStructure}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <ul className={utilStyles.list}>
                {allPostData.map(({ id, date, title, tag }) => (
                   <PostBlock id={id} date={date} title={title} tag={tag} key={id}/>
                ))}
            </ul>
        </section>

    </Layout>
  )
}
