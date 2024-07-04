export interface Order {
    id: number,
    customer_name: string;
    customer_last_name: string;
    shipping_address: string;
    item: {
        id: number;
        name: string;
        quantity: number;
    }[];
    created_at: string;
    updated_at: string;
}