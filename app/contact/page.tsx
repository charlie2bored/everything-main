'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { m } from 'framer-motion'
import { fadeUp, stagger } from '@/app/providers/MotionProvider'

interface FormData {
  name: string
  email: string
  budget: string
  timeline: string
  message: string
  service?: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    budget: '',
    timeline: '',
    message: '',
    service: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Get service from URL params if present
  useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const service = urlParams.get('service')
      if (service) {
        setFormData(prev => ({ ...prev, service }))
      }
    }
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // In a real implementation, you would submit to your form handler
      // For static export, you might use Formspree, Netlify Forms, or similar
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          budget: '',
          timeline: '',
          message: '',
          service: formData.service // Keep service if it was pre-selected
        })
        
        // Announce success to screen readers
        const announcement = document.createElement('div')
        announcement.setAttribute('aria-live', 'polite')
        announcement.setAttribute('aria-atomic', 'true')
        announcement.className = 'sr-only'
        announcement.textContent = 'Message sent successfully! I\'ll get back to you within 24 hours.'
        document.body.appendChild(announcement)
        
        setTimeout(() => {
          document.body.removeChild(announcement)
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      <Header />
      
      <main id="main" className="contact-page">
        {/* Header Section */}
        <header className="contact-page__header">
          <div className="contact-page__header-container">
            <m.div
              className="contact-page__intro"
              initial="hidden"
              animate="show"
              variants={stagger(0.06)}
            >
              <m.h1 
                className="contact-page__title"
                variants={fadeUp}
              >
                Let's work together
              </m.h1>
              <m.p 
                className="contact-page__subtitle"
                variants={fadeUp}
              >
                Tell me about your project and I'll get back to you within 24 hours
              </m.p>
            </m.div>
          </div>
        </header>

        {/* Contact Form */}
        <section className="contact-page__form" aria-labelledby="form-heading">
          <div className="contact-page__container">
            <div className="contact-form">
              <h2 id="form-heading" className="sr-only">Contact form</h2>
              
              {submitStatus === 'success' && (
                <div className="contact-form__success" role="alert">
                  <h3 className="contact-form__success-title">Message sent!</h3>
                  <p className="contact-form__success-text">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="contact-form__error" role="alert">
                  <h3 className="contact-form__error-title">Something went wrong</h3>
                  <p className="contact-form__error-text">
                    Please try again or send me an email directly at hello@charlie.design
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form__form" noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name <span className="form-required" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    required
                  />
                  {errors.name && (
                    <div id="name-error" className="form-error" role="alert">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="form-required" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    required
                  />
                  {errors.email && (
                    <div id="email-error" className="form-error" role="alert">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget" className="form-label">
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline" className="form-label">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-months-plus">6+ months</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Project details <span className="form-required" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`form-textarea ${errors.message ? 'form-textarea--error' : ''}`}
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                    required
                  />
                  {errors.message && (
                    <div id="message-error" className="form-error" role="alert">
                      {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--primary contact-form__submit"
                  aria-describedby="submit-status"
                >
                  <span className="btn__text">
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </span>
                </button>

                <div id="submit-status" className="sr-only" aria-live="polite">
                  {isSubmitting && 'Sending your message...'}
                  {submitStatus === 'success' && 'Message sent successfully!'}
                  {submitStatus === 'error' && 'Error sending message. Please try again.'}
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <aside className="contact-info">
              <h3 className="contact-info__title">Other ways to connect</h3>
              
              <div className="contact-info__methods">
                <div className="contact-method">
                  <h4 className="contact-method__title">Email</h4>
                  <a 
                    href="mailto:hello@charlie.design" 
                    className="contact-method__link"
                  >
                    hello@charlie.design
                  </a>
                </div>

                <div className="contact-method">
                  <h4 className="contact-method__title">Schedule a call</h4>
                  <a 
                    href="https://calendly.com/charlie-design" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method__link"
                  >
                    Book 30-minute intro call
                  </a>
                </div>

                <div className="contact-method">
                  <h4 className="contact-method__title">Response time</h4>
                  <p className="contact-method__text">
                    I typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// Note: For static export, you'll need to handle form submission differently
// Consider using services like Formspree, Netlify Forms, or Cloudflare Workers
