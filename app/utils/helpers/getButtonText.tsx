import { OrderStatus } from "@/app/components/TableNewOrders";

const getButtonText = (status: string): string => {
    switch (status) {
        case OrderStatus.NEW:
            return 'Marcar como preparado';
        case OrderStatus.PREPARED:
            return 'Marcar como enviado';
        default:
            return '';
    }
};

export default getButtonText;