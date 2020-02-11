import React, { Component } from 'react';
import { ChatPreviewerView } from './ChatPreviewerView';
//TODO: see what methods are needed
import {getChatsOnChannel, getChatsOnChannelIds, postChatMessage} from "../../api/ChatFetchAPI";
import "../../css/chat.css";
import "../../css/forum.css";
import {getUserById} from "../../api/UsersFetchAPI";

const DEFAULT_MSG = {
	author: 'me',
	type: 'text',
	data: {
		text: 'ME some text'
	}
};

const DEFAULT_RCV_MSG = {
	author: 'them',
	type: 'text',
	data: {
		text: 'THEM some text'
	}
};

export class ChatPreviewerContainer extends Component {

	constructor (props) {
		super(props);

		this.state = {
			messageList: [

			],
			receiverId: "5e4147ac51f6c063ce31b1cb",
			receiver: null,
		};

		this.eventSource = null;
    }

	receiverSuccessfulLoaded (receiver) {
		console.log("RECEIVER: ", receiver);
		this.setState({
			receiver: {
				...receiver,
			}
		}, () =>
			this.startEventListener())
	}

    processError (errors) {
		console.log(errors);
		// this.props.goBackWithError();
	}

    loadReceiver () {
		getUserById(this.props.tabProps.chatReceiverId)
			.then(r => r.status === 200
				? r.json().then(this.receiverSuccessfulLoaded.bind(this))
				: r.json().then(this.processError.bind(this)))
			.catch(reason => console.log(reason));
	}

    componentDidMount() {
		console.log("componentDidMount");
		this.loadReceiver();

		// setTimeout(this.addNewChatToState, 3000);
		// setTimeout(this.addNewChatToState, 10000);
	}

    addNewMsgToState (msg) {
		let message;
		if (msg.senderId === this.props.loggedIn.id) {
			message = {
				...msg,
				...DEFAULT_MSG,
				data: {
					text: msg.message,
				},
			};
		} else {
			message = {
				...msg,
				...DEFAULT_RCV_MSG,
				data: {
					text: msg.message,
				},
			};
		}
		this.setState({
			messageList: this.state.messageList.concat([message]),
		});
    }
    
    startEventListener () {
		if(typeof(EventSource) !== "undefined") {
			if (this.eventSource === null) {
				this.eventSource = getChatsOnChannelIds(
					this.props.loggedIn.id,
					this.props.tabProps.chatReceiverId
				);
				this.eventSource.onmessage = (event) => {
					const newData = JSON.parse(event.data);
					console.log("chat response: " + newData);
					this.addNewMsgToState(newData);
				};
			}
		} else {
			console.log("EventSource not enabled");
		}
	}

	errorSendHandler (errors) {
		console.log("ERRORS SEND: ", errors);
	}

	successSendHandler (msg) {
		console.log("SUCCESS: ", msg);
	}

	handleSend (msg) {
		// event.preventDefault();

		const jsonData = {
			message : msg.data.text,
			channelId : "dummy", // Its replaced on server but required field.
			senderId : this.props.loggedIn.id,
			senderUsername : this.props.loggedIn.username,
			receiverId : this.props.tabProps.chatReceiverId,
			messageDateTime : new Date()
		};

		postChatMessage(jsonData)
			.then(r => r.status !== 200
				? r.json().then(this.errorSendHandler.bind(this))
				: r.json().then(this.successSendHandler.bind(this)))
			.catch(reason => console.log(reason));
	}

	handleNewUserMessage (msg) {
		console.log(msg);
		this.handleSend(msg);
	}

	render() {
		return (
			<ChatPreviewerView
				{...this.state}
				{...this.props}

				handleSend={this.handleSend.bind(this)}
			   	onMessageWasSent={this.handleNewUserMessage.bind(this)}
			/>
		);
	}
}

ChatPreviewerContainer.defaultProps = {
};