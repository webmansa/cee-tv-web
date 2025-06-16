import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movie/$id')({
    // loader: 
  component: RouteComponent,
})

console.log('sanity chec...')
function RouteComponent() {
  return <div>Hello "/movie/$id"!</div>
}
