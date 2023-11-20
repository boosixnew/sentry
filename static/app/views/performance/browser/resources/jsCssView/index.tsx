import {Fragment, useCallback, useEffect, useState} from 'react';
import {browserHistory} from 'react-router';
import styled from '@emotion/styled';
import debounce from 'lodash/debounce';

import {t} from 'sentry/locale';
import {space} from 'sentry/styles/space';
import {useLocation} from 'sentry/utils/useLocation';
import {RESOURCE_THROUGHPUT_UNIT} from 'sentry/views/performance/browser/resources';
import ResourceTable from 'sentry/views/performance/browser/resources/jsCssView/resourceTable';
import RenderBlockingSelector from 'sentry/views/performance/browser/resources/shared/renderBlockingSelector';
import SelectControlWithProps from 'sentry/views/performance/browser/resources/shared/selectControlWithProps';
import {
  BrowserStarfishFields,
  useResourceModuleFilters,
} from 'sentry/views/performance/browser/resources/utils/useResourceFilters';
import {useResourcePagesQuery} from 'sentry/views/performance/browser/resources/utils/useResourcePagesQuery';
import {useResourceSort} from 'sentry/views/performance/browser/resources/utils/useResourceSort';
import {ModuleName} from 'sentry/views/starfish/types';
import {SpanTimeCharts} from 'sentry/views/starfish/views/spans/spanTimeCharts';
import {ModuleFilters} from 'sentry/views/starfish/views/spans/useModuleFilters';

const {
  SPAN_OP: RESOURCE_TYPE,
  SPAN_DOMAIN,
  TRANSACTION,
  RESOURCE_RENDER_BLOCKING_STATUS,
} = BrowserStarfishFields;

export const DEFAULT_RESOURCE_TYPES = ['resource.script', 'resource.css'];

type Option = {
  label: string;
  value: string;
};

function JSCSSView() {
  const filters = useResourceModuleFilters();
  const sort = useResourceSort();

  const spanTimeChartsFilters: ModuleFilters = {
    'span.op': `[${DEFAULT_RESOURCE_TYPES.join(',')}]`,
    ...(filters[SPAN_DOMAIN] ? {[SPAN_DOMAIN]: filters[SPAN_DOMAIN]} : {}),
  };

  return (
    <Fragment>
      <SpanTimeCharts
        moduleName={ModuleName.OTHER}
        appliedFilters={spanTimeChartsFilters}
        throughputUnit={RESOURCE_THROUGHPUT_UNIT}
      />

      <FilterOptionsContainer columnCount={3}>
        <ResourceTypeSelector value={filters[RESOURCE_TYPE] || ''} />
        <TransactionSelector
          value={filters[TRANSACTION] || ''}
          defaultResourceTypes={DEFAULT_RESOURCE_TYPES}
        />
        <RenderBlockingSelector value={filters[RESOURCE_RENDER_BLOCKING_STATUS] || ''} />
      </FilterOptionsContainer>
      <ResourceTable sort={sort} defaultResourceTypes={DEFAULT_RESOURCE_TYPES} />
    </Fragment>
  );
}

function ResourceTypeSelector({value}: {value?: string}) {
  const location = useLocation();

  const options: Option[] = [
    {value: '', label: 'All'},
    {value: 'resource.script', label: `${t('JavaScript')} (.js)`},
    {value: 'resource.css', label: `${t('Stylesheet')} (.css)`},
  ];
  return (
    <SelectControlWithProps
      inFieldLabel={`${t('Type')}:`}
      options={options}
      value={value}
      onChange={newValue => {
        browserHistory.push({
          ...location,
          query: {
            ...location.query,
            [RESOURCE_TYPE]: newValue?.value,
          },
        });
      }}
    />
  );
}

export function TransactionSelector({
  value,
  defaultResourceTypes,
}: {
  defaultResourceTypes?: string[];
  value?: string;
}) {
  const [state, setState] = useState({
    search: '',
    inputChanged: false,
    shouldRequeryOnInputChange: false,
  });
  const location = useLocation();

  const {data: pages, isLoading} = useResourcePagesQuery(
    defaultResourceTypes,
    state.search
  );

  // If the maximum number of pages is returned, we need to requery on input change to get full results
  if (!state.shouldRequeryOnInputChange && pages && pages.length >= 100) {
    setState({...state, shouldRequeryOnInputChange: true});
  }

  // Everytime loading is complete, reset the inputChanged state
  useEffect(() => {
    if (!isLoading && state.inputChanged) {
      setState({...state, inputChanged: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const optionsReady = !isLoading && !state.inputChanged;

  const options: Option[] = optionsReady
    ? [{value: '', label: 'All'}, ...pages.map(page => ({value: page, label: page}))]
    : [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceUpdateSearch = useCallback(
    debounce((search, currentState) => {
      setState({...currentState, search});
    }, 500),
    []
  );

  return (
    <SelectControlWithProps
      inFieldLabel={`${t('Page')}:`}
      options={options}
      value={value}
      onInputChange={input => {
        if (state.shouldRequeryOnInputChange) {
          setState({...state, inputChanged: true});
          debounceUpdateSearch(input, state);
        }
      }}
      noOptionsMessage={() => (optionsReady ? undefined : t('Loading...'))}
      onChange={newValue => {
        browserHistory.push({
          ...location,
          query: {
            ...location.query,
            [TRANSACTION]: newValue?.value,
          },
        });
      }}
    />
  );
}

export const FilterOptionsContainer = styled('div')<{columnCount: number}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columnCount}, 1fr);
  gap: ${space(2)};
  margin-bottom: ${space(2)};
  max-width: 800px;
`;

export default JSCSSView;
