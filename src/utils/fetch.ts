import fetch from 'node-fetch';

interface FetchBase {
    url: string;
}

type GetMethod = {
    method: 'GET';
    query?: object;
} & FetchBase;

type PostMethod = {
    method: 'POST';
    query?: object;
} & FetchBase;

type PutMethod = {
    method: 'PUT';
    query?: object;
} & FetchBase;

type FetchMethod = GetMethod | PostMethod | PutMethod;

export const useFetch = async (input: FetchMethod): Promise<Response | null> => {
    const res = await fetch(input.url, {
        method: input.method,
    });
    if (!res.ok) {
        console.error('Connection Failed!');
        return null;
    }
    const valueT = await res.json();
    return valueT;
};
