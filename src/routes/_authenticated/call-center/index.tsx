import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/call-center/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/call-center/"!</div>
}
