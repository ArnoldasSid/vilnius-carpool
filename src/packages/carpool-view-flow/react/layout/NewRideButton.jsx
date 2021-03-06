import React from 'react'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import {FlowHelpers} from '../../flowHelpers'

export default class newRideButton extends React.Component {
  render () {
    return (
      <FloatingActionButton data-cucumber="addTrip" primary style={{
          position: 'fixed',
          right: this.props.sideOffset + 12,
          bottom: this.props.isMobile ? 75 : 100,
        }}
        onClick={() => FlowHelpers.goExtendedQuery('NewRide')}
      >
        <ContentAdd />
      </FloatingActionButton>
    )
  }
}
