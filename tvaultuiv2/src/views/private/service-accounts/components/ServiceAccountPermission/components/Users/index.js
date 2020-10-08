/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ComponentError from '../../../../../../../errorBoundaries/ComponentError/component-error';
import NoData from '../../../../../../../components/NoData';
import ButtonComponent from '../../../../../../../components/FormFields/ActionButton';
import noPermissionsIcon from '../../../../../../../assets/no-permissions.svg';
import mediaBreakpoints from '../../../../../../../breakpoints';
import AddUser from '../../../../../../../components/AddUser';
import apiService from '../../../../apiService';
import LoaderSpinner from '../../../../../../../components/Loaders/LoaderSpinner';
import PermissionsList from '../../../../../../../components/PermissionsList';

const { small, belowLarge } = mediaBreakpoints;

const NoDataWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  p {
    ${small} {
      margin-top: 2rem;
      margin-bottom: 4rem;
      width: 75%;
    }
  }
`;

const bgIconStyle = {
  width: '10rem',
  height: '10rem',
};

const customStyle = css`
  height: 100%;
`;

const noDataStyle = css`
  width: 42%;
  ${belowLarge} {
    width: 70%;
  }
  ${small} {
    width: 100%;
  }
`;

const Users = (props) => {
  const {
    accountDetail,
    newPermission,
    onNewPermissionChange,
    accountMetaData,
    fetchPermission,
    updateToastMessage,
    refresh,
  } = props;

  const [editUser, setEditUser] = useState('');
  const [editAccess, setEditAccess] = useState('');
  const [response, setResponse] = useState({ status: 'loading' });
  const isMobileScreen = useMediaQuery(small);

  // on svc account meta data is available.
  useEffect(() => {
    if (accountMetaData && Object.keys(accountMetaData).length !== 0) {
      if (Object.keys(accountMetaData?.response).length !== 0) {
        setResponse({ status: 'success' });
      }
    } else {
      setResponse({ status: '' });
    }
  }, [accountMetaData]);

  // When add permission button is clicked.
  useEffect(() => {
    if (newPermission) {
      setResponse({ status: 'add' });
    }
  }, [newPermission]);

  /**
   * @function onDeleteClick
   * @description function to delete the user from the svc account users list.
   * @param {username} string username of the user.
   * @param {access} string permission of the user.
   */
  const onDeleteClick = (username, access) => {
    setResponse({ status: 'loading' });
    const payload = {
      access,
      svcAccName: accountDetail.name,
      username,
    };
    apiService
      .deleteUserPermission(payload)
      .then(async (res) => {
        if (res && res.data?.messages && res.data.messages[0]) {
          updateToastMessage(1, res.data.messages[0]);
          setResponse({ status: '' });
          await fetchPermission();
          refresh();
        }
      })
      .catch((err) => {
        setResponse({ status: 'success' });
        if (err.response?.data?.errors && err.response.data.errors[0]) {
          updateToastMessage(-1, err.response.data.errors[0]);
        }
      });
  };

  /**
   * @function onSaveClicked
   * @description function to save the user to the svc account users list.
   * @param {data} object payload to call api.
   */
  const onSaveClicked = (data) => {
    setResponse({ status: 'loading' });
    apiService
      .addUserPermission(data)
      .then((res) => {
        if (res && res.data?.messages) {
          updateToastMessage(1, res.data?.messages[0]);
          setResponse({ status: '' });
          refresh();
          //   fetchPermission();
        }
      })
      .catch((err) => {
        if (err.response?.data?.errors && err.response.data.errors[0]) {
          updateToastMessage(-1, err.response.data.errors[0]);
        }
        setResponse({ status: 'success' });
      });
  };

  /**
   * @function onSubmit
   * @description function structure the payload when save/edit is clicked and call save api.
   * @param {username} string user name of the user.
   * @param {access} string permission given to the user.
   */
  const onSubmit = async (username, access) => {
    const value = {
      access,
      svcAccName: `${accountDetail.name}`,
      username: username.toLowerCase(),
    };
    onSaveClicked(value);
    onNewPermissionChange();
  };

  /**
   * @function onEditSaveClicked
   * @description function to edit the existing user.
   * @param {username} string user name of the user.
   * @param {access} string permission given to the user.
   */
  const onEditSaveClicked = (username, access) => {
    setResponse({ status: 'loading' });
    const payload = {
      access,
      svcAccName: accountDetail.name,
      username,
    };
    apiService
      .deleteUserPermission(payload)
      .then((res) => {
        if (res) {
          setResponse({ status: 'loading' });
          onSubmit(username, access);
        }
      })
      .catch((err) => {
        if (err.response?.data?.errors && err.response.data.errors[0]) {
          updateToastMessage(-1, err.response.data.errors[0]);
        }
        setResponse({ status: 'success' });
      });
  };

  /**
   * @function onCancelClicked
   * @description function when cancel of add user and edit user is called.
   */
  const onCancelClicked = () => {
    setResponse({ status: 'success' });
    onNewPermissionChange();
  };

  /**
   * @function onEditClick
   * @description function to edit the existing user.
   * @param {key} key user name of the user.
   * @param {value} value permission given to the user.
   */
  const onEditClick = (key, value) => {
    setEditAccess(value);
    setEditUser(key);
    setResponse({ status: 'edit' });
  };

  return (
    <ComponentError>
      <>
        {response.status === 'loading' && (
          <LoaderSpinner customStyle={customStyle} />
        )}
        {response.status === 'add' && (
          <AddUser
            handleSaveClick={(user, access) => onSubmit(user, access)}
            handleCancelClick={onCancelClicked}
            refresh={refresh}
            isSvcAccount
          />
        )}
        {response.status === 'edit' && (
          <AddUser
            handleSaveClick={(user, access) => onEditSaveClicked(user, access)}
            handleCancelClick={onCancelClicked}
            username={editUser}
            access={editAccess}
            refresh={refresh}
            isSvcAccount
          />
        )}
        {response.status === 'success' &&
          accountMetaData &&
          accountMetaData.response && (
            <>
              {accountMetaData.response?.users &&
                Object.keys(accountMetaData.response?.users).length > 0 && (
                  <PermissionsList
                    list={accountMetaData.response.users}
                    isSvcAccount
                    onEditClick={(key, value) => onEditClick(key, value)}
                    onDeleteClick={(key, value) => onDeleteClick(key, value)}
                  />
                )}
              {(accountMetaData.response.users === null ||
                !accountMetaData.response.users ||
                (accountMetaData.response.users &&
                  Object.keys(accountMetaData.response.users).length ===
                    0)) && (
                <NoDataWrapper>
                  <NoData
                    imageSrc={noPermissionsIcon}
                    description="No <strong>users</strong> are given permission to access this safe,
                    add users to access the safe"
                    actionButton={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <ButtonComponent
                        label="add"
                        icon="add"
                        color="secondary"
                        onClick={() => setResponse({ status: 'add' })}
                        width={isMobileScreen ? '100%' : '9.4rem'}
                      />
                    }
                    bgIconStyle={bgIconStyle}
                    customStyle={noDataStyle}
                  />
                </NoDataWrapper>
              )}
            </>
          )}
      </>
    </ComponentError>
  );
};

Users.propTypes = {
  accountDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  newPermission: PropTypes.bool.isRequired,
  onNewPermissionChange: PropTypes.func.isRequired,
  accountMetaData: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchPermission: PropTypes.func.isRequired,
  updateToastMessage: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};
export default Users;