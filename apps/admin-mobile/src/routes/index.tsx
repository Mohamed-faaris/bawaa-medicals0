import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="p-6 text-2xl font-bold">
      Admin Mobile App - Bavaa Medicals
    </div>
  ),
})