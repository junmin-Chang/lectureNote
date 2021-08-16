import { useCallback, useState, useRef } from "react";
import Link from 'next/link'
import styles from './search.module.css'


export default function Search() {
    const searchRef = useRef(null)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (query) => `/api/search?q=${query}`

    const onChange = useCallback((event) => {
        const query = event.target.value
        setQuery(query)
        if (query.length) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res.results)
                })
        } else {
            setResults([])
        }
    }, [])



    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])
    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [onClick])

    return (
        <div ref={searchRef} className={styles.container}>
            <input
                className={styles.search}
                onChange={onChange}
                onFocus={onFocus}
                placeholder="포스트 검색"
                type="text"
                value={query}
            />
            { active && results.length > 0 && (
                <ul className={styles.results}>
                    {results.map(({ id, title }) => (
                        <li className={styles.result} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

