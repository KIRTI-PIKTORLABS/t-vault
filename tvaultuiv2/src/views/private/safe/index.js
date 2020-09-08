/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import SafeSectionWrap from 'components/containers/SafeSectionWrap';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved

import apiService from './apiService';
import ComponentError from '../../../errorBoundaries/ComponentError/component-error';

const CreateSafe = lazy(() => import('./CreateSafe'));
const SafeSectionPreview = styled('section')`
  border: 2px solid #ccc;
  // width: 80%;
  margin: 3em auto;
`;

const SafePageLayout = (props) => {
  // Sample API call. For integration, call like this with you mock data being passed as parameter
  apiService
    .fetchSafe({ name: 'Jack' })
    // eslint-disable-next-line no-console
    .then((res) => console.log('res ---- ', res))
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));
  return (
    <ComponentError>
      {' '}
      <main title="safe-layout">
        <SafeSectionPreview>
          <SafeSectionWrap {...props} />
        </SafeSectionPreview>
        <Switch>
          <Route
            path="/safe/create-safe"
            render={(routeProps) => <CreateSafe routeProps={routeProps} />}
          />
        </Switch>
      </main>
    </ComponentError>
  );
};
SafePageLayout.propTypes = {};

SafePageLayout.defaultProps = {};
export default withRouter(SafePageLayout);