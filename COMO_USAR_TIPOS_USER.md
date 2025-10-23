# 📘 Como Usar os Tipos de Usuário

## ✅ Tipos Criados

Criei o arquivo `src/types/user.ts` com os seguintes tipos:

### 1. `User` (Tipo Principal)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
```

### 2. `AuthenticatedUser` (Extende User)

```typescript
interface AuthenticatedUser extends User {
  // Adicione campos extras aqui
}
```

### 3. Outros Tipos Utilitários

- `UserRegisterData` - Para registro
- `UserLoginData` - Para login
- `UserUpdateData` - Para atualização de perfil

## 🎯 Como Usar na Sua Página

### Exemplo 1: Page Component

```typescript
import { getCurrentUser } from "@/actions/user/get-current-user";
import type { User } from "@/types/user";

export default async function AccountPage() {
  const user: User | null = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {user.avatar && <img src={user.avatar} alt={user.name} />}
    </div>
  );
}
```

### Exemplo 2: Client Component

```typescript
"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types/user";

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Buscar usuário...
  }, []);

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Exemplo 3: Server Action

```typescript
"use server";

import type { User } from "@/types/user";
import { getCurrentSession } from "@/actions/auth/session";

export async function getUserData(): Promise<User | null> {
  const user = await getCurrentSession();
  return user;
}
```

## 🔧 Funções Atualizadas com Tipos

Todas as funções relacionadas a usuário agora têm tipos adequados:

### ✅ `getCurrentSession(): Promise<User | null>`

```typescript
import { getCurrentSession } from "@/actions/auth/session";
const user = await getCurrentSession();
// user é do tipo User | null
```

### ✅ `getCurrentUser(): Promise<User | null>`

```typescript
import { getCurrentUser } from "@/actions/user";
const user = await getCurrentUser();
// user é do tipo User | null
```

### ✅ `getUserFromAPI(): Promise<User | null>`

```typescript
import { getUserFromAPI } from "@/actions/user";
const user = await getUserFromAPI();
// user é do tipo User | null
```

## 📝 Benefícios da Tipagem

### 1. **Autocomplete Inteligente**

```typescript
const user = await getCurrentUser();
user?.  // VS Code mostra: id, name, email, avatar, role, createdAt, updatedAt
```

### 2. **Detecção de Erros**

```typescript
const user = await getCurrentUser();
user?.idade; // ❌ Erro: Property 'idade' does not exist
user?.name; // ✅ OK
```

### 3. **Segurança de Tipo**

```typescript
function greetUser(user: User) {
  return `Olá, ${user.name}!`;
}

greetUser({ name: "João" }); // ❌ Erro: faltam campos obrigatórios
greetUser(user); // ✅ OK (se user for do tipo User)
```

## 🎨 Exemplo Completo - Página Account

```typescript
// src/app/account/page.tsx
import { getCurrentUser } from "@/actions/user/get-current-user";
import { redirect } from "next/navigation";
import type { User } from "@/types/user";

export default async function AccountPage() {
  // Buscar usuário com tipo correto
  const user: User | null = await getCurrentUser();

  // Type guard - TypeScript sabe que user não é null depois deste if
  if (!user) {
    redirect("/login");
  }

  // Aqui user é garantido como User (não null)
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar || ""} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          {user.role && <p className="text-xs text-blue-500">{user.role}</p>}
          <p className="text-xs text-muted-foreground">
            Membro desde{" "}
            {new Date(user.createdAt).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
```

## 🔄 Adicionando Novos Campos

Se sua API retornar campos adicionais, atualize o tipo:

```typescript
// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;

  // Adicione novos campos aqui:
  phone?: string;
  bio?: string;
  isPremium?: boolean;
}
```

## ✅ Checklist de Uso

- [x] Tipo `User` criado em `src/types/user.ts`
- [x] `getCurrentSession()` tipada
- [x] `getCurrentUser()` tipada
- [x] `getUserFromAPI()` tipada
- [x] Pronto para usar em toda aplicação

## 🎉 Está Pronto!

Agora você tem tipagem completa para usuários em toda a aplicação!

O TypeScript vai te ajudar a:

- ✅ Evitar erros de digitação
- ✅ Descobrir APIs facilmente (autocomplete)
- ✅ Refatorar código com segurança
- ✅ Documentar a estrutura de dados
