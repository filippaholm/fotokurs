import { createFileRoute } from '@tanstack/react-router'
import aboutImage from '../assets/figma/about-cherry-blossom.png'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({ meta: [{ title: 'Om oss · Ljusrum' }] }),
})

function About() {
  const submitMessage = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = encodeURIComponent('Meddelande från ljusrum.se')
    const body = encodeURIComponent(`E-post: ${formData.get('email')}\n\n${formData.get('message')}`)
    window.location.href = `mailto:hej@ljusrum.se?subject=${subject}&body=${body}`
  }

  return (
    <main className="page-main about-main">
      <div className="about-content">
        <section className="about-copy">
          <h1>Om oss</h1>
          <p>
            Vi är ett litet gäng fotoentusiaster med över 15 års erfarenhet och en gemensam passion för fotografi.
            Genom åren har vi rest världen över, fångat ögonblick och utforskat olika sätt att berätta historier
            genom kameran.
          </p>
          <p>
            Nu vill vi dela med oss av våra kunskaper och inspirera fler att upptäcka glädjen i fotografering.
            Genom våra workshops vill vi skapa en kreativ och avslappnad miljö där du får utvecklas, experimentera
            och hitta ditt eget fotografiska uttryck, oavsett tidigare erfarenhet.
          </p>
          <p>
            <strong>Håll kontakten med oss</strong><br />
            Följ oss på Instagram <strong>@ljusrum</strong> för inspiration, fototips, kreativa projekt och
            information om våra kommande workshops.
          </p>
          <p>
            Har du frågor om våra kurser, vill du samarbeta med oss eller bara prata fotografi? Du är alltid
            välkommen att höra av dig till oss på <a href="mailto:hej@ljusrum.se"><strong>hej@ljusrum.se</strong></a>.
          </p>
          <p>Vi ser fram emot att höra från dig!</p>
        </section>

        <section className="about-contact">
          <h2>Kontakta oss</h2>
          <form onSubmit={submitMessage}>
            <div className="field">
              <label htmlFor="contact-email">*Din epost</label>
              <input id="contact-email" name="email" type="email" required />
            </div>
            <div className="field">
              <label htmlFor="contact-message">*Meddelande</label>
              <textarea id="contact-message" name="message" required />
            </div>
            <button className="about-submit" type="submit">Skicka</button>
          </form>
        </section>
      </div>
      <img className="about-photo" src={aboutImage} alt="Körsbärsblommor ramar in berget Fuji" />
    </main>
  )
}
