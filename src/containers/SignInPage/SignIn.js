import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../../components/LandingComponents/Typography';
import AppFooter from '../../components/LandingFooter/LandingFooter';
import AppAppBar from '../../components/LandingNavBar/LandingNavBar';
import AppForm from '../../components/LandingAppForm/LandingAppForm';
import { email, required } from '../../components/LandingAppForm/validation';
import RFTextField from '../../components/LandingAppForm/RFTextField';
import FormButton from '../../components/LandingAppForm/FormButton';
import FormFeedback from '../../components/LandingAppForm/FormFeedback';

import { compose } from "redux"
import { connect } from "react-redux"
import { signIn } from "../../store/authActions"
import { Redirect } from "react-router-dom"


const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignIn extends React.Component {
  state = {
    sent: false,
  };

  static propTypes = {
    classes: PropTypes.object,
  };

  validate = values => {
    const errors = required(['email', 'password'], values, this.props);

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  handleSubmit = (e) => {
    console.log(e)
    this.props.signIn(e)
  };

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    const { authError, authStatus } = this.props
    if (authStatus) {
      return <Redirect to="/console/row-based-table/list-dataset" />
    }

    return (
      <React.Fragment>
        <AppAppBar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {'Not a member yet? '}
              <Link href="/sign-up" align="center" underline="always">
                Sign Up here
              </Link>
            </Typography>
          </React.Fragment>
          {authError}
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Sign In'}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="/forgot-password">
              Forgot password?
            </Link>
          </Typography>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  authError: state.authReducer.authError,
  authStatus: state.firebaseReducer.auth.uid
})

const mapDispatchToProps = dispatch => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}


export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SignIn);
