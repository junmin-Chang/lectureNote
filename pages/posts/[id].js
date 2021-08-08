import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from 'next/head'
import Date from "../../components/date";
import CodeBlock from "../../components/codeblock";
import ReactMarkdown from "react-markdown";
import utilStyles from '../../styles/util.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div>
                    <Date dateString={postData.date}/>
                </div>
                <ReactMarkdown components={CodeBlock}>{postData.markdown}</ReactMarkdown>
            </article>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }

}