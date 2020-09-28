/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Error from '../../../../../components/Error';
import ScaledLoader from '../../../../../components/Loaders/ScaledLoader';
import ButtonComponent from '../../../../../components/FormFields/ActionButton';
import ComponentError from '../../../../../errorBoundaries/ComponentError/component-error';
import NoData from '../../../../../components/NoData';
import Tree from '../Tree';
import NoSecretsIcon from '../../../../../assets/no-data-secrets.svg';
import mediaBreakpoints from '../../../../../breakpoints';

const SecretsContainer = styled('div')`
  height: 100%;
  overflow: auto;
`;
const EmptySecretBox = styled('div')`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CountSpan = styled.span`
  margin-top: 1.5rem;
  color: #5e627c;
  font-size: 1.3rem;
`;
const bgIconStyle = {
  width: '16rem',
  height: '16rem',
};

const Secrets = (props) => {
  const {
    secretsFolder,
    status,
    safeDetail,
    getResponse,
    setEnableAddFolder,
  } = props;

  // resolution handlers
  const isMobileScreen = useMediaQuery(mediaBreakpoints.small);
  return (
    <ComponentError>
      {' '}
      <SecretsContainer>
        {
          <CountSpan color="#5e627c">
            {`${secretsFolder && secretsFolder.length} Secrets`}
          </CountSpan>
        }

        {!secretsFolder?.length && status.status === 'loading' && (
          <ScaledLoader width="100%" height="90%" />
        )}
        {getResponse === -1 && (
          <EmptySecretBox>
            {' '}
            <Error description="Error while fetching safes folders" />
          </EmptySecretBox>
        )}

        {secretsFolder && secretsFolder.length ? (
          <Tree data={secretsFolder} />
        ) : secretsFolder?.length === 0 && getResponse === 1 ? (
          // eslint-disable-next-line react/jsx-indent
          <EmptySecretBox>
            <NoData
              imageSrc={NoSecretsIcon}
              description="add a <strong>Folder</strong> and then you will be able to add <strong>secrets</strong> to view them all here"
              actionButton={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <ButtonComponent
                  label="add"
                  icon="add"
                  color="secondary"
                  disabled={safeDetail?.access?.toLowerCase() === 'read'}
                  width={isMobileScreen ? '100%' : ''}
                  onClick={() => setEnableAddFolder(true)}
                />
              }
              bgIconStyle={bgIconStyle}
              width={isMobileScreen ? '100%' : '30%'}
            />
          </EmptySecretBox>
        ) : (
          <></>
        )}
      </SecretsContainer>
    </ComponentError>
  );
};
Secrets.propTypes = {
  secretsFolder: PropTypes.arrayOf(PropTypes.array),
  status: PropTypes.objectOf(PropTypes.object),
  safeDetail: PropTypes.objectOf(PropTypes.object),
  setEnableAddFolder: PropTypes.func,
  getResponse: PropTypes.number,
};
Secrets.defaultProps = {
  secretsFolder: [],
  status: {},
  safeDetail: {},
  setEnableAddFolder: () => {},
  getResponse: null,
};

export default Secrets;