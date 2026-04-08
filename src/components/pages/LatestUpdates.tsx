'use client'
import { useLanguage } from '../../context/LanguageContext'
import styles from './LatestUpdates.module.css'
import { Icons } from '../Icons'
import MotionWrapper from '../MotionWrapper'

export default function LatestUpdates() {
    const { t, language } = useLanguage()

    return (
        <div className="container" style={{ minHeight: '80vh', padding: '100px 20px' }}>
            <MotionWrapper>
                <div className={styles.header}>
                    <h1 className="serif-title section-title">{t.updates.title}</h1>
                    <p className="section-subtitle">{t.updates.subtitle}</p>
                </div>

                <div className={styles.updatesGrid}>
                    <div className={styles.updateCard}>
                        <div className={styles.updateBadge}>
                            <Icons.Check className={styles.updateIcon} />
                            <span>{t.updates.v1.date}</span>
                        </div>
                        <h2>{t.updates.v1.title}</h2>
                        <ul className={styles.updateList}>
                            <li>{t.updates.v1.item1}</li>
                            <li>{t.updates.v1.item2}</li>
                            <li>{t.updates.v1.item3}</li>
                        </ul>
                    </div>
                </div>
            </MotionWrapper>
        </div>
    )
}
