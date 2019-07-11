
export interface UserItem {
    email: string;
    password: string;
}

declare module 'vue/types/vue' {
    export interface Vue {
        $util: any;
    }
}

export as namespace Types
