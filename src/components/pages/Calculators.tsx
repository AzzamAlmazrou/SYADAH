'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Calculators.module.css'
import { useLanguage } from '../../context/LanguageContext'
import { Icons } from '../Icons'
import { FadeInUp } from '../MotionWrapper'
import InheritancePage from './Inheritance'

export default function CalculatorsPage() {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState('inheritance')

    return (
        <div className="page-section">
            <div className="container">
                <FadeInUp>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="badge badge-gold">{t.calculators.badge}</div>
                        <h1 className="section-title serif-title">{t.calculators.title}</h1>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.calculators.subtitle}</p>
                    </div>
                </FadeInUp>

                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tabBtn} ${activeTab === 'inheritance' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('inheritance')}
                    >
                        <Icons.Inheritance className={styles.tabIcon} />
                        {t.calculators.inheritance}
                    </button>
                    <button 
                        className={`${styles.tabBtn} ${activeTab === 'eos' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('eos')}
                    >
                        <Icons.Contract className={styles.tabIcon} />
                        {t.calculators.eos}
                    </button>
                    <button 
                        className={`${styles.tabBtn} ${activeTab === 'zakat' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('zakat')}
                    >
                        <Icons.Home className={styles.tabIcon} />
                        {t.calculators.zakat}
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'inheritance' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <InheritancePage />
                        </motion.div>
                    )}
                    {activeTab === 'eos' && (
                        <motion.div 
                            className={styles.placeholder}
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.comingSoon}>
                                <Icons.Lightning className={styles.bigIcon} />
                                <h2>{t.calculators.eos}</h2>
                                <p>{t.calculators.eosDesc}</p>
                                <span className="badge badge-gold">{t.calculators.comingSoon}</span>
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'zakat' && (
                        <motion.div 
                            className={styles.placeholder}
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.comingSoon}>
                                <Icons.Home className={styles.bigIcon} />
                                <h2>{t.calculators.zakat}</h2>
                                <p>{t.calculators.zakatDesc}</p>
                                <span className="badge badge-gold">{t.calculators.comingSoon}</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
