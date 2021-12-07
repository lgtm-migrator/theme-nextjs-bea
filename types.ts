import type {
    Category,
    ExtraStoryFields,
    Newsroom,
    NewsroomCompanyInformation,
    NewsroomLanguageSettings,
    Story,
} from '@prezly/sdk';

export interface Env {
    NODE_ENV: 'production' | 'development' | 'test';
    PREZLY_ACCESS_TOKEN: string;
    PREZLY_NEWSROOM_UUID: string;
}

export interface BasePageProps {
    newsroom: Newsroom;
    companyInformation: NewsroomCompanyInformation;
    categories: Category[];
    languages: NewsroomLanguageSettings[];
    localeCode: string;
    /**
     * `false` means it's the default locale
     */
    shortestLocaleCode: string | false;
    localeResolved: boolean;
    translations: Translations;
}

export interface PaginationProps {
    itemsTotal: number;
    currentPage: number;
    pageSize: number;
}

export type StoryWithImage = Story & Pick<ExtraStoryFields, 'header_image' | 'preview_image'>;

export type Translations = Record<string, string>;
