import React from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react'
import firebase from '../../firebase'
import { connect } from 'react-redux'

class UserPanel extends React.Component {

    dropdownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>{this.props.currentUser.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ]

    handleSignout = () => {
        firebase.auth().signOut()
            .then(() => console.log("signout"))
    }

    render() {
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                    </Grid.Row>

                    <Header style={{ padding: '1.2em' }} as="h4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image avatar spaced="right" src={this.props.currentUser.photoURL} />
                                {this.props.currentUser.displayName}
                            </span>
                        } options={this.dropdownOptions()} />
                    </Header>

                </Grid.Column>
            </Grid>
        )
    }
}


export default UserPanel