import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/customers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/customers/"!</div>
}
