'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Inheritance.module.css'
import { useLanguage } from '../../context/LanguageContext'

export default function InheritancePage() {
    const { t, language } = useLanguage()
    const [amount, setAmount] = useState<number>(0)
    const [heirsCounts, setHeirsCounts] = useState<Record<string, number>>({})
    const [result, setResult] = useState<null | any>(null)

    const HEIRS_LIST = [
        { id: 'husband', label: t.inheritance.heirs.husband, category: 'spouse' },
        { id: 'wife', label: t.inheritance.heirs.wife, category: 'spouse' },
        { id: 'father', label: t.inheritance.heirs.father, category: 'ancestor' },
        { id: 'mother', label: t.inheritance.heirs.mother, category: 'ancestor' },
        { id: 'son', label: t.inheritance.heirs.son, category: 'descendant' },
        { id: 'daughter', label: t.inheritance.heirs.daughter, category: 'descendant' },
        { id: 'g_son', label: t.inheritance.heirs.g_son, category: 'descendant' },
        { id: 'g_daughter', label: t.inheritance.heirs.g_daughter, category: 'descendant' },
        { id: 'f_brother', label: t.inheritance.heirs.f_brother, category: 'collateral' },
        { id: 'f_sister', label: t.inheritance.heirs.f_sister, category: 'collateral' },
        { id: 'p_brother', label: t.inheritance.heirs.p_brother, category: 'collateral' },
        { id: 'p_sister', label: t.inheritance.heirs.p_sister, category: 'collateral' },
    ]

    const updateCount = (id: string, val: number) => {
        setHeirsCounts(prev => ({ ...prev, [id]: Math.max(0, val) }))
    }

    const calculate = () => {
        if (amount <= 0) return alert(t.inheritance.alertEstate)

        const shares: any[] = []
        let remaining = amount
        const activeHeirs = Object.entries(heirsCounts).filter(([_, count]) => count > 0)

        if (activeHeirs.length === 0) {
            setResult({
                total: `${amount.toLocaleString()} ${t.inheritance.currency}`,
                isGovernment: true,
                summary: t.inheritance.baitAlMal,
                shares: [
                    { name: t.inheritance.baitAlMalName, share: '١٠٠٪', amount: `${amount.toLocaleString()} ${t.inheritance.currency}` }
                ]
            })
            return
        }

        // Spouses
        if (heirsCounts['husband'] > 0) {
            const hasDescendants = (heirsCounts['son'] || 0) > 0 || (heirsCounts['daughter'] || 0) > 0
            const shareRatio = hasDescendants ? 0.25 : 0.5
            const share = amount * shareRatio
            shares.push({
                name: t.inheritance.heirs.husband,
                share: hasDescendants ? t.inheritance.fractions.quarter : t.inheritance.fractions.half,
                amount: `${share.toLocaleString()} ${t.inheritance.currency}`,
                individual: `${t.inheritance.individualShare} ${share.toLocaleString()} ${t.inheritance.currency}`
            })
            remaining -= share
        }
        if (heirsCounts['wife'] > 0) {
            const wives = heirsCounts['wife'] || 1
            const hasDescendants = (heirsCounts['son'] || 0) > 0 || (heirsCounts['daughter'] || 0) > 0
            const shareRatio = hasDescendants ? 0.125 : 0.25
            const totalWifeShare = amount * shareRatio
            const individualWifeShare = totalWifeShare / wives
            shares.push({
                name: `${t.inheritance.heirs.wife} (${wives})`,
                share: hasDescendants ? t.inheritance.fractions.eighth : t.inheritance.fractions.quarter,
                amount: `${Math.round(totalWifeShare).toLocaleString()} ${t.inheritance.currency}`,
                individual: `${t.inheritance.perWifeShare} ${Math.round(individualWifeShare).toLocaleString()} ${t.inheritance.currency}`
            })
            remaining -= totalWifeShare
        }

        // Parents
        if (heirsCounts['father'] > 0) {
            const share = amount * (1 / 6)
            shares.push({
                name: t.inheritance.heirs.father,
                share: t.inheritance.fractions.sixth,
                amount: `${Math.round(share).toLocaleString()} ${t.inheritance.currency}`,
                individual: `${t.inheritance.individualShare} ${Math.round(share).toLocaleString()} ${t.inheritance.currency}`
            })
            remaining -= share
        }
        if (heirsCounts['mother'] > 0) {
            const share = amount * (1 / 6)
            shares.push({
                name: t.inheritance.heirs.mother,
                share: t.inheritance.fractions.sixth,
                amount: `${Math.round(share).toLocaleString()} ${t.inheritance.currency}`,
                individual: `${t.inheritance.individualShare} ${Math.round(share).toLocaleString()} ${t.inheritance.currency}`
            })
            remaining -= share
        }

        // Children (Assaba)
        const sons = heirsCounts['son'] || 0
        const daughters = heirsCounts['daughter'] || 0
        if (sons > 0 || daughters > 0) {
            const totalParts = (sons * 2) + daughters
            const partVal = remaining / totalParts
            if (sons > 0) {
                const totalSonShare = partVal * 2 * sons
                const individualShare = totalSonShare / sons
                shares.push({
                    name: `${t.inheritance.heirs.son} (${sons})`,
                    share: t.inheritance.residueRatio,
                    amount: `${Math.round(totalSonShare).toLocaleString()} ${t.inheritance.currency}`,
                    individual: `${t.inheritance.perSonShare} ${Math.round(individualShare).toLocaleString()} ${t.inheritance.currency}`
                })
            }
            if (daughters > 0) {
                const totalDaughterShare = partVal * daughters
                const individualShare = totalDaughterShare / daughters
                shares.push({
                    name: `${t.inheritance.heirs.daughter} (${daughters})`,
                    share: t.inheritance.fixedOrResidue,
                    amount: `${Math.round(totalDaughterShare).toLocaleString()} ${t.inheritance.currency}`,
                    individual: `${t.inheritance.perDaughterShare} ${Math.round(individualShare).toLocaleString()} ${t.inheritance.currency}`
                })
            }
            remaining = 0
        }

        if (remaining > 0) {
            shares.push({ name: t.inheritance.otherHeirs, share: t.inheritance.asPerCase, amount: `${Math.round(remaining).toLocaleString()} ${t.inheritance.currency}` })
        }

        setResult({
            total: `${amount.toLocaleString()} ${t.inheritance.currency}`,
            isGovernment: false,
            summary: t.inheritance.saudiSystem,
            shares
        })
    }

    return (
        <div style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
            <div className={styles.grid}>
                <div className="card">
                    <h3 className="serif-title" style={{ marginBottom: '32px', fontSize: '1.5rem' }}>{t.inheritance.formTitle}</h3>
                    <div className={styles.form}>
                        <div className={styles.inputGrp}>
                            <label>{t.inheritance.estateLabel}</label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder={t.inheritance.estatePlaceholder}
                                onChange={e => setAmount(Number(e.target.value))}
                            />
                        </div>

                        <div className={styles.heirsControlGrid}>
                            {HEIRS_LIST.map(h => (
                                <div key={h.id} className={styles.heirControlRow}>
                                    <div className={styles.heirLabel}>
                                        <span style={{ fontWeight: 700 }}>{h.label}</span>
                                    </div>
                                    <div className={styles.counter}>
                                        <button onClick={() => updateCount(h.id, (heirsCounts[h.id] || 0) - 1)}>−</button>
                                        <input
                                            type="number"
                                            value={heirsCounts[h.id] || 0}
                                            onChange={e => updateCount(h.id, Number(e.target.value))}
                                        />
                                        <button onClick={() => updateCount(h.id, (heirsCounts[h.id] || 0) + 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '32px' }}
                            onClick={calculate}
                        >
                            {t.inheritance.calculateBtn}
                        </button>
                    </div>
                </div>

                <div className={styles.resultCol}>
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`card ${styles.resultCard} ${result.isGovernment ? styles.govResult : ''}`}
                            >
                                <div className={styles.resultHeader}>
                                    <h3 className="serif-title">{result.isGovernment ? t.inheritance.govTitle : t.inheritance.resultTitle}</h3>
                                    <div className={styles.totalBadge}>{result.total}</div>
                                </div>
                                <p className={styles.summary}>{result.summary}</p>

                                <div className={styles.sharesContainer}>
                                    {result.shares.map((s: any, i: number) => (
                                        <div key={i} className={styles.shareRow}>
                                            <div className={styles.shareMain}>
                                                <strong>{s.name}</strong>
                                                <span>{s.share}</span>
                                            </div>
                                            <div className={styles.shareVal}>
                                                <div>{s.amount}</div>
                                                {s.individual && <div className={styles.individualTag}>{s.individual}</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {!result.isGovernment && (
                                    <button className="btn-secondary" style={{ width: '100%', marginTop: '32px', justifyContent: 'center' }}>
                                        {t.inheritance.downloadPdf}
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <div key="placeholder" className={styles.placeholder}>
                                <div className={styles.placeholderIcon}>⚖️</div>
                                <p>{t.inheritance.placeholder}</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
