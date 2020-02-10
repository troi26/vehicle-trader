import React from 'react';
import { Table } from "reactstrap";
import Button from "reactstrap/es/Button";

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
                    {props.loggedIn.roles === "ROLE_ADMIN" &&
                        <th>Options</th>
                    }
                    { props.chatEn &&
                        <th>Chat</th>
                    }
                    <th>Profile</th>
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
                        { props.loggedIn.roles === "ROLE_ADMIN" &&
                            <td>
                                { !user.active &&
                                <Button color="success"
                                    onClick={() => props.onActivateAccount(user.id)}
                                >Activate</Button>
                                }
                                { user.active &&
                                <Button color="danger"
                                    onClick={() => props.onDeactivateAccount(user.id)}
                                >Deactivate</Button>

                                }
                            </td>
                        }
                        { props.chatEn &&
                            <td>
                                <Button color="primary"
                                    onClick={() => props.onChatOpenClick(user.id)}
                            >Open</Button>
                            </td>
                        }
                        <td><Button color="primary"
                                    onClick={() => props.onOpenUserProfile(user.id)}
                        >View</Button></td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
};