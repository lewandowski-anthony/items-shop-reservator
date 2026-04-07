import type {CreateReservationInput, Reservation} from "../types/database.ts";
import {supabase} from "./config.ts";

export const createReservation = async (input: CreateReservationInput) => {

    const { error: resError } = await supabase
        .from('reservations')
        .insert([input]);

    if (resError) {
        console.error(resError);
        throw resError;
    }
};

export const confirmReservationByToken = async (token: string | null): Promise<Reservation> => {

    if (!token) throw new Error("No token provided");

    const { data: checkAny } = await supabase
        .from('reservations')
        .select('status, token')
        .eq('status', 'pending')
        .eq('token', token)
        .maybeSingle();

    if(!checkAny) {
        const message = "No reservation with this token are waiting for confirmation.";
        console.error(message);
        throw new Error(message);
    }

    const { data: updated, error: resError } = await supabase
        .from('reservations')
        .update({ status: 'confirmed' })
        .eq('token', token)
        .eq('status', 'pending')
        .select()
        .maybeSingle();


    console.log(resError);
    console.log(updated);

    if (resError) throw resError;

    if (!updated) {
        const { data: existing } = await supabase
            .from('reservations')
            .select()
            .eq('token', token)
            .eq('status', 'confirmed')
            .maybeSingle();

        if (existing) {
            return existing;
        }

        throw new Error('Reservation not found or invalid token');
    }

    return updated;
};
