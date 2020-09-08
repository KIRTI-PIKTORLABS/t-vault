import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyleTextField = styled(TextField)`
  .MuiInputAdornment-positionStart {
    margin-right: ${(props) => (props.icon ? '8px' : '0px')};
  }
`;

const styles = () => ({
  iconStyle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  dark: {
    backgroundColor: '#20232e',
    color: '#5e627c',
  },
  light: {
    background: '#fff',
    color: '#000',
  },
  text: {
    width: '100%',
  },
});

const setIcon = (props) => {
  const { classes, icon } = props;
  return <Icon className={classes.iconStyle}>{icon}</Icon>;
};

const onInputChange = () => {};

const TextFieldComponent = (props) => {
  const {
    icon,
    classes,
    variant,
    placeholder,
    disabled,
    onChange,
    value,
  } = props;
  return (
    <StyleTextField
      icon={icon}
      placeholder={placeholder}
      disabled={disabled || false}
      value={value || ''}
      className={classes.text}
      InputProps={{
        disableUnderline: true,
        className: classes[variant],
        startAdornment: (
          <InputAdornment position="start">
            {icon && setIcon({ ...props })}
          </InputAdornment>
        ),
      }}
      onChange={onChange || ((e) => onInputChange(e))}
    />
  );
};

TextFieldComponent.propTypes = {
  icon: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  disabled: PropTypes.string,
  value: PropTypes.string,
};

TextFieldComponent.defaultProps = {
  icon: '',
  variant: '',
  value: '',
  disabled: false,
};

setIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TextFieldComponent);