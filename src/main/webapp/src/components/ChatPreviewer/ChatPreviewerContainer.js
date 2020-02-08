import React, { Component } from 'react';
import { ChatPreviewerView } from './ChatPreviewerView';
//TODO: see what methods are needed
import {getChatsOnChannel, postChatMessage} from "../../api/ChatFetchAPI";

export class ChatPreviewerContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			chatMessages: [
                {message: "hello"},
                {message: "hllo to you too"}
            ],
		};

		this.eventSource = null;
    }
    

    componentDidMount() {
		console.log("componentDidMount");
		this.startEventListener();

		// setTimeout(this.addNewChatToState, 3000);
		// setTimeout(this.addNewChatToState, 10000);
	}

    addNewChatToState (chat) {
		this.setState({
			chatMessages: this.state.chatMessages.concat([{message: chat.message}]),
		});
    }
    
    startEventListener () {
		if(typeof(EventSource) !== "undefined") {
			if (this.eventSource === null) {
				this.eventSource = getChatsOnChannel("mychat");
				this.eventSource.onmessage = (event) => {
					const newData = JSON.parse(event.data);
					console.log("chat response: " + newData);
					this.addNewChatToState(newData);
				};
			}
		} else {
			console.log("EventSource not enabled");
		}
	}

	handleSend (event){
		event.preventDefault();

		const jsonData = {
			message : event.target.elements[0].value,
			channelId : "mychat",
			sender : "5e3d604c2ff016165bb3ca6c",
			receiver : "5e3842f2cfd1e30e970d9d9d",
			messageDateTime : new Date()
		}
		postChatMessage(jsonData);
		console.log(event.target.elements[0].value)
		console.log("sending");
	}
	render() {
		return (
			<ChatPreviewerView {...this.state}
							   {...this.props}
				handleSend = {this.handleSend.bind(this)}
			/>
		);
	}
}

ChatPreviewerContainer.defaultProps = {
};