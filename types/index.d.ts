import './user.d.ts';

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
    content: any;
}

export interface ArticleTitle {
    title: string;
    _id: string;
}


declare module 'vue/types/vue' {
    export interface Vue {
        $util: any;
        $api: any;
        $lo: any;
    }
}

// tslint:disable-next-line:no-namespace
declare namespace myLib {
    export interface ArticleTitle {
        title: string;
        _id: string;
    }
}

// export declare const Types: (ArticleTitle: ArticleTitle) => void;
