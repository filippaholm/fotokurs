import { useEffect, useState } from 'react'
import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { Icon } from '../components/Icons'
import heroImage from '../assets/figma/hero-sunset-camera.png'
import stockholmImage from '../assets/figma/workshop-stockholm.png'
import apertureImage from '../assets/figma/lesson-aperture.png'
import compositionImage from '../assets/figma/lesson-composition.png'
import shutterImage from '../assets/figma/lesson-shutter.png'
import isoImage from '../assets/figma/lesson-iso.png'
import focusImage from '../assets/figma/lesson-focus.png'
import dateArrow from '../assets/figma/date-arrow.svg'

export const Route = createFileRoute('/')({
  component: Home,
})

const dates = [
  'Lördag 14 november',
  'Lördag 21 november',
  'Lördag 28 november',
  'Lördag 5 december',
  'Lördag 12 december',
  'Lördag 19 december',
  'Lördag 9 januari',
  'Lördag 16 januari',
  'Lördag 23 januari',
]

const lessons = [
  { label: 'Bländare', image: apertureImage },
  { label: 'Komposition', image: compositionImage },
  { label: 'Slutartid', image: shutterImage },
  { label: 'ISO', image: isoImage },
  { label: 'Fokus', image: focusImage },
]

function Home() {
  const [workshopOpen, setWorkshopOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [showAllDates, setShowAllDates] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if (hash === 'workshop') setWorkshopOpen(true)
    if (hash === 'booking') setBookingOpen(true)
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
    }
  }, [location.hash])

  const openBooking = () => {
    setBookingOpen(true)
    requestAnimationFrame(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }))
  }

  const selectDate = (date) => {
    setSelectedDate(date)
    navigate({ to: '/bokning', search: { date } })
  }

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src={heroImage} alt="Kamera framför en sjö i solnedgången" />
        <div className="hero-copy">
          <h1 id="hero-title">Välkommen till<br />Ljusrum</h1>
          <p>En fotoworkshop i Stockholm för dig som vill utvecklas inom fotografi, från grunder till tekniker</p>
          <button type="button" className="button hero-button" onClick={openBooking}>
            Boka din plats idag
            <Icon name="arrow" />
          </button>
        </div>
      </section>

      <section className="benefits" aria-label="Fördelar med workshopen">
        <Benefit icon="camera" title="Praktisk workshop" description="Lär dig genom att fota själv" />
        <Benefit icon="users" title="Små grupper" description="Personlig guidning och feedback" />
        <Benefit icon="location" title="Centralt i Stockholm" description="Inspirerande miljöer och fotoplatser" />
      </section>

      <section className="accordion-area" id="workshop" aria-label="Workshop och bokning">
        <div className="accordion-content">
          <section className="accordion-section">
            <AccordionButton
              title="Workshop"
              open={workshopOpen}
              onClick={() => setWorkshopOpen((open) => !open)}
            />
            {workshopOpen && (
              <div className="accordion-panel workshop-panel">
                <div className="workshop-overview">
                  <div>
                    <h3>Ta kontroll över din kamera</h3>
                    <p>
                      Upptäck möjligheterna med din systemkamera och utveckla ditt kreativa bildseende. Under
                      workshopen får du genom praktiska övningar, personlig guidning och feedback utvecklas i din
                      egen takt. Du får även med dig inspirerande övningar och användbara tips för att fortsätta
                      utveckla ditt fotograferande på egen hand. Workshopen hålls varje lördag kl. 10–15 i Stockholm
                      och inga förkunskaper krävs.
                    </p>
                  </div>
                  <div className="workshop-details">
                    <div className="detail-list">
                      <Detail icon="calendar">Lördag</Detail>
                      <Detail icon="clock">10:00 - 15:00</Detail>
                      <Detail icon="location">Stockholm, Torsgatan 137</Detail>
                      <Detail icon="users">10 platser per tillfälle</Detail>
                      <Detail icon="card">1200 kr per person</Detail>
                    </div>
                    <div className="workshop-location-frame">
                      <img className="workshop-location" src={stockholmImage} alt="Stockholms kaj med stadshus och båtar" />
                    </div>
                  </div>
                </div>
                <div className="lessons">
                  <h3>Detta lär du dig</h3>
                  <div className="lesson-list">
                    {lessons.map(({ image, label }) => (
                      <div className="lesson" key={label}>
                        <img src={image} alt="" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="accordion-section" id="booking">
            <AccordionButton
              title="Boka din plats"
              open={bookingOpen}
              onClick={() => setBookingOpen((open) => !open)}
            />
            {bookingOpen && (
              <div className="accordion-panel booking-panel">
                <h3>Kommande tillfällen</h3>
                <div className="date-grid">
                  {dates.slice(0, showAllDates ? dates.length : 3).map((date) => (
                    <button
                      type="button"
                      className={`date-card${selectedDate === date ? ' selected' : ''}`}
                      key={date}
                      aria-label={`${date}, 10:00–15:00, 1200 kronor`}
                      onClick={() => selectDate(date)}
                    >
                      <span className="date-card-copy">
                        <strong>{date}</strong>
                        <span>10:00 - 15:00</span>
                        <strong>1200 kr</strong>
                      </span>
                      <img className="date-card-arrow" src={dateArrow} alt="" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="button more-dates"
                  aria-expanded={showAllDates}
                  onClick={() => setShowAllDates((show) => !show)}
                >
                  {showAllDates ? 'Se färre datum' : 'Se fler datum'}
                  <Icon name="chevron" className={showAllDates ? 'chevron is-open' : 'chevron'} />
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

function Benefit({ icon, title, description }) {
  return (
    <div className="benefit">
      <Icon name={icon} size={48} />
      <div className="benefit-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  )
}

function AccordionButton({ title, open, onClick }) {
  return (
    <button
      type="button"
      className={`accordion-trigger${title === 'Workshop' ? ' workshop-trigger' : ''}`}
      aria-expanded={open}
      onClick={onClick}
    >
      <h2>{title}</h2>
      <Icon name="chevron" className={open ? 'chevron is-open' : 'chevron'} />
    </button>
  )
}

function Detail({ icon, children }) {
  return (
    <div className="detail-row">
      <Icon name={icon} size={28} />
      <span>{children}</span>
    </div>
  )
}
