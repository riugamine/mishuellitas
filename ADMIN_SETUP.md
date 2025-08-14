# Configuración del Sistema de Autenticación de Administrador

## 📋 Resumen del Sistema

Se ha implementado un sistema completo de autenticación para el panel de administración de Mis Huellitas que incluye:

- ✅ Autenticación con Supabase SSR
- ✅ Protección de rutas con middleware
- ✅ Modal de login con diseño consistente
- ✅ TanStack Query para manejo de estado del servidor
- ✅ Zustand para estado global
- ✅ API routes seguras
- ✅ Validación con Zod

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio_de_supabase

# NextAuth Secret (genera una cadena aleatoria)
NEXTAUTH_SECRET=tu_clave_secreta_aleatoria 0pH50dmlswzUcLM4r/XHXduUWC66JJCiFQQ6uoacaj0=

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Configuración de Supabase

#### a) Crear el primer usuario administrador

Ejecuta el siguiente SQL en tu consola de Supabase:

```sql
-- Crear usuario administrador (reemplaza con tus datos)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'admin@mishuellitas.com',
  crypt('tu_contraseña_segura', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  false,
  'authenticated'
);

-- Crear perfil de administrador
INSERT INTO perfiles_usuario (
  usuario_id,
  nombre,
  apellido,
  rol,
  activo
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@mishuellitas.com'),
  'Administrador',
  'Principal',
  'admin',
  true
);
```

#### b) Configurar Row Level Security (RLS)

Asegúrate de que las políticas RLS estén configuradas correctamente para la tabla `perfiles_usuario`.

## 🔐 Funcionalidades Implementadas

### 1. Rutas de API

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual

### 2. Middleware de Protección

El middleware protege automáticamente todas las rutas que comienzan con `/admin` excepto la página principal `/admin` (que es el login).

### 3. Componentes

- `LoginModal` - Modal de login con validación
- `AdminLayout` - Layout con header y botón de logout
- `QueryProvider` - Provider de TanStack Query

### 4. Hooks y Stores

- `useAuth` - Hook principal para autenticación
- `useAuthStore` - Store de Zustand para estado global

## 📱 Flujo de Autenticación

1. **Acceso a /admin**: Muestra modal de login si no está autenticado
2. **Login exitoso**: Redirige al dashboard y guarda estado
3. **Navegación**: Middleware protege rutas automáticamente
4. **Logout**: Limpia estado y redirige al login

## 🎨 Diseño

El sistema mantiene la consistencia visual con:
- Colores del sistema definidos en `globals.css`
- Iconos de FontAwesome (free icons only)
- Componentes de shadcn/ui
- Diseño responsive y mobile-first

## 🔧 Comandos Útiles

```bash
# Instalar dependencias (ya ejecutado)
npm install @supabase/ssr @supabase/supabase-js @tanstack/react-query @tanstack/react-query-devtools react-hook-form @hookform/resolvers zod

# Ejecutar en desarrollo
npm run dev

# Verificar tipos
npm run build
```

## 📝 Notas Importantes

1. **Seguridad**: Las credenciales de Supabase no se exponen en el frontend
2. **Escalabilidad**: Estructura modular y reutilizable
3. **Performance**: TanStack Query optimiza las consultas al servidor
4. **UX**: Loading states y manejo de errores completo
5. **Mantenimiento**: Código bien documentado y organizado

## 🚨 Próximos Pasos

Para completar el sistema de administración:

1. Configurar las variables de entorno
2. Crear el primer usuario administrador en Supabase
3. Probar el login en `/admin`
4. Desarrollar las funcionalidades específicas del dashboard

## 🆘 Solución de Problemas

### Error: "Invalid login credentials"
- Verifica que el usuario existe en Supabase
- Confirma que las credenciales son correctas
- Asegúrate de que el perfil tiene rol 'admin' o 'moderador'

### Error: "No hay usuario autenticado"
- Verifica las variables de entorno
- Confirma la configuración de Supabase
- Revisa la configuración del middleware

### Error de middleware
- Asegúrate de que el archivo `middleware.ts` está en la raíz del proyecto
- Verifica que las rutas en `config.matcher` son correctas
