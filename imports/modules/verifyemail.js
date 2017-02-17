
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let token;

const VerifyEmail = () => {
  Accounts.verifyEmail(token, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Email Verified!', 'success');
    }
  });
};

export default VerifyEmail;
