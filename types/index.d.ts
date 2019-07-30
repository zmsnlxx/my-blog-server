
export interface UserItem {
    email: string;
    password: string;
}

export interface InterfaceData {
    code: number;
    data: any;
}

export interface HeaderName {
    label: string;
    jump: string;
}

export interface ArticleClass {
    label: string;
    icon: string;
}

export interface ArticleTitle {
    title: string;
}


declare module 'vue/types/vue' {
    export interface Vue {
        $util: any;
    }
}

export as namespace Types
