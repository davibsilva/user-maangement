export type GetUserDto = {
    id?: string
    cpf: string
    name: string
    birthdate: Date | string
    status?: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    removedAt?: Date | string | null
    removedBy?: string | null
    password: string,
    address?: Address | null
}

export type WriteUserDto = {
    id?: string
    cpf: string
    name: string
    birthdate: Date | string
    status?: string
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
    number: string 
    id?: number 
    street: string
    complement: string | null
    neighborhood: string
    city: string
    state: string
    zipCode: string
    userId: string   
}

export enum UserStatus {
    Ativo,
    Removido
}