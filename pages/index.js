import Head from 'next/head'
import Link from 'next/link'
import Layout from "../components/layout";
import {siteTitle} from "../components/layout";
import utilStyles from '../styles/util.module.css'
import Date from "../components/date";
import {getSortedPostsData} from "../lib/posts";

export async function getStaticProps() {
    const allPostData = getSortedPostsData()

    return {
        props: {
            allPostData
        }
    }
}
export default function Home({ allPostData }) {


  return (

    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <ul className={utilStyles.list}>
                {allPostData.map(({ id, date, title }) => (

                  <li key={id}>
                      <Link href={`posts/${id}`}>
                          <a>{title}</a>
                      </Link>
                      <br/>
                      <small>
                          <Date dateString={date}/>
                      </small>
                  </li>

                ))}
            </ul>
        </section>

    </Layout>
  )
}
