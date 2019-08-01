import React from 'react';

import {
  createUserProfileDocument,
  FirebaseContext
} from 'firebase/firebase.utils';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import { Face } from '@material-ui/icons';

import CustomInput from 'components/custom-input/custom-input.component';
import Button from 'components/custom-button/button.component';
import CardBody from 'components/card/card-body.component';
import CardHeader from 'components/card/card-header.component';
import CardFooter from 'components/card/card-footer.component';
import SocialLogin from 'components/social-login/social-login.component';

const SignInForm = ({ ...props }) => {
  const { auth } = React.useContext(FirebaseContext);
  const classes = useStyles();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  // Function 1: Submit sign in form
  const handleSignInSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);

    // Form validation
    if (!email) {
      return setErrors({ ...errors, email: 'Email field is required' });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
    } else if (!password) {
      return setErrors({
        ...errors,
        email: '',
        password: 'Password field is required'
      });
    } else {
      setErrors({});
    }

    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      return createUserProfileDocument(user);
    } catch (error) {
      console.log(error);
      return setErrors({
        general: 'Incorrect email address or password'
      });
    }
  };

  // Return statement
  return (
    <form onSubmit={handleSignInSubmit} className={classes.form} noValidate>
      <CardHeader color="info" className={classes.cardHeader}>
        <h3>Sign in to get started</h3>
      </CardHeader>

      <CardBody>
        <SocialLogin signIn />

        <CustomInput
          autoFocus
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          margin="dense"
          fullWidth
          variant="outlined"
          onChange={e => setEmail(e.target.value)}
          value={email}
          icon={<Face />}
          dense
          required
          error={!!errors.email || !!errors.general}
          errorMessage={errors.email}
        />

        <CustomInput
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          margin="dense"
          fullWidth
          variant="outlined"
          onChange={e => setPassword(e.target.value)}
          value={password}
          onFocus={() => setPassword('')}
          dense
          required
          error={!!errors.password || !!errors.general}
          errorMessage={errors.password || errors.general}
        />
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button type="submit" color="twitter" size="lg">
          Sign in
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignInForm;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: theme.spacing(1)
  },
  margin: {
    marginTop: 8
  },
  textField: {
    flexBasis: 200
  },
  form: {
    margin: '0'
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '20px 0',
    marginBottom: '15px'
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px'
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center'
  },
  cardFooter: {
    paddingTop: '0rem',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important'
  }
}));
