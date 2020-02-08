import React, { Component } from 'react';
import { ChatPreviewerView } from './ChatPreviewerView';
//TODO: see what methods are needed
import {getChatsOnChannel, postChatMessage} from "../../api/ChatFetchAPI";

export class ChatPreviewerContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			chatMessages: [
				{	
					channelId: "mychannel",
					receiver: "5e35c1701dc6010fac896bd9",
					sender: "5e39f3a30900f80b4ecde437",
					message: "hello",
					messageDateTime: "2020-02-10 10:00:00"
				},
                {
					channelId: "mychannel",
					receiver: "5e39f3a30900f80b4ecde437",
					sender: "5e35c1701dc6010fac896bd9",
					message: "Hello to you too",
					messageDateTime: "2020-02-10 10:00:05"
				}
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
			chatMessages: this.state.chatMessages.concat([chat]),
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
			sender : this.props.loggedIn.id,
			receiver : "5e35c1701dc6010fac896bd9",
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