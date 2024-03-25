import { useQuery } from '@tanstack/react-query';
import { Country } from '@/schemas';

const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/data/countries';

export function useCountries() {
    return useQuery<unknown, Error, Country[]>({
        queryKey: ['countries'],
        queryFn: async () => {
            const response = await fetch(url);
            return response.json();
        }
    })
}