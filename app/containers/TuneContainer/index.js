/**
 *
 * TuneContainer
 *
 */

import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage as T } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { useInjectSaga } from '@utils/injectSaga'
import makeSelectTuneContainer from './selectors'
import saga from './saga'

export function TuneContainer() {
  useInjectSaga({ key: 'tuneContainer', saga })

  return (
    <div>
    <T id={'TuneContainer'} />
    </div>
  )
}

TuneContainer.propTypes = {
}

const mapStateToProps = createStructuredSelector({
  tuneContainer: makeSelectTuneContainer(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  memo,
)(TuneContainer)

export const TuneContainerTest = compose(injectIntl)(TuneContainer)