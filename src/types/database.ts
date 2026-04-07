export interface TranslatedText {
    fr: string;
    en: string;
    es: string;
    [key: string]: string;
}

export interface Item {
    id: string;
    created_at: string;
    title: TranslatedText;
    description: TranslatedText;
    price: number;
    image_url: string;
    category?: string;
    date_of_availability: string;
    reservation?: Reservation | null;
}

export interface Reservation {
    id: string;
    created_at: string;
    item_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    token?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export type CreateReservationInput = Omit<Reservation, 'id' | 'created_at'>;