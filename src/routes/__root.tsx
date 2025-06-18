import type { ReactNode } from 'react'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { NotFound } from 'src/components/NotFound'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            gcTime: 0,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false, // default: true
            refetchInterval: false,
            refetchOnReconnect: false, // default: always
            refetchOnMount: false,
            retryOnMount: false,
            // throwOnError: (error: Error, query: Query<unknown, Error, unknown, any>) => {
            //     const queryKey = query.queryKey.join(', ') || 'Unknown Query'

            //     if (!loggedQueryErrors.has(queryKey)) {
            //         logError('Query Error', {
            //             message: error.message,
            //             queryName: queryKey,
            //         })
            //         loggedQueryErrors.add(queryKey)
            //     }

            //     return false
            // },
        },
    },
    // mutationCache: new MutationCache({
    //     onError: (error: Error, variables, context, mutation) => {
    //         const mutationKey = mutation?.options?.mutationKey?.join(', ') || 'Unknown Mutation'
    //         logError('Mutation Error', {
    //             message: error.message,
    //             mutationName: mutationKey,
    //         })
    //     },
    // }),
  })

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            { rel: 'stylesheet', href: '/src/styles/app.css' },
        ]
    }),
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
})

function RootComponent() {
    return (
        <QueryClientProvider client={queryClient}>
            <RootDocument>
                <Outlet />
            </RootDocument>
        </QueryClientProvider>
        
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <TanStackRouterDevtools position="bottom-right" />
                <ReactQueryDevtools buttonPosition="bottom-left" /> 
                <Scripts />
            </body>
        </html>
    )
}