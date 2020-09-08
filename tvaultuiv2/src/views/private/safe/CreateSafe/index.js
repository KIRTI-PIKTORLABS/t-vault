/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import ButtonComponent from 'components/FormFields/ActionButton';
import ComponentError from 'errorBoundaries/ComponentError/component-error';

const ModalWrapper = styled.section`
  background-color: #2a2e3e;
  padding: 2.4rem 3.2rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  width: 50%;
  margin: auto 0;
`;

const CreateSafeHeader = styled.h2`
  font-size: 1.6rem;
`;

const InputFieldLabelWrapper = styled.div`
  margin-bottom: 1rem;
  .MuiFormControl-root {
    width: 100%;
  }
  .MuiFormLabel-root {
    margin-bottom: 1.2rem;
    font-weight: bold;
  }
  .MuiFilledInput-root {
    border-radius: 0.5rem;
    background-color: #eee;
    width: 100%;
    :before,
    :after,
    :hover:before {
      border: 0;
    }
  }
  .MuiSelect-icon {
    top: auto;
    color: #000;
  }
  .MuiFilledInput-input,
  .MuiFilledInput-multiline {
    padding: 1rem 0.5rem;
  }
  .MuiFormLabel-root {
    font-size: 1.4rem;
  }
`;

const PopoverDescriptionWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;
`;

const PopoverWrapper = styled.div`
  position: absolute;
  bottom: -4.8rem;
  background-color: #fff;
  padding: 2rem;
  z-index: 2;
  border-radius: 0.3rem;
  box-shadow: 0 0.125em 0.75em 0 rgba(0, 0, 0, 0.15);
  display: ${(props) => (props.popOverOpen ? 'block' : 'none')};
`;

const SafeDescription = styled.p`
  margin-left: 2rem;
  color: #ccc;
`;

const CancelSaveWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const CancelButton = styled.div`
  margin-right: 0.8rem;
`;

const CreateSafeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
    padding: '10rem 0',
  },
}));

const CreateModal = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [type, setType] = useState('Personal');
  const [owner, setOwner] = useState('');
  const [safeName, setSafeName] = useState('');
  const [description, setDescription] = useState('');
  const [popOverOpen, setPopOverOpen] = useState(false);

  const onIconClicked = () => {
    setPopOverOpen(!popOverOpen);
  };

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };
  return (
    <ComponentError>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalWrapper>
            <CreateSafeHeader id="transition-modal-title">
              Create Safe
            </CreateSafeHeader>
            <PopoverDescriptionWrapper>
              <button type="button" onClick={() => onIconClicked()}>
                Icon
              </button>
              <PopoverWrapper popOverOpen={popOverOpen}>
                Icon popover
              </PopoverWrapper>
              <SafeDescription>
                A safe is a logical unit to store the secrets. All the safes are
                created within vault. You can control access only at the safe
                level. As a vault administrator you can manage safe but cannot
                view the content of the safe.
              </SafeDescription>
            </PopoverDescriptionWrapper>
            <CreateSafeForm>
              <InputFieldLabelWrapper>
                <InputLabel>Safe Name</InputLabel>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  value={safeName}
                  onChange={(e) => setSafeName(e.target.value)}
                />
              </InputFieldLabelWrapper>
              <InputFieldLabelWrapper>
                <InputLabel>Owner</InputLabel>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </InputFieldLabelWrapper>
              <InputFieldLabelWrapper>
                <InputLabel>Type of Safe</InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={type}
                  variant="filled"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Public">Public</MenuItem>
                </Select>
              </InputFieldLabelWrapper>
              <InputFieldLabelWrapper>
                <InputLabel>Description</InputLabel>
                <TextField
                  id="standard-multiline-flexible"
                  multiline
                  rowsMax={4}
                  variant="filled"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details about this safe"
                  helperText="Please add a minimum of 10 characters"
                />
              </InputFieldLabelWrapper>
              <CancelSaveWrapper>
                <CancelButton>
                  <ButtonComponent
                    label="Cancel"
                    color="primary"
                    onClick={() => handleClose()}
                  />
                </CancelButton>
                <ButtonComponent label="Create" color="secondary" icon="add" />
              </CancelSaveWrapper>
            </CreateSafeForm>
          </ModalWrapper>
        </Fade>
      </Modal>
    </ComponentError>
  );
};

CreateModal.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(CreateModal);