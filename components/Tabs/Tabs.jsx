import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Tabs.module.css'

const tabs = [
    {text: 'Категории', route: '/categories'},
    {text: 'Расходы', route: '/data'},
    {text: 'Диаграмма', route: '/chart'}, //fixme styles.disabled
]

function Tabs() {
    const pathname = usePathname()

    return (<ul className={styles.tabs}>
        { tabs.map(tab => (
            <li key={tab.route} className={`${styles.tab} ${pathname === tab.route ? styles.active : ''}`} >
        <Link href={tab.route}>{tab.text}</Link>
    </li>)) }
</ul>)
}

export default Tabs