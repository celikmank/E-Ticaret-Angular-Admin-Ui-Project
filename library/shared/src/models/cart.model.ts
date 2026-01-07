export interface cartModel {
    id?: string;
    userId: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

export const initialCart: cartModel = {
    userId: '',
    productId: '',
    productName: '',
    price: 0,
    quantity: 1,
};