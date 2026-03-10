'use client'

interface Event {
  id: string
  title: string
  description: string
  time: string
  color: string /* tailwind: bg-emerald-500, bg-red-500, bg-amber-500, bg-blue-500 */
}

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Política Aprobada',
    description: 'ID #4525. Nueva regla de firewall aplicada.',
    time: 'Hace 12 min',
    color: 'bg-emerald-500',
  },
  {
    id: '2',
    title: 'Transacción Rechazada',
    description: 'Protocolo HTTP inseguro detectado.',
    time: 'Hace 45 min',
    color: 'bg-red-500',
  },
  {
    id: '4',
    title: 'Reporte Generado',
    description: 'Resumen semanal enviado.',
    time: 'Hace 4 horas',
    color: 'bg-blue-500',
  },
]

export default function EventsList() {
  return (
    <div className="bg-dark-card border border-dark-border rounded-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white">Eventos Recientes</h2>
        <button className="text-xs text-primary hover:underline">Ver todo</button>
      </div>
      <div className="space-y-4 flex-1">
        {EVENTS.map((ev) => (
          <div key={ev.id} className="flex gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${ev.color} shrink-0 mt-1.5`} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">{ev.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-snug">{ev.description}</p>
              <p className="text-[11px] text-gray-500 mt-1">{ev.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
