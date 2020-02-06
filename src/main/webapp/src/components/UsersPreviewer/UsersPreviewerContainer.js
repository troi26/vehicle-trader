import React, { Component } from 'react';

import { UsersPreviewerView } from './UsersPreviewerView';
import { getAllUsers } from '../../api/UsersFetchAPI';

export class UsersPreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: [],
        };

        this.interval = null;
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            getAllUsers()
                .then((response) => {
                    return response.json();
                }).then((response) => {
                    console.log(response);
                    this.setState({
                        users: response,
                    });
                })
                .catch((reason) => {
                    console.log(reason);
                });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        return (
            <UsersPreviewerView
                {...this.state}
               style={{
                   ...this.props.style,
               }}
            />
        );

    }
}

UsersPreviewerContainer.defaultProps = {
};