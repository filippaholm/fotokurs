import { useState } from 'react'
import { createFileRoute, Link, useLocation, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/bokning')({
  component: Booking,
  head: () => ({ meta: [{ title: 'Granska bokning · Ljusrum' }] }),
})

const price = 1200

function Booking() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.searchStr)
  const date = params.get('date') || 'Lördag 14 november'
  const [seats, setSeats] = useState(Math.min(4, Math.max(1, Number(params.get('seats')) || 1)))

  const submitBooking = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    sessionStorage.setItem('ljusrum-booking-customer', JSON.stringify({
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
    }))
    navigate({ to: '/bekraftelse', search: { date, seats } })
  }

  return (
    <main className="page-main booking-main">
      <form className="booking-card" onSubmit={submitBooking}>
        <div className="booking-intro">
          <h1>Granska bokning</h1>
          <p>Workshop</p>
          <p className="workshop-name">Ta kontroll över din kamera</p>
        </div>

        <div className="booking-summary">
          <SummaryRow label="Datum" value={date} />
          <SummaryRow label="Tid" value="10:00-15:00" />
          <SummaryRow label="Pris per person" value={`${price} kr`} strong />
          <div className="quantity-row">
            <strong>Antal platser</strong>
            <div className="quantity-control" aria-label="Välj antal platser">
              <button type="button" aria-label="Ta bort en plats" disabled={seats <= 1} onClick={() => setSeats((count) => count - 1)}>-</button>
              <strong aria-live="polite">{seats}</strong>
              <button type="button" aria-label="Lägg till en plats" disabled={seats >= 4} onClick={() => setSeats((count) => count + 1)}>+</button>
            </div>
          </div>
          <p className="booking-note">Max 4 deltagare per bokning</p>
          <div className="total-row">
            <span>Totalt</span>
            <span>{price * seats} kr</span>
          </div>
          <p className="invoice-note">Fakturan skickas via e-post efter bokning.</p>
        </div>

        <hr className="booking-divider" />

        <div className="booking-fields">
          <h2>Dina uppgifter</h2>
          <div className="field-row">
            <Field label="Namn*" name="name" autoComplete="name" required />
            <Field label="Telefonnummer*" name="phone" type="tel" autoComplete="tel" required />
          </div>
          <Field label="E-post*" name="email" type="email" autoComplete="email" required />
          <div className="booking-actions">
            <Link to="/" hash="booking" className="button button-secondary">Ändra tiden</Link>
            <button type="submit" className="button button-primary">Bekräfta bokning</button>
          </div>
        </div>
      </form>
    </main>
  )
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <span className={strong ? 'summary-value-strong' : undefined}>{value}</span>
    </div>
  )
}

function Field({ label, name, type = 'text', autoComplete, required = false }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} required={required} />
    </div>
  )
}
