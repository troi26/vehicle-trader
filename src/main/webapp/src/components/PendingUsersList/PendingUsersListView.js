import React from 'react';
import { Table } from "reactstrap";
import Button from "reactstrap/es/Button";

export const PendingUsersListView = (props) => {
    console.log(props.accounts);

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
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                { props.accounts.map((acc, idx) =>
                    <tr
                        key={`user-row-${acc.id}`}
                    >
                        <th scope="row">{idx + 1}</th>
                        <td>{acc.name}</td>
                        <td>{acc.surname}</td>
                        <td>{acc.username}</td>
                        <td>{acc.email}</td>
                        <td>
                            <Button color="success"
                                onClick={() => props.onActivateAccount(acc.id)}
                            >Activate</Button>
                        </td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
};