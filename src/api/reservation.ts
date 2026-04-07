import type {CreateReservationInput, Reservation} from "../types/database.ts";
import {supabase} from "./config.ts";

export const createReservation = async (input: CreateReservationInput) => {

    const { error: resError } = await supabase
        .from('reservations')
        .insert([input]);

    if (resError) throw resError;

    const { error: itemError } = await supabase
        .from('items')
        .update({ is_reserved: true })
        .eq('id', input.item_id);

    if (itemError) throw itemError;
};

export const confirmReservationByToken = async (token: string | null) : Promise<Reservation> => {

    const { data: reservation, error: resError } = await supabase
        .from('reservations')
        .update({ status: 'confirmed' })
        .eq('token', token)
        .eq('status', 'pending')
        .maybeSingle();

    if (resError) throw resError;
    if (!reservation) {
        throw new Error('Reservation not found or already confirmed');
    }

    const { error: itemError } = await supabase
        .from('items')
        .update({ is_reserved: true })
        .eq('id', reservation.item_id);

    if (itemError) throw itemError;

    return reservation;
};
