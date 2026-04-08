'use client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useLanguage } from '../context/LanguageContext'
import { Icons } from './Icons'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { language, setLanguage, t } = useLanguage()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar')
    }

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContent}`}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.bracket}>[</span>
                    {language === 'ar' ? 'سِيادَة' : 'SIYADAH'}
                    <span className={styles.bracket}>]</span>
                </Link>

                {/* Overlay Background for Sidebar */}
                <div 
                    className={`${styles.menuOverlay} ${isOpen ? styles.activeOverlay : ''}`} 
                    onClick={() => setIsOpen(false)}
                />

                <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <Icons.Home className={styles.navIcon} />
                        {t.nav.home}
                    </Link>
                    <Link to="/contracts" onClick={() => setIsOpen(false)}>
                        <Icons.Contract className={styles.navIcon} />
                        {t.nav.contracts}
                    </Link>
                    <Link to="/consult" onClick={() => setIsOpen(false)}>
                        <Icons.Consult className={styles.navIcon} />
                        {t.nav.consult}
                    </Link>
                    <Link to="/calculators" onClick={() => setIsOpen(false)}>
                        <Icons.Inheritance className={styles.navIcon} />
                        {t.nav.inheritance}
                    </Link>
                    <Link to="/lawyers" onClick={() => setIsOpen(false)}>
                        <Icons.Lawyers className={styles.navIcon} />
                        {t.nav.lawyers}
                    </Link>
                    <Link to="/library" onClick={() => setIsOpen(false)}>
                        <Icons.Library className={styles.navIcon} />
                        {t.nav.library}
                    </Link>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.langToggle}
                        onClick={toggleLanguage}
                        title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
                    >
                        {language === 'ar' ? 'En' : 'عربي'}
                    </button>
                    
                    <button
                        className={styles.themeToggle}
                        onClick={() => document.documentElement.classList.toggle('dark')}
                        title="تبديل الوضع الليلي"
                    >
                        <Icons.Moon className={styles.themeIcon} />
                    </button>
                    
                    <Link to="/consult" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                        {t.nav.startNow}
                    </Link>
                    
                    <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </nav>
    )
}
