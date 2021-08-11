import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/util.module.css'
import Link from 'next/link'
import SideBar from "./navbar";

const name = "장준민"
export const siteTitle = "Jungorithms"
export default function Layout({ children, home, algo, dataStructure }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} algo={algo} dataStructure={dataStructure}/>

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

            <hr/>
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