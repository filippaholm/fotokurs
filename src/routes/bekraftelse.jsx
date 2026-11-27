import { createFileRoute, Link, useLocation } from '@tanstack/react-router'
import { Icon } from '../components/Icons'
import instagramIcon from '../assets/figma/instagram-gradient.svg'

export const Route = createFileRoute('/bekraftelse')({
  component: Confirmation,
  head: () => ({ meta: [{ title: 'Bokningsbekräftelse · Ljusrum' }] }),
})

function Confirmation() {
  const location = useLocation()
  const params = new URLSearchParams(location.searchStr)
  const date = params.get('date') || 'Lördag 14 november'
  const seats = Math.min(4, Math.max(1, Number(params.get('seats')) || 1))
  const customer = readCustomer()

  return (
    <main className="page-main confirmation-main">
      <section className="confirmation-status" aria-labelledby="confirmation-title">
        <Icon name="check" size={48} />
        <div>
          <h1 id="confirmation-title">Din plats är bokad!</h1>
          <p>Vi ses på workshopen</p>
        </div>
      </section>

      <section className="confirmation-details">
        <h2>Boknings uppgifter</h2>
        <div className="confirmation-details-list">
          <SummaryRow label="Datum" value={date} />
          <SummaryRow label="Tid" value="10:00-15:00" />
          <SummaryRow label="Bokningsnummer" value="874439MD22" />
          <SummaryRow label="Antal platser" value={String(seats)} />
          {customer.name && <SummaryRow label="Namn" value={customer.name} />}
          <p>Bekräftelse och faktura skickas på e-post</p>
        </div>
      </section>

      <hr className="booking-divider confirmation-divider" />

      <Link to="/" className="button confirmation-button">Till startsidan</Link>

      <section className="confirmation-social">
        <img src={instagramIcon} alt="" />
        <h2>Följ oss på instagram</h2>
        <p>Få inspiration, fototips och en inblick i våra workshops.</p>
        <a className="button" href="https://www.instagram.com/ljusrum/">@ljusrum</a>
      </section>
    </main>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function readCustomer() {
  try {
    return JSON.parse(sessionStorage.getItem('ljusrum-booking-customer') || '{}')
  } catch (error) {
    console.error('Kunde inte läsa bokningsuppgifterna.', error)
    return {}
  }
}
