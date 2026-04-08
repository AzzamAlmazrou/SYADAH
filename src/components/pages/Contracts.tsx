'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Contracts.module.css'

type ContractData = {
    type: string;
    firstParty: string;
    firstPartyId: string;
    secondParty: string;
    secondPartyId: string;
    value: string;
    duration: string;
    customTerms: string;
    loc: string;
    ministry: string;
    date: string;
    companyLogo: string | null;
    ministryLogo: string | null;
}

import { useLanguage } from '../../context/LanguageContext'

const MINISTRIES_LIST_AR = [
    'وزارة العدل',
    'وزارة التجارة',
    'وزارة الموارد البشرية',
    'وزارة الاستثمار',
    'جهة حكومية أخرى'
];

const MINISTRIES_LIST_EN = [
    'Ministry of Justice',
    'Ministry of Commerce',
    'Ministry of Human Resources',
    'Ministry of Investment',
    'Other Government Agency'
];

export default function ContractsPage() {
    const { t, language } = useLanguage()
    const [step, setStep] = useState<'form' | 'preview'>('form')
    const [data, setData] = useState<ContractData>({
        type: t.contracts.types[0],
        firstParty: '',
        firstPartyId: '',
        secondParty: '',
        secondPartyId: '',
        value: '',
        duration: '',
        customTerms: '',
        loc: language === 'ar' ? 'الرياض' : 'Riyadh',
        ministry: language === 'ar' ? 'وزارة العدل' : 'Ministry of Justice',
        date: new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US'),
        companyLogo: null,
        ministryLogo: null
    })

    const ministriesList = language === 'ar' ? MINISTRIES_LIST_AR : MINISTRIES_LIST_EN

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ContractData) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleGenerate = () => {
        if (!data.firstParty || !data.secondParty) return alert(language === 'ar' ? 'يرجى ملء بيانات الأطراف الأساسية' : 'Please fill in the main parties data')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setStep('preview')
    }

    return (
        <div className="page-section" style={{ background: 'var(--bg-paper)' }}>
            <div className="container">
                <div className="no-print" style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="badge" style={{ background: 'var(--brand-ink)', color: 'var(--bg-white)' }}>{t.contracts.badge}</div>
                    <h1 className="section-title serif-title" style={{ fontSize: '4rem' }}>{t.contracts.title}</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.contracts.subtitle}</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'form' ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`card ${styles.formCard}`}
                        >
                            <div className={styles.formHeader}>
                                <h2>{t.contracts.formHeader}</h2>
                                <p>{t.contracts.formSub}</p>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.typeLabel}</label>
                                    <select
                                        className={styles.input}
                                        value={data.type}
                                        onChange={e => setData({ ...data, type: e.target.value })}
                                    >
                                        {t.contracts.types.map((type: string) => (
                                            <option key={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.ministryLabel}</label>
                                    <select
                                        className={styles.input}
                                        value={data.ministry}
                                        onChange={e => setData({ ...data, ministry: e.target.value })}
                                    >
                                        {ministriesList.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </div>

                                <div className={styles.divider}>{t.contracts.customization}</div>

                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.logoCompany}</label>
                                    <input type="file" accept="image/*" className={styles.input} style={{ padding: '8px' }} onChange={e => handleImageUpload(e, 'companyLogo')} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.logoMinistry}</label>
                                    <input type="file" accept="image/*" className={styles.input} style={{ padding: '8px' }} onChange={e => handleImageUpload(e, 'ministryLogo')} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.cityLabel}</label>
                                    <input className={styles.input} value={data.loc} onChange={e => setData({ ...data, loc: e.target.value })} />
                                </div>

                                <div className={styles.divider}>{t.contracts.parties}</div>

                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.firstParty}</label>
                                    <input className={styles.input} placeholder={language === 'ar' ? "مثال: شركة سِيادَة القابضة" : "Example: Siyadah Holding Co."} value={data.firstParty} onChange={e => setData({ ...data, firstParty: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.idLabel}</label>
                                    <input className={styles.input} placeholder={language === 'ar' ? "رقم رسمي معتمد" : "Official registration number"} value={data.firstPartyId} onChange={e => setData({ ...data, firstPartyId: e.target.value })} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.secondParty}</label>
                                    <input className={styles.input} placeholder={language === 'ar' ? "مثال: مؤسسة المستقبل للمقاولات" : "Example: Future Contracting Est."} value={data.secondParty} onChange={e => setData({ ...data, secondParty: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.idLabel}</label>
                                    <input className={styles.input} placeholder={language === 'ar' ? "رقم رسمي معتمد" : "Official registration number"} value={data.secondPartyId} onChange={e => setData({ ...data, secondPartyId: e.target.value })} />
                                </div>

                                <div className={styles.divider}>{t.contracts.financials}</div>

                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.valueLabel}</label>
                                    <input className={styles.input} type="number" placeholder={language === 'ar' ? "مثال: ٥٠٠,٠٠٠" : "Example: 500,000"} value={data.value} onChange={e => setData({ ...data, value: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>{t.contracts.durationLabel}</label>
                                    <input className={styles.input} placeholder={language === 'ar' ? "مثال: ١٢ شهراً ميلادياً" : "Example: 12 calendar months"} value={data.duration} onChange={e => setData({ ...data, duration: e.target.value })} />
                                </div>

                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                    <label>{t.contracts.customTerms}</label>
                                    <textarea
                                        className={styles.textarea}
                                        rows={6}
                                        placeholder={language === 'ar' ? "اكتب هنا كافة تفاصيل العمل، آلية الدفع، الغرامات، أو أي اشتراطات تود تضمينها في متن العقد..." : "Write here all work details, payment mechanism, fines, or any conditions you wish to include in the contract..."}
                                        value={data.customTerms}
                                        onChange={e => setData({ ...data, customTerms: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.formFooterAction}>
                                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem', padding: '20px' }} onClick={handleGenerate}>
                                    {t.contracts.generateBtn}
                                </button>
                                <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.contracts.agreementNote}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.previewView}
                        >
                            <div className={styles.toolbar}>
                                <button className="btn-secondary" onClick={() => setStep('form')}>{t.contracts.back}</button>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn-secondary" onClick={() => window.print()}>{t.contracts.print}</button>
                                    <button className="btn-primary" onClick={() => window.print()}>{t.contracts.download}</button>
                                </div>
                            </div>

                            <div className={styles.premiumDocument}>
                                <div className={styles.docWatermark}>{t.home.heroBrand}</div>
                                <div className={styles.docBorder}>
                                    <div className={styles.docInner}>
                                        <div className={styles.premiumHeader} style={{ marginBottom: '15px', paddingBottom: '10px' }}>
                                            <div style={{ flex: 1, textAlign: language === 'ar' ? 'right' : 'left', fontSize: '0.8rem', color: '#111', lineHeight: 1.6, fontWeight: 'bold' }}>
                                                {language === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}<br />
                                                <strong>{data.ministry}</strong><br />
                                                {language === 'ar' ? 'وثيقة تعاقدية' : 'Contractual Document'}
                                            </div>

                                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px' }}>
                                                {data.companyLogo && (
                                                    <img
                                                        src={data.companyLogo}
                                                        alt="Company Logo"
                                                        referrerPolicy="no-referrer"
                                                        style={{ height: '70px', maxWidth: '120px', objectFit: 'contain' }}
                                                    />
                                                )}
                                                <img
                                                    src={data.ministryLogo || "https://upload.wikimedia.org/wikipedia/commons/0/0d/Emblem_of_Saudi_Arabia.svg"}
                                                    alt="Saudi Emblem"
                                                    referrerPolicy="no-referrer"
                                                    style={{ height: '70px', maxWidth: '120px', objectFit: 'contain' }}
                                                />
                                            </div>

                                            <div style={{ flex: 1, textAlign: language === 'ar' ? 'left' : 'right', fontSize: '0.75rem', color: '#333', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span>{language === 'ar' ? 'الرقم:' : 'No:'} SIG-{Math.floor(Math.random() * 900000 + 100000)}</span>
                                                <span>{language === 'ar' ? 'التاريخ:' : 'Date:'} {data.date}</span>
                                                <span>{language === 'ar' ? 'المرفقات: لا يوجد' : 'Attachments: None'}</span>
                                            </div>
                                        </div>

                                        <div className={styles.docTitleBlock} style={{ textAlign: 'center', marginBottom: '30px', marginTop: '10px' }}>
                                            <h2 className="serif-title" style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px', color: 'var(--brand-ink)' }}>{data.type}</h2>
                                        </div>

                                        <div className={styles.docBodyContent}>
                                            <p style={{ fontWeight: 800, marginBottom: '15px' }}>
                                                {language === 'ar' ? `إنه في يوم هذا التاريخ الموفق ${data.date} تم الاتفاق بين كلاً من:` : `On this date ${data.date}, it was agreed between:`}
                                            </p>

                                            <ol style={{ paddingRight: language === 'ar' ? '20px' : '0', paddingLeft: language === 'en' ? '20px' : '0', marginBottom: '20px', lineHeight: 2, listStyleType: 'decimal' }}>
                                                <li>
                                                    <strong>{language === 'ar' ? 'السادة/' : 'Messrs/'} {data.firstParty}</strong>, {language === 'ar' ? 'السجل/الهوية' : 'ID/Reg'} ({data.firstPartyId}), {language === 'ar' ? 'المقر الرئيسي في مدينة' : 'Headquarters in'} ({data.loc}), {language === 'ar' ? 'ويشار إليه فيما بعد بـ' : 'hereinafter referred to as'} <strong>{language === 'ar' ? 'الطرف الأول' : 'First Party'}</strong>.
                                                </li>
                                                <li>
                                                    <strong>{language === 'ar' ? 'السادة/' : 'Messrs/'} {data.secondParty}</strong>, {language === 'ar' ? 'السجل/الهوية' : 'ID/Reg'} ({data.secondPartyId}), {language === 'ar' ? 'المقر الرئيسي في مدينة' : 'Headquarters in'} ({data.loc}), {language === 'ar' ? 'ويشار إليه فيما بعد بـ' : 'hereinafter referred to as'} <strong>{language === 'ar' ? 'الطرف الثاني' : 'Second Party'}</strong>.
                                                </li>
                                            </ol>

                                            <p style={{ fontWeight: 800, marginBottom: '30px' }}>
                                                {language === 'ar' 
                                                    ? 'وبعد أن أقر طرفي الاتفاقية بأهليتهما القانونية المعتبرة شرعاً ونظاماً والتي تبيح لهم إجراء مثل هذه التصرفات الواردة بالاتفاقية، فقد اتفقا على الآتي:'
                                                    : 'After both parties acknowledged their legal capacity to enter into this agreement, they agreed on the following:'}
                                            </p>

                                            <div className={styles.legalSection}>
                                                <h4>{language === 'ar' ? '١. التمهيد:' : '1. Preamble:'}</h4>
                                                <p style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0' }}>
                                                    {language === 'ar' 
                                                        ? `حيث أن الطرف الأول يعمل كجهة متخصصة، وحيث رغب الطرف الثاني في الاستفادة من تلك الخبرات في تنفيذ (${data.type})، فقد التقت إرادة الطرفين على إبرام هذا العقد المكون من مواد وبنود ملزمة للطرفين وخلفائهم، ويعتبر هذا التمهيد جزءاً لا يتجزأ من الاتفاقية ومكملاً ومفسراً لها عند اللزوم.`
                                                        : `Whereas the First Party is a specialized entity, and whereas the Second Party wishes to benefit from such expertise in executing (${data.type}), the parties have agreed to enter into this contract consisting of binding articles and clauses.`}
                                                </p>
                                            </div>

                                            <div className={styles.legalSection}>
                                                <h4>{language === 'ar' ? '٢. نطاق الالتزامات:' : '2. Scope of Obligations:'}</h4>
                                                <p style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0' }}>
                                                    {language === 'ar'
                                                        ? 'يلتزم الطرف الأول بتسخير كافة طاقاته وخبراته لتنفيذ المهام الموكلة إليه، مع الالتزام التام بكافة الأنظمة واللوائح والقرارات المعمول بها في المملكة. كما يلتزم بتقديم تقارير دورية للطرف الثاني حول سير العمل، وضمان جودة التنفيذ وفق المعايير المهنية (Best Practices).'
                                                        : 'The First Party shall dedicate all its energy and expertise to execute the assigned tasks, with full commitment to all regulations and laws in the Kingdom.'}
                                                </p>
                                            </div>

                                            {data.value && (
                                                <div className={styles.legalSection}>
                                                    <h4>{language === 'ar' ? '٣. القيمة والضوابط المالية:' : '3. Value and Financial Controls:'}</h4>
                                                    <p style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0' }}>
                                                        {language === 'ar'
                                                            ? `اتفق الطرفان على أن القيمة الإجمالية النهائية لهذا التعاقد هي (${Number(data.value).toLocaleString()}) ريال سعودي. هذه القيمة تشمل كافة التكاليف التشغيلية، الضرائب، ورسوم القيمة المضافة ما لم يتم النص على خلاف ذلك.`
                                                            : `The parties agreed that the total final value of this contract is (${Number(data.value).toLocaleString()}) SAR. This value includes all operational costs and taxes.`}
                                                    </p>
                                                </div>
                                            )}

                                            <div className={styles.legalSection}>
                                                <h4>{language === 'ar' ? '٤. السرية والملكية الفكرية:' : '4. Confidentiality & IP:'}</h4>
                                                <p style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0' }}>
                                                    {language === 'ar'
                                                        ? 'يتعهد كل طرف بالمحافظة على سرية كافة المعلومات والبيانات والمستندات التي يتم الاطلاع عليها. وتظل كافة حقوق الملكية الفكرية الناتجة عن تنفيذ هذا التعاقد ملكاً خالصاً للطرف الذي قام بابتكارها، ويحظر استخدامها في غير غرض التعاقد.'
                                                        : 'Each party undertakes to maintain the confidentiality of all information and documents accessed. All IP rights remain the property of the party that created them.'}
                                                </p>
                                            </div>

                                            <div className={styles.legalSection}>
                                                <h4>{language === 'ar' ? '٥. القوة القاهرة والظروف الطارئة:' : '5. Force Majeure:'}</h4>
                                                <p style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0' }}>
                                                    {language === 'ar'
                                                        ? 'لا يتحمل أي من الطرفين مسؤولية التأخير الناتج عن ظروف القوة القاهرة. وفي حال استمرارها لأكثر من (٣٠) يوماً، يحق للطرفين الاجتماع لبحث تعديل البنود أو إنهاء التعاقد بما يحفظ الحقوق.'
                                                        : 'Neither party shall be liable for delays resulting from force majeure circumstances.'}
                                                </p>
                                            </div>

                                            {data.customTerms && (
                                                <div className={styles.legalSection}>
                                                    <h4>{language === 'ar' ? '٦. الاشتراطات الخاصة الإضافية:' : '6. Additional Special Conditions:'}</h4>
                                                    <div style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0', whiteSpace: 'pre-line' }}>
                                                        {data.customTerms}
                                                    </div>
                                                </div>
                                            )}

                                            <div className={styles.legalSection}>
                                                <h4>{language === 'ar' ? '٧. فض النزاعات:' : '7. Dispute Resolution:'}</h4>
                                                <p style={{ paddingRight: language === 'ar' ? '15px' : '0', paddingLeft: language === 'en' ? '15px' : '0' }}>
                                                    {language === 'ar'
                                                        ? `أي نزاع ينشأ من جراء تنفيذ أو تفسير هذا العقد، يتم السعي لحله ودياً. وفي حال تعذر ذلك، يكون الاختصاص القضائي منعقداً للمحاكم المختصة بمدينة (${data.loc})، المملكة العربية السعودية.`
                                                        : `Any dispute arising from the execution or interpretation of this contract shall be resolved amicably. Otherwise, jurisdiction shall be with the courts of (${data.loc}).`}
                                                </p>
                                            </div>

                                            <div className={styles.premiumSignatures} style={{ marginTop: '60px' }}>
                                                <div className={styles.signatureCol} style={{ border: 'none', textAlign: language === 'ar' ? 'right' : 'left', paddingRight: language === 'ar' ? '20px' : '0', paddingLeft: language === 'en' ? '20px' : '0' }}>
                                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '16px', color: '#000' }}>{language === 'ar' ? 'الطرف الأول' : 'First Party'}</h5>
                                                    <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {data.firstParty}</p>
                                                    <p><strong>{language === 'ar' ? 'الصفة:' : 'Title:'}</strong> {language === 'ar' ? 'مفوض بالتوقيع' : 'Authorized Signatory'}</p>
                                                    <p style={{ marginTop: '20px', display: 'flex' }}><strong>{language === 'ar' ? 'التوقيع:' : 'Signature:'}</strong> <span style={{ borderBottom: '1px dashed #000', flex: 1, margin: '0 10px' }}></span></p>
                                                    <p style={{ marginTop: '20px' }}><strong>{language === 'ar' ? 'الختم:' : 'Stamp:'}</strong></p>
                                                </div>
                                                <div className={styles.signatureCol} style={{ border: 'none', textAlign: language === 'ar' ? 'right' : 'left', paddingRight: language === 'ar' ? '20px' : '0', paddingLeft: language === 'en' ? '20px' : '0' }}>
                                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '16px', color: '#000' }}>{language === 'ar' ? 'الطرف الثاني' : 'Second Party'}</h5>
                                                    <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {data.secondParty}</p>
                                                    <p><strong>{language === 'ar' ? 'الصفة:' : 'Title:'}</strong> {language === 'ar' ? 'مفوض بالتوقيع' : 'Authorized Signatory'}</p>
                                                    <p style={{ marginTop: '20px', display: 'flex' }}><strong>{language === 'ar' ? 'التوقيع:' : 'Signature:'}</strong> <span style={{ borderBottom: '1px dashed #000', flex: 1, margin: '0 10px' }}></span></p>
                                                    <p style={{ marginTop: '20px' }}><strong>{language === 'ar' ? 'الختم:' : 'Stamp:'}</strong></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.premiumFooter}>
                                            <div>{language === 'ar' ? 'مرجع نظامي: الأنظمة العدلية السعودية الحديثة' : 'Legal Reference: Modern Saudi Judicial Systems'}</div>
                                            <div className={styles.qrPlaceholder}>
                                                <span>{language === 'ar' ? 'مسح للمصادقة' : 'Scan to Authenticate'}</span>
                                            </div>
                                            <div>{language === 'ar' ? 'الصفحة ١ من ١' : 'Page 1 of 1'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
