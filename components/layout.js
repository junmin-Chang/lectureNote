import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/util.module.css'
import Link from 'next/link'
import Category from "./category";

const name = "장준민"
export const siteTitle = "장준민의 자료구조, 알고리즘 노트"
export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/me.jpg"
                            height={130}
                            width={130}
                            alt={name}
                            className={utilStyles.borderCircle}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}의 자료구조 및 알고리즘</h1>

                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    className={utilStyles.borderCircle}
                                    src="/images/me.jpg"
                                    height={130}
                                    width={130}
                                    alt={name}
                                />
                            </a>
                        </Link>
                    </>
                )}
            </header>
            <div>
                <h3>Category</h3>
                <Category/>
            </div>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>Back</a>
                    </Link>
                </div>
            )}

        </div>
    )
}