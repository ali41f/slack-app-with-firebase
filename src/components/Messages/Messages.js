import React from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import firebase from "../../firebase"

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref("messages")
    }
    render() {
        const { messagesRef } = this.state

        return (
            <React.Fragment>
                <MessageHeader />

                <Segment>
                    <Comment.Group className="messages">

                    </Comment.Group>
                </Segment>

                <MessageForm
                    messagesRef={messagesRef}
                    currentChannel={this.props.currentChannel}
                    currentUser={this.props.currentUser}
                />
            </React.Fragment>
        )
    }
}

export default Messages