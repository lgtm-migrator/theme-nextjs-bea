import { NewsroomGallery } from '@prezly/sdk';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';

import { NewsroomContextProvider } from '@/contexts/newsroom';
import { getRedirectToCanonicalLocale } from '@/utils/locale';
import { getPrezlyApi } from '@/utils/prezly';
import { BasePageProps } from 'types';

const Gallery = dynamic(() => import('@/modules/Gallery'), { ssr: true });

interface Props extends BasePageProps {
    gallery: NewsroomGallery;
}

const GalleryPage: FunctionComponent<Props> = ({
    categories,
    companyInformation,
    gallery,
    languages,
    localeCode,
    newsroom,
    translations,
}) => (
    <NewsroomContextProvider
        categories={categories}
        newsroom={newsroom}
        companyInformation={companyInformation}
        languages={languages}
        localeCode={localeCode}
        translations={translations}
    >
        <Gallery gallery={gallery} />
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const api = getPrezlyApi(context.req);
    const basePageProps = await api.getBasePageProps(context.locale);

    if (!basePageProps.localeResolved) {
        return { notFound: true };
    }

    const { uuid } = context.params as { uuid: string };

    const redirect = getRedirectToCanonicalLocale(
        basePageProps,
        context.locale,
        `/media/album/${uuid}`,
    );
    if (redirect) {
        return { redirect };
    }

    const gallery = await api.getGallery(uuid);

    return {
        props: {
            ...basePageProps,
            gallery,
        },
    };
};

export default GalleryPage;
