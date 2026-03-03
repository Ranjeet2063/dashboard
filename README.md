# Fortgate Dashboard - Gestión AML

Dashboard para gestión de políticas AML (Anti-Money Laundering) de criptoactivos, construido con Next.js 14, TypeScript y TailwindCSS.

## 🚀 Características

- **Dashboard de Políticas AML**: Gestión completa de políticas de gobernanza para criptoactivos
- **Interfaz Dark Theme**: Diseño moderno y profesional con tema oscuro
- **Responsive**: Diseño adaptativo para móviles, tablets y desktop
- **Componentes Reutilizables**: Arquitectura modular y escalable
- **TypeScript**: Tipado estático para mayor seguridad en el código

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
fortgate-dashboard/
├── app/
│   ├── globals.css          # Estilos globales y configuración de Tailwind
│   ├── layout.tsx           # Layout principal de la aplicación
│   └── page.tsx             # Página principal del dashboard
├── components/
│   ├── Sidebar.tsx          # Barra lateral de navegación
│   ├── Header.tsx           # Header con notificaciones y logout
│   ├── SearchBar.tsx        # Barra de búsqueda
│   ├── FilterButtons.tsx    # Botones de filtrado
│   └── PolicyTable.tsx      # Tabla de políticas
├── types/
│   └── policy.ts            # Tipos TypeScript para las políticas
└── package.json
```

## 🎨 Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework de estilos utility-first
- **Lucide React** - Iconos modernos y ligeros

## 📝 Funcionalidades

- ✅ Visualización de políticas AML
- ✅ Búsqueda de políticas por nombre
- ✅ Filtrado por criptomoneda (USDT, BTC)
- ✅ Toggle de estado activo/inactivo
- ✅ Acciones de editar y eliminar políticas
- ✅ Diseño responsive

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📱 Responsive Design

El dashboard está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🎯 Próximos Pasos

- [ ] Implementar formulario de creación/edición de políticas
- [ ] Conectar con API backend
- [ ] Agregar autenticación
- [ ] Implementar paginación en la tabla
- [ ] Agregar más filtros y ordenamiento

