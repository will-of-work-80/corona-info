import fetch from 'node-fetch';
import { GithubInfoEntity } from './entity';
import { GithubInfoRaw } from './raw';

export type GithubInfoProps = GithubInfoEntity;

const GITHUB_INFO_URL = 'https://api.github.com/users/github';

const converter = async (data: Promise<GithubInfoRaw | null>): Promise<GithubInfoEntity | null> => {
    const info = await data;
    if (info === null) {
        return null;
    }
    return {
        login: info.login,
        id: info.id,
        nodeId: info.node_id,
        avatarUrl: info.avatar_url,
        url: info.url,
        type: info.type,
        siteAdmin: info.site_admin,
        name: info.name,
        createdAt: info.created_at,
        updatedAt: info.updated_at,
    };
};

const useFetch = async (url: string): Promise<GithubInfoRaw | null> => {
    const res = await fetch(url, {
        method: 'GET',
    });
    if (!res.ok) {
        console.error('Connection Failed!');
        return null;
    }
    return await res.json();
};

export const getGithub = (): Promise<GithubInfoProps | null> => {
    const coronaInfo = useFetch(GITHUB_INFO_URL);
    return converter(coronaInfo);
};
