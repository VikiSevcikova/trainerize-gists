export interface FetchDataType {
    url : string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: FilesType;
    public: Boolean;
    created_at: string;
    updated_at: string;
    description: string;
    commnets: 0;
    user: Object;
    comments_url: string;
    owner: OwnerType;
    truncated: Boolean
}

export interface FilesType{
    [key: string]: {
        filename: string;
        type: string;
        language: string;
        raw_url: string;
        size: number;
    }
}

export interface OwnerType{
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gavatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: Boolean;
}