/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import ButtonComponent from '../../../../../components/FormFields/ActionButton';
import TextFieldComponent from '../../../../../components/FormFields/TextField';
import ComponentError from '../../../../../errorBoundaries/ComponentError/component-error';

const AddFolderNameWrapper = styled.div`
  padding: 4.2rem;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.theme.palette.background.paper || '#20232e'};
  width: ${(props) => props.width || '100%'};
`;

const FormWrapper = styled.form`
  margin-top: 2rem;
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const CancelButton = styled.div`
  margin-right: 0.8rem;
`;
const AddFolder = (props) => {
  const {
    width = '100%',
    handleCancelClick,
    handleSaveClick,
    parentId,
    childrens,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);

  const handleValidation = (value) => {
    setErrorMessage(null);
    const isFolderExist = childrens.find((item) => {
      const arr = item.id.split('/');
      return arr[arr.length - 1].toLowerCase() === value.toLowerCase();
    });
    if (isFolderExist) {
      setErrorMessage(
        "Folder already exist's, You can't store secrets in folders having same name "
      );
    }
    setError(value.length < 3 || !value.match(/^[a-zA-Z0-9_]*$/g));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleValidation(e.target.value);
  };
  return (
    <ComponentError>
      {' '}
      <AddFolderNameWrapper width={width}>
        <Typography variant="h5">Add Folder Name*</Typography>
        <FormWrapper>
          <TextFieldComponent
            placeholder="Add folder"
            onChange={(e) => handleChange(e)}
            value={inputValue || ''}
            fullWidth
            error={error || errorMessage}
            helperText={
              errorMessage && errorMessage.includes("Folder already exist's")
                ? errorMessage
                : 'Please enter a minimum of 3 characters lowercase alphabets, number and underscore only.'
            }
          />
          <ButtonWrapper>
            <CancelButton>
              <ButtonComponent
                label="Cancel"
                color="primary"
                onClick={() => handleCancelClick(false)}
              />
            </CancelButton>
            <ButtonComponent
              label="Save"
              color="secondary"
              buttonType="containedSecondary"
              disabled={!inputValue || errorMessage}
              onClick={() =>
                handleSaveClick({ value: inputValue, type: 'folder', parentId })
              }
            />
          </ButtonWrapper>
        </FormWrapper>
      </AddFolderNameWrapper>
    </ComponentError>
  );
};
AddFolder.propTypes = {
  width: PropTypes.string,
  handleCancelClick: PropTypes.func,
  handleSaveClick: PropTypes.func,
  parentId: PropTypes.string,
  childrens: PropTypes.arrayOf(PropTypes.array),
};
AddFolder.defaultProps = {
  width: '100%',
  handleSaveClick: () => {},
  handleCancelClick: () => {},
  parentId: '',
  childrens: [],
};
export default AddFolder;
