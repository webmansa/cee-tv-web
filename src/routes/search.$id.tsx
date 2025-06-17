import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search/$id')({
    component: SearchDetail,
})

function SearchDetail() {
  return <div>Hello "/search/$id"!</div>
}
