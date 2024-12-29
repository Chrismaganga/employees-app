import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-4 flex flex-1 gap-10 border-slate-200 text-lg bg-white shadow-lg">
        <Link
          to="/"
          className="mr-4"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          HOME
        </Link>
        <Link
          to="/newPoll"
          className="mr-4"
          activeProps={{
            className: 'font-bold',
          }}
        >
          NEWPOLL
        </Link>
        <Link
          to="/login"
          className="mr-4"
          activeProps={{
            className: 'font-bold',
          }}
        >
          LOGIN
        </Link>
        <Link
          to="/leaderboard"
          className="mr-4"
          activeProps={{
            className: 'font-bold',
          }}
        >
          LEADERBOARD
        </Link>
        <Link
          to="/polls"
          className="mr-4"
          activeProps={{
            className: 'font-bold',
          }}
        >
          POLLS
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
