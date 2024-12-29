import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/newPoll')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/newPoll"!</div>
}
