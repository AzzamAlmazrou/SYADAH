'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Library.module.css'
import { useLanguage } from '../../context/LanguageContext'
import { Icons } from '../Icons'
import { FadeInUp } from '../MotionWrapper'

export default function LibraryPage() {
    const { t, language } = useLanguage()
    const [search, setSearch] = useState('')
    const [activeCat, setActiveCat] = useState(t.library.all)

    // Advanced search logic for "Article X of System Y"
    const getArticleResult = () => {
        if (!search) return null
        const articleMatch = language === 'ar' 
            ? (search.match(/الماده\s*(\d+)\s*من\s*(.*)/i) || search.match(/المادة\s*(\d+)\s*من\s*(.*)/i))
            : (search.match(/Article\s*(\d+)\s*of\s*(.*)/i))
            
        if (articleMatch) {
            const num = articleMatch[1]
            const system = articleMatch[2].trim()
            return t.library.articles.find((a: any) => a.article === num && a.system.toLowerCase().includes(system.toLowerCase()))
        }
        return null
    }

    const articleResult = getArticleResult()

    const filtered = t.library.documents.filter((doc: any) => {
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || doc.desc.toLowerCase().includes(search.toLowerCase())
        const matchesCat = activeCat === t.library.all || doc.category === activeCat
        return matchesSearch && matchesCat
    })

    return (
        <div className="page-section">
            <div className="container">
                <FadeInUp>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div className="badge badge-gold">📚 {t.library.badge}</div>
                        <h1 className="section-title serif-title">{t.library.title}</h1>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.library.subtitle}</p>
                    </div>
                </FadeInUp>

                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <h3 className={styles.sidebarTitle}>{t.library.sidebarTitle}</h3>
                        <div className={styles.categoryList}>
                            <button 
                                className={`${styles.categoryBtn} ${activeCat === t.library.all ? styles.activeCategory : ''}`}
                                onClick={() => setActiveCat(t.library.all)}
                            >
                                {t.library.all}
                            </button>
                            {t.library.categories.map((cat: string) => (
                                <button 
                                    key={cat}
                                    className={`${styles.categoryBtn} ${activeCat === cat ? styles.activeCategory : ''}`}
                                    onClick={() => setActiveCat(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <main className={styles.main}>
                        <div className={styles.searchBox}>
                            <input 
                                type="text" 
                                className={styles.searchInput}
                                placeholder={t.library.searchPlaceholder}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <span className={styles.searchIcon}>🔍</span>
                        </div>

                        {articleResult && (
                            <motion.div 
                                className={styles.articleResult}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className={styles.articleHeader}>
                                    <Icons.Lightning className={styles.articleIcon} />
                                    <h4>{t.library.articleResultTitle}</h4>
                                </div>
                                <p className={styles.articleText}>{articleResult.text}</p>
                                <div className={styles.articleFooter}>
                                    <span className={styles.articleSource}>{t.library.source} {articleResult.system}</span>
                                    {articleResult.link && (
                                        <a 
                                            href={articleResult.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.sourceLink}
                                        >
                                            🔗 {t.library.viewSource}
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        <div className={styles.grid}>
                            {filtered.map((doc: any, i: number) => (
                                <motion.div 
                                    key={doc.id}
                                    className={`card ${styles.docCard}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className={styles.docIcon}>
                                        <Icons.Contract />
                                    </div>
                                    <h3 className={styles.docTitle}>{doc.title}</h3>
                                    <p className={styles.docDesc}>{doc.desc}</p>
                                    <div className={styles.docFooter}>
                                        <span>📅 {doc.date}</span>
                                        <span className="badge">{doc.category}</span>
                                    </div>
                                    <button 
                                        className={styles.viewArticlesBtn}
                                        onClick={() => setSearch(language === 'ar' ? `المادة 1 من ${doc.title}` : `Article 1 of ${doc.title}`)}
                                    >
                                        {t.library.viewArticles}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
