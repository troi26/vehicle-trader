import React from 'react';
import { Table } from "reactstrap";

export const UsersPreviewerView = (props) => {
    console.log(props.users);

    return (
        <div
            style={props.style}
        >

            <Table striped>
                <caption>Users</caption>
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                { props.users.map((user, idx) =>
                    <tr
                        key={`user-row-${user.id}`}
                    >
                        <th scope="row">{idx + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
        /*<div style={props.style}>
            {props.users.map(user =>
                <div
                    key={`bid-${user.username}`}
                >{user.name} {user.surname}</div>)
            }
        </div>*/
    );
};