import React from 'react'
import firebase from '../../firebase'
import { Button, Segment, Input } from 'semantic-ui-react'

class MessageForm extends React.Component {
    state = {
        message: '',
        loading: false,
        errors: []
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    createMessage = () => {
        const message = {
            content: this.state.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL
            }
        }
        return message
    }

    sendMessage = () => {
        const { messagesRef } = this.props

        if (this.state.message) {
            this.setState({ loading: true })
            messagesRef
                .child(this.props.currentChannel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: [] })
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    })
                })
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message' })
            })
        }
    }

    render() {
        const { errors } = this.state

        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    value={this.state.message}
                    style={{ marginBottom: '0.7em' }}
                    label={<Button icon={'add'} />}
                    placeholder="Write your message"
                    labelPosition="left"
                    onChange={this.handleChange}
                    className={
                        errors.some(error => error.message.includes('message')) ? 'error' : ''
                    }
                />
                <Button.Group>
                    <Button
                        onClick={this.sendMessage}
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                    />
                    <Button
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>
            </Segment>
        )
    }
}

export default MessageForm