import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { WhopElements, Payments, PaymentElement, EmailElement, BrandingElement } from '@whop/elements-react'
import { loadWhop } from '@whop/elements'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

type CheckoutType = 'inspection' | 'deposit' | 'service' | null;

function HomeComponent() {
  const [activeCheckout, setActiveCheckout] = useState<CheckoutType>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const INSPECTION_PLAN_ID = 'plan_1Rsxwut59cyv5'
  const DEPOSIT_PLAN_ID = 'plan_FE180MI3ugHZT'
  const SERVICE_PLAN_ID = 'plan_0OSqrrTgd0ZlU'

  const handleEstimateSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    if (typeof window !== 'undefined' && (window as any).whop) {
      (window as any).whop.track('estimate_requested', { service: data.service })
    }

    try {
      const res = await fetch('/api/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        alert('Success! Your estimate request has been sent to Whop.')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('Something went wrong. Please check API key/permissions.')
      }
    } catch (error) {
      alert('Error connecting to server.')
    }
  }

  const openCheckout = (type: CheckoutType) => {
    setActiveCheckout(type)
    if (type === 'deposit' && typeof window !== 'undefined' && (window as any).whop) {
      (window as any).whop.track('deposit_started', { value: 500, currency: 'USD' })
    }
  }

  const trackServiceView = (serviceName: string) => {
    if (typeof window !== 'undefined' && (window as any).whop) {
      (window as any).whop.track('service_viewed', { service: serviceName })
    }
  }

  const getCurrentPlanId = () => {
    if (activeCheckout === 'inspection') return INSPECTION_PLAN_ID
    if (activeCheckout === 'deposit') return DEPOSIT_PLAN_ID
    if (activeCheckout === 'service') return SERVICE_PLAN_ID
    return ''
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#2D3748]">
      <header className="bg-white/90 backdrop-blur-md py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0F5132] rounded-md flex items-center justify-center text-white font-bold text-xl">A</div>
          <span className="text-2xl font-serif font-bold text-[#0F5132] tracking-tight">Apex Roofing</span>
        </div>
        <nav className="space-x-8 hidden md:flex text-sm font-semibold uppercase tracking-wider text-gray-600">
          <a href="#services" className="hover:text-[#0F5132] transition">Services</a>
          <a href="#pricing" className="hover:text-[#0F5132] transition">Pricing</a>
          <a href="#contact" className="hover:text-[#0F5132] transition">Contact</a>
        </nav>
        <a href="tel:5551234567" className="bg-[#0F5132] hover:bg-[#0a3a24] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition">(555) 123-4567</a>
      </header>

      <section className="max-w-7xl mx-auto px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-8">
          <div className="inline-block bg-[#E6F4EA] text-[#0F5132] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">Top Rated in Texas</div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#1A202C] leading-tight">Elevate Your Home's <span className="text-[#D97706]">Protection.</span></h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">Experience roofing without the headache. We combine premium materials with master craftsmanship to give you a roof that lasts a lifetime.</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => openCheckout('inspection')} className="bg-[#D97706] hover:bg-[#b45309] text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2">
              Book Inspection <span className="bg-white/20 px-2 py-0.5 rounded text-sm">$149</span>
            </button>
            <a href="#contact" className="bg-white border-2 border-gray-200 hover:border-[#0F5132] text-[#0F5132] px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center">Get Free Estimate</a>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-[#0F5132] rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Luxury Home Roof" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
        </div>
      </section>

      <div className="bg-[#0F5132] py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between items-center gap-8 text-white">
          <div className="flex items-center gap-3"><span className="text-4xl font-serif font-bold text-[#D97706]">⭐ 4.9/5</span><span className="text-sm font-medium opacity-80 uppercase tracking-wider">Average<br/>Rating</span></div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-3"><span className="text-4xl font-serif font-bold text-[#D97706]">20+</span><span className="text-sm font-medium opacity-80 uppercase tracking-wider">Years of<br/>Experience</span></div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-3"><span className="text-4xl font-serif font-bold text-[#D97706]">5k+</span><span className="text-sm font-medium opacity-80 uppercase tracking-wider">Roofs<br/>Installed</span></div>
        </div>
      </div>

      <section id="services" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-[#1A202C]">Expert Craftsmanship</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">From minor repairs to complete overhauls, our certified team handles every project with precision and care.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Roof Repair', desc: 'Fast and reliable fixes for leaks, missing shingles, and storm damage.' },
            { name: 'Full Replacement', desc: 'Complete tear-offs and new installations using premium architectural shingles.' },
            { name: 'Roof Inspection', desc: 'Detailed 21-point inspection to assess the health of your roof.' }
          ].map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 flex items-center justify-center rounded-xl group-hover:bg-[#E6F4EA] transition">✓</div>
              <h3 className="text-2xl font-serif font-bold text-[#1A202C] mb-3">{service.name}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{service.desc}</p>
              <button onClick={() => trackServiceView(service.name)} className="text-[#0F5132] font-bold flex items-center gap-2 hover:gap-4 transition-all">Learn More <span>→</span></button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#E6F4EA] py-12 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-[#0F5132]">Don't want to pay upfront?</h3>
            <p className="text-[#0F5132]/70 mt-2">We offer flexible financing options through Klarna, Afterpay, and Splitit. Get your roof now, pay over time.</p>
          </div>
          <a href="#pricing" className="bg-[#0F5132] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0a3a24] transition whitespace-nowrap">
            View Financing Options
          </a>
        </div>
      </section>

      <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-[#1A202C]">Transparent Pricing</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Choose the plan that fits your needs. No hidden fees, ever.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 p-8 rounded-2xl text-center hover:border-[#D97706] transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Roof Inspection</h3>
            <div className="text-4xl font-bold text-[#D97706] mb-6">$149<span className="text-lg text-gray-400 font-normal">/one-time</span></div>
            <ul className="space-y-4 mb-8 text-left text-gray-600">
              <li>✓ 21-Point Inspection</li>
              <li>✓ Drone Roof Photos</li>
              <li>✓ Detailed Report</li>
            </ul>
            <button onClick={() => openCheckout('inspection')} className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-3 rounded-lg transition">Book Now</button>
          </div>

          <div className="border-2 border-[#0F5132] p-8 rounded-2xl text-center relative shadow-xl transform scale-105">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0F5132] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Most Popular</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Project Deposit</h3>
            <div className="text-4xl font-bold text-[#0F5132] mb-6">$500<span className="text-lg text-gray-400 font-normal">/one-time</span></div>
            <ul className="space-y-4 mb-8 text-left text-gray-600">
              <li>✓ Secures your spot</li>
              <li>✓ Covers initial materials</li>
              <li>✓ Final invoice billed after job</li>
            </ul>
            <button onClick={() => openCheckout('deposit')} className="w-full bg-[#0F5132] hover:bg-[#0a3a24] text-white font-bold py-3 rounded-lg transition">Pay Deposit</button>
          </div>

          <div className="border border-gray-200 p-8 rounded-2xl text-center hover:border-[#D97706] transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Full Roof Replacement</h3>
            <div className="text-4xl font-bold text-[#D97706] mb-6">$1000<span className="text-lg text-gray-400 font-normal">/flat-rate</span></div>
            <ul className="space-y-4 mb-8 text-left text-gray-600">
              <li>✓ Complete Tear-off</li>
              <li>✓ Premium Materials</li>
              <li>✓ 10-Year Warranty</li>
            </ul>
            <button onClick={() => openCheckout('service')} className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-3 rounded-lg transition">Book Service</button>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-8 bg-[#1A202C]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">Ready to upgrade your roof?</h2>
            <p className="text-gray-400 text-lg">Get a comprehensive, no-obligation estimate from our experts within 24 hours.</p>
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4 text-gray-300"><div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">📍</div><span>1234 Main St, Georgetown, TX</span></div>
              <div className="flex items-center gap-4 text-gray-300"><div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">📞</div><span>(555) 123-4567</span></div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Request an Estimate</h3>
              <form onSubmit={handleEstimateSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none" required />
                  <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none" required />
                </div>
                <input type="email" name="email" placeholder="Email Address" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none" required />
                <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none" required />
                <select name="service" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none text-gray-600" required>
                  <option value="">Select Service Needed</option>
                  <option value="repair">Roof Repair</option>
                  <option value="replacement">Roof Replacement</option>
                  <option value="inspection">Roof Inspection</option>
                </select>
                <textarea name="message" placeholder="Tell us about your project..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F5132] outline-none h-28"></textarea>
                <button type="submit" className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-4 rounded-lg transition text-lg">Send Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F5132] py-8 text-center text-white/60 text-sm">
        <p>&copy; 2026 Apex Roofing. All rights reserved.</p>
      </footer>

      {isMounted && activeCheckout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
            <button onClick={() => setActiveCheckout(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-bold transition z-10">✕</button>
            <div className="p-8">
              <h3 className="text-2xl font-serif font-bold text-center text-[#1A202C] mb-6">Secure Checkout</h3>
              
              <WhopElements elements={loadWhop()}>
                <Payments accountId="biz_t5XxR2r1ecIWcV" plan={getCurrentPlanId()}>
                  <EmailElement />
                  <PaymentElement />
                  <BrandingElement />
                </Payments>
              </WhopElements>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}