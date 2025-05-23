import GithubSlugger from 'github-slugger';
import type { PropsWithChildren } from 'react';

import { HeadingManager } from '~/common/headingManager';
import { HeadingsContext } from '~/common/withHeadingManager';
import DocumentationPage from '~/components/DocumentationPage';
import { PageApiVersionProvider } from '~/providers/page-api-version';
import { PageMetadataContext } from '~/providers/page-metadata';
import { PageMetadata, RemarkHeading } from '~/types/common';
import { AnchorContext } from '~/ui/components/Text';

type DocumentationElementsProps = PropsWithChildren<{
  meta: PageMetadata;
  headings: RemarkHeading[];
}>;

export function DocumentationPageWrapper(props: DocumentationElementsProps) {
  const slugger = new GithubSlugger();
  const manager = new HeadingManager(slugger, {
    ...props.meta,
    headings: props.headings,
  });

  if (!props.meta) {
    return props.children;
  }

  return (
    <AnchorContext.Provider value={slugger}>
      <HeadingsContext.Provider value={manager}>
        <PageMetadataContext.Provider value={props.meta}>
          <PageApiVersionProvider>
            <DocumentationPage
              title={props.meta.title ?? ''}
              description={props.meta.description ?? ''}
              sourceCodeUrl={props.meta.sourceCodeUrl}
              hideTOC={props.meta.hideTOC}
              hideFromSearch={props.meta.hideFromSearch}
              packageName={props.meta.packageName}
              iconUrl={props.meta.iconUrl}
              modificationDate={props.meta.modificationDate}
              platforms={props.meta.platforms}
              searchRank={props.meta.searchRank}
              searchPosition={props.meta.searchPosition}>
              {props.children}
            </DocumentationPage>
          </PageApiVersionProvider>
        </PageMetadataContext.Provider>
      </HeadingsContext.Provider>
    </AnchorContext.Provider>
  );
}
