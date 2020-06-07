import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';
import { connect } from 'react-redux'

import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'

class App extends Component {
  render() {
    return (
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>

        <ColorPanel />
        <SidePanel
          key={this.props.currentChannel && this.props.currentChannel.id}
          currentUser={this.props.currentUser}

        />

        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages
            key={this.props.currentChannel && this.props.currentChannel.id}
            currentChannel={this.props.currentChannel}
            currentUser={this.props.currentUser}
          />
        </Grid.Column>

        <Grid.Column style={{ width: 4 }}>
          <MetaPanel />
        </Grid.Column>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(App);
