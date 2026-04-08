'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Simplify.module.css'
import { FadeInUp } from '../MotionWrapper'

import { useLanguage } from '../../context/LanguageContext'

const ELASTIC_AR = [
    'حسب ما تراه الجهة المختصة', 'وفق ما يقتضيه الأمر', 'في الحالات المناسبة',
    'بما يتناسب مع', 'وفقاً للوائح المنفّذة', 'يجوز', 'قد يُعاقَب',
    'حسب الظروف', 'بناءً على ما تقدّره', 'عند الاقتضاء',
    'في حدود ما تسمح به اللوائح', 'التقدير المناسب',
]

const ELASTIC_EN = [
    'as deemed appropriate', 'as required', 'in appropriate cases',
    'commensurate with', 'according to the implementing regulations', 'may', 'may be punished',
    'depending on circumstances', 'based on its assessment', 'when necessary',
    'within the limits allowed by regulations', 'appropriate discretion',
]

function highlight(text: string, language: string) {
    let result = text
    const found: string[] = []
    const elastic = language === 'ar' ? ELASTIC_AR : ELASTIC_EN
    elastic.forEach(w => {
        if (text.includes(w)) {
            found.push(w)
            result = result.replaceAll(w, `<mark class="elastic">${w}</mark>`)
        }
    })
    return { html: result, found }
}

const SAMPLE_AR = `المادة (١٢): يجوز للجهة المختصة، وفق ما تراه مناسباً، أن تفرض على المنشآت التجارية غرامات مالية تتراوح بين (١٠٠٠) ريال و(٥٠,٠٠٠) ريال في حال مخالفة أحكام هذه اللائحة، وذلك بناءً على ما تقدّره من ظروف المخالفة وملابساتها. كما يحق للجهة عند الاقتضاء إغلاق المنشأة مؤقتاً أو بصورة نهائية في الحالات المناسبة.`
const SAMPLE_EN = `Article (12): The competent authority may, as it deems appropriate, impose financial fines on commercial establishments ranging between (1,000) riyals and (50,000) riyals in the event of a violation of the provisions of these regulations, based on its assessment of the circumstances and merits of the violation. The authority also has the right, when necessary, to close the establishment temporarily or permanently in appropriate cases.`

export default function SimplifyPage() {
    const { t, language } = useLanguage()
    const [input, setInput] = useState('')
    const [result, setResult] = useState<{ html: string; found: string[] } | null>(null)
    const [loading, setLoading] = useState(false)

    const analyze = () => {
        if (!input.trim()) return
        setLoading(true)
        setTimeout(() => {
            setResult(highlight(input, language))
            setLoading(false)
        }, 1200)
    }

    const loadSample = () => setInput(language === 'ar' ? SAMPLE_AR : SAMPLE_EN)

    return (
        <div className="page-section">
            <div className="container">
                <FadeInUp>
                    <div className="page-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div className="badge badge-gold" style={{ marginBottom: 16 }}>📖 {t.simplify.badge}</div>
                        <h1 className="section-title">{t.simplify.title}</h1>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            {t.simplify.subtitle}
                        </p>
                    </div>
                </FadeInUp>

                <div className={styles.layout}>
                    {/* Input */}
                    <motion.div
                        className={styles.panel}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>📝 {t.simplify.inputTitle}</h3>
                            <button className={styles.sampleBtn} onClick={loadSample}>{t.simplify.sampleBtn}</button>
                        </div>
                        <textarea
                            className={styles.textarea}
                            placeholder={t.simplify.placeholder}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            rows={12}
                        />
                        <button
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                            onClick={analyze}
                            disabled={!input.trim() || loading}
                        >
                            {loading ? `⏳ ${t.simplify.analyzing}` : `🔍 ${t.simplify.analyzeBtn}`}
                        </button>
                    </motion.div>

                    {/* Output */}
                    <motion.div
                        className={styles.panel}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>✅ {t.simplify.resultTitle}</h3>
                            {result && <span className="badge badge-green">{result.found.length} {t.simplify.elasticBadge}</span>}
                        </div>

                        {!result && !loading && (
                            <div className={styles.empty}>
                                <span style={{ fontSize: '3rem' }}>⚖️</span>
                                <p>{t.simplify.empty}</p>
                            </div>
                        )}

                        {loading && (
                            <div className={styles.empty}>
                                <div className={styles.spinner} />
                                <p style={{ color: 'var(--text-secondary)' }}>{t.simplify.loading}</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {result && !loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div
                                        className={styles.resultText}
                                        dangerouslySetInnerHTML={{ __html: result.html }}
                                    />
                                    {result.found.length > 0 && (
                                        <motion.div
                                            className={styles.elasticList}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                        >
                                            <h4 className={styles.elasticTitle}>⚠️ {t.simplify.elasticFound}</h4>
                                            <div className={styles.elasticTags}>
                                                {result.found.map(w => (
                                                    <span key={w} className={styles.elasticTag}>{w}</span>
                                                ))}
                                            </div>
                                            <p className={styles.elasticNote}>
                                                {t.simplify.elasticNote}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
