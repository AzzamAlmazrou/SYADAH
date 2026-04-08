'use client'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
    const { t, language } = useLanguage()

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.brandSection}>
                        <h3 className="serif-title">{language === 'ar' ? 'سِيادَة' : 'SIYADAH'}</h3>
                        <p>{t.footer.description}</p>
                    </div>

                    <div className={styles.linksGrid} style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                        <div className={styles.linkCol}>
                            <h4>{t.footer.services}</h4>
                            <Link to="/contracts" className={styles.footerBrandLink}>{t.footer.contractCenter}</Link>
                            <Link to="/consult" className={styles.footerBrandLink}>{t.footer.smartAdvisor}</Link>
                            <Link to="/calculators" className={styles.footerBrandLink}>{t.footer.inheritanceCalc}</Link>
                        </div>
                        <div className={styles.linkCol}>
                            <h4>{t.footer.community}</h4>
                            <Link to="/lawyers" className={styles.footerBrandLink}>{t.footer.expertGuide}</Link>
                        </div>
                        <div className={styles.linkCol}>
                            <h4>{t.footer.platform}</h4>
                            <Link to="/about" className={styles.footerBrandLink}>{t.footer.about}</Link>
                            <Link to="/latest-updates" className={styles.footerBrandLink} style={{ fontWeight: 'bold', color: 'var(--brand-ink)' }}>
                                {t.footer.latestUpdates}
                            </Link>
                            <Link to="/terms" className={styles.footerBrandLink}>{t.footer.privacy}</Link>
                            <Link to="/terms" className={styles.footerBrandLink}>{t.footer.terms}</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>{t.footer.rights}</p>
                    <div className={styles.socials}>
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
