import type {CreateReservationInput, Reservation} from "../types/database.ts";
import {supabase} from "./config.ts";

const ERR_NO_TOKEN = "No token provided";
const ERR_NO_PENDING_RESERVATION = "No reservation with this token are waiting for confirmation.";
const ERR_INVALID_TOKEN = "Reservation not found or invalid token";

export const createReservation = async (input: CreateReservationInput) => {
    const { error: insertError } = await supabase
        .from('reservations')
        .insert([input]);

    if (insertError) {
        console.error(insertError);
        throw insertError;
    }
};

export const confirmReservationByToken = async (token: string | null): Promise<Reservation> => {
    if (!token) throw new Error(ERR_NO_TOKEN);

    const { data: pendingReservation } = await supabase
        .from('reservations')
        .select('status, token')
        .eq('status', 'pending')
        .eq('token', token)
        .maybeSingle();

    if (!pendingReservation) {
        console.error(ERR_NO_PENDING_RESERVATION);
        throw new Error(ERR_NO_PENDING_RESERVATION);
    }

    const { data: confirmedReservation, error: updateError } = await supabase
        .from('reservations')
        .update({ status: 'confirmed' })
        .eq('token', token)
        .eq('status', 'pending')
        .select()
        .maybeSingle();

    if (updateError) throw updateError;

    if (!confirmedReservation) {
        const { data: existingConfirmedReservation } = await supabase
            .from('reservations')
            .select()
            .eq('token', token)
            .eq('status', 'confirmed')
            .maybeSingle();

        if (existingConfirmedReservation) {
            return existingConfirmedReservation;
        }

        throw new Error(ERR_INVALID_TOKEN);
    }

    return confirmedReservation;
};
