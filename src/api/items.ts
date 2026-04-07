import { supabase } from './config';
import type {Item} from "../types/database.ts";

export const getItems = async (): Promise<Item[]> => {
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erreur from database :", error.message);
        throw error;
    }

    return data || [];
};
