import { useState, useEffect } from 'react';
import { getItems } from '../api/items';
import type { Item } from '../types/database';

export const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await getItems();
            setItems(data);
        } catch (err) {
            setError("Cannot load items from database");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    return { items, loading, error, refresh: loadItems };
};