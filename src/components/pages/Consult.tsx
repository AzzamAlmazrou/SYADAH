'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Consult.module.css'
import { FadeInUp } from '../MotionWrapper'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

type Msg = { role: 'user' | 'ai'; text: string; time: string }

import { useLanguage } from '../../context/LanguageContext'

// Initialize AI outside to avoid re-initialization on every render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "أنت 'المستشار صقر'، مساعد قانوني ذكي متخصص في الأنظمة واللوائح المعمول بها في المملكة العربية السعودية. مهمتك هي تقديم إرشادات قانونية أولية وتوضيح النصوص القانونية بأسلوب مهني وواضح. تذكر دائماً أنك لست بديلاً عن المحامي المعتمد، ويجب عليك حث المستخدم على استشارة محامٍ في القضايا الجوهرية. أجب باللغة العربية (الفصحى أو العامية السعودية حسب سياق المستخدم). ركز حصرياً على القوانين السعودية.",
    safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ]
});

export default function ConsultPage() {
    const { t, language } = useLanguage()
    
    function now() {
        return new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }

    const [msgs, setMsgs] = useState<Msg[]>([
        { role: 'ai', text: t.consult.welcome, time: now() },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

    const clearChat = () => {
        setMsgs([{ role: 'ai', text: t.consult.welcome, time: now() }])
    }

    const send = async (text?: string) => {
        const q = (text ?? input).trim()
        if (!q || loading) return
        
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            setMsgs(m => [...m, { role: 'ai', text: language === 'ar' ? "عذراً، مفتاح التشغيل غير متوفر حالياً." : "Sorry, API Key is missing.", time: now() }]);
            return;
        }

        setInput('')
        const newUserMsg: Msg = { role: 'user', text: q, time: now() }
        setMsgs(prev => [...prev, newUserMsg])
        setLoading(true)

        try {
            // Simple content generation with history
            const history = msgs
                .filter((_, i) => i > 0) // Skip welcome
                .map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

            const result = await model.generateContent({
                contents: [...history, { role: 'user', parts: [{ text: q }] }],
            });

            const response = await result.response;
            const aiText = response.text();

            if (aiText) {
                setMsgs(m => [...m, { role: 'ai', text: aiText, time: now() }]);
            } else {
                throw new Error("No text returned");
            }
        } catch (err: any) {
            console.error("Chat Error:", err);
            let errorMsg = t.consult.error;
            if (err?.message?.includes("SAFETY")) {
                errorMsg = language === 'ar' ? "عذراً، تم حجب الرد بواسطة فلاتر السلامة. حاول صياغة السؤال بشكل مختلف." : "Response blocked by safety filters.";
            }
            setMsgs(m => [...m, { role: 'ai', text: errorMsg, time: now() }]);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-section" style={{ paddingBottom: 40 }}>
            <div className="container">
                <FadeInUp>
                    <div className="page-header" style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
                        <div className="badge badge-gold" style={{ marginBottom: 16 }}>{t.consult.badge}</div>
                        <h1 className="section-title">{t.consult.title}</h1>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            {t.consult.subtitle}
                        </p>
                        <button 
                            onClick={clearChat}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: language === 'ar' ? 0 : 'auto',
                                right: language === 'en' ? 0 : 'auto',
                                background: 'none',
                                border: '1px solid var(--border)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            {language === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                        </button>
                    </div>
                </FadeInUp>

                <motion.div
                    className={styles.chatWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Disclaimer */}
                    <div className={styles.disclaimer}>
                        {t.consult.disclaimer.split(t.consult.lawyersLink)[0]}
                        <a href="/lawyers" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{t.consult.lawyersLink}</a>
                        {t.consult.disclaimer.split(t.consult.lawyersLink)[1]}
                    </div>

                    {/* Messages */}
                    <div className={styles.messages}>
                        <AnimatePresence mode="popLayout">
                            {msgs.map((m, i) => (
                                <motion.div
                                    key={i}
                                    className={`${styles.msgRow} ${m.role === 'user' ? styles.userRow : ''}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    layout
                                >
                                    {m.role === 'ai' && <div className={styles.avatar}>⚖️</div>}
                                    <div className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                                        <p className={styles.bubbleText}>{m.text}</p>
                                        <span className={styles.bubbleTime}>{m.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {loading && (
                            <motion.div
                                className={styles.msgRow}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className={styles.avatar}>⚖️</div>
                                <div className={styles.aiBubble} style={{ padding: '16px 20px' }}>
                                    <div className={styles.typing}>
                                        <span /><span /><span />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Suggestions */}
                    {msgs.length < 3 && (
                        <motion.div
                            className={styles.suggestions}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            {t.consult.suggestions.map((s: string) => (
                                <button key={s} className={styles.sugBtn} onClick={() => send(s)}>{s}</button>
                            ))}
                        </motion.div>
                    )}

                    {/* Input */}
                    <div className={styles.inputRow}>
                        <input
                            className={styles.chatInput}
                            placeholder={t.consult.placeholder}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { send() } }}
                        />
                        <button className={styles.sendBtn} onClick={() => send()} disabled={!input.trim() || loading}>
                            {loading ? '⏳' : '←'}
                        </button>
                    </div>
                    <p style={{ 
                        fontSize: '0.75rem', 
                        textAlign: 'center', 
                        marginTop: '12px', 
                        color: 'var(--text-muted)',
                        opacity: 0.8
                    }}>
                        {t.consult.note}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
