import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-4 flex flex-1 gap-10 border-slate-100  text-lg bg-white shadow-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to="/newPoll"
          activeProps={{
            className: 'font-bold',
          }}
        >
          New Poll
        </Link>
        <Link to="/leaderboard" activeProps={{ 
          className: 'font-bold' }}
        >
          Leaderboard   
      
        </Link>
        <Link to="/polls" activeProps={{
          className: 'font-bold',
        }}>
          Polls 
     
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
