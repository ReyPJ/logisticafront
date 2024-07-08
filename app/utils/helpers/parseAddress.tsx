import { Address } from "@/app/interfaces/Order";

const parseAddress = (address: string): string => {
    try {
        const parsedAddress: Address = JSON.parse(address);
        const { first_name, last_name, address_1, city, state, postcode, country } = parsedAddress;

        let formattedAddress = `${first_name} ${last_name}`;
        formattedAddress += `, ${address_1}`;
        formattedAddress += `, ${city}, ${state} ${postcode}, ${country}`;

        return formattedAddress;
    } catch (error) {
        console.error('Error al parsear la dirección:', error);
        return '';
    }
};

export default parseAddress;