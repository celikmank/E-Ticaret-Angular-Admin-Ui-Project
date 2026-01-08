export interface cartModel {
    id?: string;
    userId: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    productImageUrl: string;
}

export const initialCart: cartModel = {
    userId: '',
    productId: '',
    productName: '',
    productPrice: 0,
    quantity: 1,
    productImageUrl: '',
};