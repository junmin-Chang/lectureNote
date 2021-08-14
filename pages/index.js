import Head from 'next/head'
import Link from 'next/link'
import Layout from "../components/layout";
import {siteTitle} from "../components/layout";
import utilStyles from '../styles/util.module.css'
import Date from "../components/date";
import { useState } from 'react'
import {getSortedPostsData} from "../lib/posts";
import Image from 'next/image'
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

                    <Link href={`/posts/${id}`} key={id}>
                        <a>
                        <li style={{
                      backgroundColor: '#262222',
                      marginTop: '1rem',
                      padding: '1rem',
                      borderRadius: '1rem'
                  }}>
                          <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}>
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
                ))}
            </ul>
        </section>

    </Layout>
  )
}
