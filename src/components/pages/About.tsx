import { useLanguage } from '../../context/LanguageContext'

export default function AboutPage() {
    const { t } = useLanguage()

    return (
        <div className="page-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
                    <div className="badge">{t.about.badge}</div>
                    <h1 className="section-title serif-title">{t.about.title}</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        {t.about.subtitle}
                    </p>
                </div>

                <div className="card" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '2' }}>
                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', marginBottom: '24px' }}>{t.about.who}</h2>
                    <p style={{ marginBottom: '24px' }}>
                        {t.about.whoDesc}
                    </p>
                    
                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>{t.about.vision}</h2>
                    <p style={{ marginBottom: '24px' }}>
                        {t.about.visionDesc}
                    </p>

                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>{t.about.location}</h2>
                    <p style={{ marginBottom: '24px' }}>
                        {t.about.locationDesc}
                        <br /><br />
                        {t.about.locationDesc2}
                    </p>

                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>{t.about.what}</h2>
                    <ul style={{ listStylePosition: 'inside', paddingRight: '20px', marginBottom: '24px' }}>
                        {t.about.whatItems.map((item: any, i: number) => (
                            <li key={i} style={{ marginBottom: '12px' }}><strong>{item.title}</strong> {item.desc}</li>
                        ))}
                    </ul>

                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>{t.about.security}</h2>
                    <p>
                        {t.about.securityDesc}
                    </p>
                </div>
            </div>
        </div>
    )
}
