import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from 'src/layouts/PageLayout'

export const Route = createFileRoute('/about')({
    component: AboutComponent,
})

function AboutComponent() {
    return (
        <PageLayout content={

            <div> this is the about page..</div>
        } />
    )
}
