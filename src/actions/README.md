# Actions - Next.js 15 App Router

Este diretório contém todas as Server Actions organizadas por entidades da aplicação.

## Estrutura

```
src/actions/
├── auth/                    # Ações de autenticação
│   ├── register.ts         # Registro de usuários
│   ├── logout.ts           # Logout de usuários
│   └── index.ts            # Exportações
├── user/                   # Ações de usuário
│   ├── get-current-user.ts # Buscar usuário atual
│   ├── get-user-courses.ts # Buscar cursos do usuário
│   ├── update-profile.ts   # Atualizar perfil
│   └── index.ts            # Exportações
├── course/                 # Ações de curso
│   ├── enroll.ts           # Inscrever em curso
│   ├── get-course.ts       # Buscar curso
│   └── index.ts            # Exportações
├── progress/               # Ações de progresso
│   ├── mark-task-completed.ts    # Marcar tarefa como concluída
│   ├── update-task-progress.ts   # Atualizar progresso da tarefa
│   ├── get-user-progress.ts      # Buscar progresso do usuário
│   └── index.ts                  # Exportações
└── index.ts               # Exportações principais
```

## Uso

### Importação Individual

```typescript
import { registerUser } from "@/actions/auth";
import { getCurrentUser } from "@/actions/user";
import { enrollInCourse } from "@/actions/course";
import { markTaskAsCompleted } from "@/actions/progress";
```

### Importação por Entidade

```typescript
import { registerUser, logout } from "@/actions/auth";
import { getCurrentUser, getUserCourses } from "@/actions/user";
```

### Importação Geral

```typescript
import {
  registerUser,
  getCurrentUser,
  enrollInCourse,
  markTaskAsCompleted,
} from "@/actions";
```

## Características

- ✅ **Server Actions**: Todas as ações são Server Actions do Next.js 15
- ✅ **Organização por Entidade**: Cada entidade tem sua própria pasta
- ✅ **TypeScript**: Totalmente tipado
- ✅ **Autenticação**: Verificação automática de sessão
- ✅ **Tratamento de Erros**: Tratamento consistente de erros
- ✅ **Prisma**: Integração com banco de dados via Prisma ORM

## Migração do Next.js 14

- ❌ Removida pasta `src/app/api/`
- ✅ Todas as rotas de API convertidas para Server Actions
- ✅ Autenticação via NextAuth.js sem API routes
- ✅ Middleware para proteção de rotas

