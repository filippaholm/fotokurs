import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Ljusrum · Fotoworkshop i Stockholm' }] }),
  notFoundComponent: () => <h1 className="not-found">Sidan finns inte</h1>,
})

function Layout() {
  return (
    <>
      <HeadContent />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
