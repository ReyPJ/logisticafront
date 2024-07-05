export interface Order {
    id: number,
    customer_name: string;
    customer_last_name: string;
    shipping_address: string;
    item: {
        id: number;
        name: string;
        quantity: number;
        sku: string;
    }[];
    shipping_lines: {
        id: number;
        method_id: string;
        method_title: string;
    }[];
    created_at: string;
    status: string;
}

export interface Address {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}