import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/util.module.css'
import Link from 'next/link'

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
                            height={144}
                            width={144}
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
                                    height={144}
                                    width={144}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>Back</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <div>
                <h3>Category</h3>
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