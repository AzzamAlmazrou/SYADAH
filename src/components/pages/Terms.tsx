'use client'
import styles from './Terms.module.css'
import { useLanguage } from '../../context/LanguageContext'

export default function TermsPage() {
    const { t } = useLanguage()
    return (
        <div className="page-section">
            <div className="container">
                <div className={`card ${styles.termsCard}`}>
                    <h1 className="serif-title" style={{ marginBottom: '40px', textAlign: 'center', borderBottom: '2px solid var(--border)', paddingBottom: '20px' }}>
                        {t.terms.title}
                    </h1>

                    {t.terms.sections.map((section: { title: string; content: string }, index: number) => (
                        <div key={index} className={styles.section}>
                            <h3>{section.title}</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
                        </div>
                    ))}

                    <div style={{ marginTop: '100px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', borderTop: '2px solid var(--border)', paddingTop: '40px' }}>
                        {t.terms.dateLabel} <br />
                        {t.terms.footer}
                    </div>
                </div>
            </div>
        </div>
    )
}
