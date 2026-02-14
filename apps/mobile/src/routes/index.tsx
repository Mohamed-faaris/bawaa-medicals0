import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { Button } from '@/components/ui/button'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-6 text-2xl font-bold">
        <h1>Mobile App - Bavaa Medicals</h1>
        <Button className="mt-4">Test shadcn Button</Button>
      </div>
    )
  },
})