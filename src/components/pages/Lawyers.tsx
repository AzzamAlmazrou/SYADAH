'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import styles from './Lawyers.module.css'
import { lawyersDataset } from '../../context/lawyers';
import { useLanguage } from '../../context/LanguageContext';
import { Icons } from '../Icons';

export default function LawyersPage() {
    const [selectedLawyer, setSelectedLawyer] = useState<any>(null)
    const { t } = useLanguage()

    const handleAction = () => {
        alert(t.lawyers.mvpAlert)
    }

    return (
        <div className="page-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="badge">{t.lawyers.badge}</div>
                    <h1 className="section-title serif-title">{t.lawyers.title}</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.lawyers.subtitle}</p>
                </div>

                <div className={styles.lawyerGrid}>
                    {lawyersDataset.map((l: any) => (
                        <motion.div
                            key={l.id}
                            className={`card ${styles.lawyerCard}`}
                            whileHover={{ y: -8 }}
                            onClick={() => setSelectedLawyer(l)}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.locationTag}>{l.loc}</span>
                            </div>
                            <div className={styles.avatar}>
                                <img src={l.img} alt={l.name} referrerPolicy="no-referrer" className={styles.avatarImg} />
                            </div>
                            <h3 className={styles.name}>{l.name}</h3>
                            <p className={styles.spec}>{l.spec}</p>
                            <div className={styles.experience}>{t.lawyers.experience} {l.exp}</div>

                            <div className={styles.footer}>
                                <button className="btn-secondary" style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}>{t.lawyers.viewProfile}</button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.mvpNotice}>
                    {t.lawyers.mvpNotice}
                </div>

                {/* Profile Modal */}
                <AnimatePresence>
                    {selectedLawyer && (
                        <motion.div
                            className={styles.modalOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLawyer(null)}
                        >
                            <motion.div
                                className={styles.modalContent}
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <button className={styles.closeBtn} onClick={() => setSelectedLawyer(null)}>
                                    <Icons.Close className={styles.iconSm} />
                                </button>

                                <div className={styles.modalHeader}>
                                    <div className={styles.modalAvatar}>
                                        <img src={selectedLawyer.img} alt={selectedLawyer.name} referrerPolicy="no-referrer" className={styles.avatarImg} />
                                    </div>
                                    <div className={styles.modalTitleArea}>
                                        <h2 className="serif-title">{selectedLawyer.name}</h2>
                                        <p className={styles.modalSpec}>{selectedLawyer.spec}</p>
                                    </div>
                                </div>

                                <div className={styles.bioSection}>
                                    <strong>{t.lawyers.modal.bio}</strong>
                                    <p>{selectedLawyer.bio}</p>
                                </div>

                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailItem}>
                                        <strong>{t.lawyers.modal.edu}</strong>
                                        <p>{selectedLawyer.edu}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <strong>{t.lawyers.modal.expYears}</strong>
                                        <p>{selectedLawyer.exp}</p>
                                    </div>
                                </div>

                                <div className={styles.achievementsBox}>
                                    <strong>{t.lawyers.modal.achievements}</strong>
                                    <ul>
                                        {selectedLawyer.achievements.map((a: string, i: number) => (
                                            <li key={i}>{a}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.modalActions}>
                                    {selectedLawyer.isBusy ? (
                                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px' }} disabled>
                                            {t.lawyers.modal.busy} <Icons.Warning className={styles.iconSm} />
                                        </button>
                                    ) : (
                                        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleAction}>
                                            {t.lawyers.modal.requestConsult} <Icons.Phone className={styles.iconSm} />
                                        </button>
                                    )}
                                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleAction}>
                                        {t.lawyers.modal.bookAppt} <Icons.Calendar className={styles.iconSm} />
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
