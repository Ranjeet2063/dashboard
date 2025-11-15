'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Policy, OperationType, Periodicity, Status } from '@/types/policy'

export default function NewPolicyPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cryptocurrency: 'USDT' as const,
    operationType: 'Recepción' as OperationType,
    minLimit: '',
    maxLimit: '',
    periodicity: 'Diario' as Periodicity,
    status: 'active' as Status,
  })
  const [isCustomPeriodicity, setIsCustomPeriodicity] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la política es requerido'
    }

    if (formData.minLimit && formData.maxLimit) {
      const min = parseFloat(formData.minLimit)
      const max = parseFloat(formData.maxLimit)
      if (isNaN(min) || isNaN(max)) {
        newErrors.limits = 'Los límites deben ser números válidos'
      } else if (min < 0 || max < 0) {
        newErrors.limits = 'Los límites no pueden ser negativos'
      } else if (min > max) {
        newErrors.limits = 'El límite mínimo no puede ser mayor al máximo'
      }
    } else if (formData.minLimit || formData.maxLimit) {
      // Si solo uno está lleno, validar que sea un número válido
      const value = formData.minLimit || formData.maxLimit
      if (isNaN(parseFloat(value)) || parseFloat(value) < 0) {
        newErrors.limits = 'El límite debe ser un número válido y positivo'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simular guardado (aquí iría la llamada a la API)
    setTimeout(() => {
      console.log('Política creada:', formData)
      // Redirigir a la página principal después de crear
      router.push('/')
    }, 1000)
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="mb-6 lg:mb-8">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver a políticas</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Crear Nueva Política
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Completa el formulario para crear una nueva política de gobernanza AML
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div className="bg-dark-card rounded-lg border border-dark-border p-6 space-y-6">
              {/* Nombre de la Política */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nombre de la Política <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Límite de Recepción de USDT"
                  className={`w-full px-4 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-dark-border'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Criptomoneda */}
              <div>
                <label
                  htmlFor="cryptocurrency"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Criptomoneda <span className="text-red-400">*</span>
                </label>
                <select
                  id="cryptocurrency"
                  name="cryptocurrency"
                  value={formData.cryptocurrency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="USDT">USDT</option>
                </select>
              </div>

              {/* Tipo de Operación */}
              <div>
                <label
                  htmlFor="operationType"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Tipo de Operación <span className="text-red-400">*</span>
                </label>
                <select
                  id="operationType"
                  name="operationType"
                  value={formData.operationType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Recepción">Recepción</option>
                  <option value="Envío">Envío</option>
                  <option value="Recepción / Envío">Recepción / Envío</option>
                </select>
              </div>

              {/* Límites */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Límites (USD)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="minLimit"
                      className="block text-xs text-gray-400 mb-1"
                    >
                      Mínimo
                    </label>
                    <input
                      type="number"
                      id="minLimit"
                      name="minLimit"
                      value={formData.minLimit}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.limits ? 'border-red-500' : 'border-dark-border'
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="maxLimit"
                      className="block text-xs text-gray-400 mb-1"
                    >
                      Máximo
                    </label>
                    <input
                      type="number"
                      id="maxLimit"
                      name="maxLimit"
                      value={formData.maxLimit}
                      onChange={handleChange}
                      placeholder="10000"
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.limits ? 'border-red-500' : 'border-dark-border'
                      }`}
                    />
                  </div>
                </div>
                {errors.limits && (
                  <p className="mt-1 text-sm text-red-400">{errors.limits}</p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  Deja ambos campos vacíos si no aplican límites
                </p>
              </div>

              {/* Periodicidad */}
              <div>
                <label
                  htmlFor="periodicity"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Periodicidad <span className="text-red-400">*</span>
                </label>
                {isCustomPeriodicity ? (
                  <div>
                    <input
                      type="text"
                      id="periodicity"
                      name="periodicity"
                      value={formData.periodicity}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, periodicity: e.target.value as Periodicity }))
                      }}
                      placeholder="Ej: Semanal (Max 5)"
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomPeriodicity(false)
                        setFormData((prev) => ({ ...prev, periodicity: 'Semanal' as Periodicity }))
                      }}
                      className="mt-2 text-xs text-primary hover:underline"
                    >
                      Volver a opciones predefinidas
                    </button>
                  </div>
                ) : (
                  <select
                    id="periodicity"
                    name="periodicity"
                    value={isCustomPeriodicity ? 'Semanal' : formData.periodicity}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === 'Semanal') {
                        setIsCustomPeriodicity(true)
                        setFormData((prev) => ({ ...prev, periodicity: 'Semanal (Max 5)' as Periodicity }))
                      } else {
                        setIsCustomPeriodicity(false)
                        setFormData((prev) => ({ ...prev, periodicity: value as Periodicity }))
                      }
                    }}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Diario">Diario</option>
                    <option value="Semanal">Semanal (personalizado)</option>
                    <option value="Por Transacción">Por Transacción</option>
                    <option value="Mensual">Mensual</option>
                  </select>
                )}
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary bg-dark-bg border-dark-border focus:ring-primary focus:ring-2"
                    />
                    <span className="text-gray-300">Activa</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary bg-dark-bg border-dark-border focus:ring-primary focus:ring-2"
                    />
                    <span className="text-gray-300">Inactiva</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-dark-border text-gray-300 rounded-lg hover:bg-dark-border hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark-bg font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {isSubmitting ? 'Guardando...' : 'Guardar Política'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

