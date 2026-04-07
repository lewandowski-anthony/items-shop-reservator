import {useState, useEffect, useRef} from 'react';
import {confirmReservationByToken} from "../api/reservation.ts";

export const useConfirmReservation = (token: string | null) => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const called = useRef(false);

    useEffect(() => {
        if (!token || called.current) {
            if (!token) setStatus('error');
            return;
        }

        const confirm = async () => {
            called.current = true;

            try {
                await confirmReservationByToken(token);
                setStatus('success');
            } catch (err) {
                setStatus('error');
            }
        };

        confirm();
    }, [token]);

    return {status};
};