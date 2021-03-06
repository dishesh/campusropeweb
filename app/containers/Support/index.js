/**
 *
 * Support
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSupport from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Support extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Support</title>
          <meta name="description" content="Description of Support" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Support.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  support: makeSelectSupport(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'support', reducer });
const withSaga = injectSaga({ key: 'support', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Support);
