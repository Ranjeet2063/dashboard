'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { usePolicies } from '@/context/PolicyContext'
import { GovernanceStatus } from '@/types/policy'

const BLEND_PROTOCOL = { value: 'Blend', icon: 'B', color: 'blue' }

const UNIT_OPTIONS = ['XLM', 'Units', '%', 'USD']

export default function NewPolicyPage() {
  const router = useRouter()
  const { addPolicy } = usePolicies()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [formData, setFormData] = useState({
    policyDescription: '',
    policyValue: '',
    valueUnit: 'XLM',
    status: 'enabled' as GovernanceStatus,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProtocol = BLEND_PROTOCOL

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.policyDescription.trim()) {
      errs.policyDescription = 'La descripción de la política es requerida'
    }
    if (!formData.policyValue || isNaN(Number(formData.policyValue)) || Number(formData.policyValue) <= 0) {
      errs.policyValue = 'Ingresa un valor numérico mayor a 0'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    addPolicy({
      protocol: selectedProtocol.value,
      protocolIcon: selectedProtocol.icon,
      protocolColor: selectedProtocol.color,
      policyDescription: formData.policyDescription.trim(),
      policyValue: Number(formData.policyValue),
      valueUnit: formData.valueUnit,
      status: formData.status,
    })

    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-[240px] flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-6 lg:mb-8">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver a políticas</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Add New Policy
            </h1>
            <p className="text-sm text-gray-400">
              Fill in the details to create a new governance policy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div className="bg-dark-card rounded-card border border-dark-border p-6 space-y-6">
              {/* Protocol (fixed to Blend) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Protocol
                </label>
                <div className="flex items-center gap-3 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    B
                  </div>
                  <span className="text-sm font-medium text-white">Blend</span>
                </div>
              </div>

              {/* Policy Description */}
              <div>
                <label htmlFor="policyDescription" className="block text-sm font-medium text-gray-300 mb-2">
                  Policy Description <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="policyDescription"
                  name="policyDescription"
                  value={formData.policyDescription}
                  onChange={handleChange}
                  placeholder="e.g. Max deposit amount per wallet"
                  className={`w-full px-4 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.policyDescription ? 'border-red-500' : 'border-dark-border'
                  }`}
                />
                {errors.policyDescription && (
                  <p className="mt-1 text-sm text-red-400">{errors.policyDescription}</p>
                )}
              </div>

              {/* Policy Value + Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="policyValue" className="block text-sm font-medium text-gray-300 mb-2">
                    Policy Value <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="policyValue"
                    name="policyValue"
                    value={formData.policyValue}
                    onChange={handleChange}
                    placeholder="5000"
                    min="0"
                    step="any"
                    className={`w-full px-4 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.policyValue ? 'border-red-500' : 'border-dark-border'
                    }`}
                  />
                  {errors.policyValue && (
                    <p className="mt-1 text-sm text-red-400">{errors.policyValue}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="valueUnit" className="block text-sm font-medium text-gray-300 mb-2">
                    Unit
                  </label>
                  <select
                    id="valueUnit"
                    name="valueUnit"
                    value={formData.valueUnit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="enabled"
                      checked={formData.status === 'enabled'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <span className="text-sm text-status-enabled font-medium">Enabled</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="disabled"
                      checked={formData.status === 'disabled'}
                      onChange={handleChange}
                      className="w-4 h-4 accent-gray-500"
                    />
                    <span className="text-sm text-gray-400 font-medium">Disabled</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border border-dark-border text-gray-300 rounded-lg hover:bg-dark-border hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {isSubmitting ? 'Saving...' : 'Save Policy'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
