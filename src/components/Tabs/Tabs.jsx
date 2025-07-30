import styles from './Tabs.module.css'

//todo toggle active class and switch content
const showTab = (tabName = '') => console.log(tabName)

function Tabs() {
    return (<ul className={styles.tabs}>
    <li className={`${styles.tab} ${styles.active}`} onClick={() => showTab('categories')}>Категории</li>
    <li className={styles.tab} onClick={() => showTab('expenses')}>Расходы</li>
    <li className={`${styles.tab} ${styles.disabled}`} onClick={() => showTab('chart')}>Диаграмма</li>
</ul>)
}

export default Tabs