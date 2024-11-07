export type User = {
    id?: string
    cpf: string
    name: string
    birthdate: Date | string
    status?: UserStatus
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    removedAt?: Date | string | null
    removedBy?: string | null
    password: string,
    address?: Address
}

export type Address = {
    street: string
    number: string
    complement?: string | null
    neighborhood: string
    city: string
    state: string
    zipCode: string
}

export enum UserStatus {
    Ativo,
    Removido
}