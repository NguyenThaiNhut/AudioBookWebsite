import type { CommonResponse } from "../xhr";
export interface CartResponse<T extends CartRecord> extends CommonResponse {
    data: T;
    code: string;
    status: number;
}

export interface CartRecord {
    data: Cart;
    success: boolean;
    message: string;
}
export interface Cart {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
} 
