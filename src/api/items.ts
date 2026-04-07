import {supabase} from './config';
import type {Item} from "../types/database.ts";

export const getItems = async (): Promise<Item[]> => {
    const {data, error} = await supabase
        .from('items')
        .select(`
            *,
            reservation:reservations (
              customer_name,
              customer_email,
              status
            )
        `);

    if (error) {
        console.error("Erreur from database :", error.message);
        throw error;
    }

    return data || [];
};
