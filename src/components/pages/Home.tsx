'use client'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Home.module.css'
import { useLanguage } from '../../context/LanguageContext'
import { Icons } from '../Icons'

export default function Home() {
    const { t, language } = useLanguage()

    const serviceIcons = [
        <Icons.Contract key="0" className={styles.iconSvg} />,
        <Icons.Bot key="1" className={styles.iconSvg} />,
        <Icons.Inheritance key="2" className={styles.iconSvg} />,
        <Icons.Lawyers key="3" className={styles.iconSvg} />,
        <Icons.Library key="4" className={styles.iconSvg} />,
        <Icons.Inheritance key="5" className={styles.iconSvg} />,
        <Icons.Inheritance key="6" className={styles.iconSvg} />,
        <Icons.Check key="7" className={styles.iconSvg} />,
    ]

    const servicePaths = ['/contracts', '/consult', '/calculators', '/lawyers', '/library', '/calculators', '/calculators', '/contracts']

    return (
        <div className={styles.container_wrapper}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ marginBottom: '40px' }}
                    >
                        <h1 className={styles.heroBrandName}>{t.home.heroBrand}</h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h2 className={styles.heroSubtitle}>{t.home.heroSubtitle}</h2>
                        <p className={styles.heroSub}>{t.home.heroDesc}</p>

                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/contracts" className="btn-primary">{t.home.startFree}</Link>
                            <Link to="/about" className="btn-secondary">{t.home.aboutSiyadah}</Link>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Services */}
            <section className="page-section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div className="badge">{t.home.badge}</div>
                        <h2 className="section-title serif-title">{t.home.servicesTitle}</h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.home.servicesDesc}</p>
                    </div>

                    <div className={styles.grid}>
                        {t.home.services.map((s: any, i: number) => (
                            <Link key={i} to={servicePaths[i]} className={`card ${styles.serviceCard}`}>
                                <div className={styles.iconWrapper}>
                                    {serviceIcons[i]}
                                </div>
                                <h3 className={styles.sTitle}>{s.title}</h3>
                                <p className={styles.sDesc}>{s.desc}</p>
                                <div className={styles.sLink}>{t.home.discoverMore}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section >
        </div>
    )
}
