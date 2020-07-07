import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClients, saveClient, deleteClient } from '../../redux/clients/client.actions';
import { Link } from 'react-router-dom';


import { Table, Tag, Space } from 'antd';

import ClientCard from '../client-card/client-card.component';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Class',
        dataIndex: 'class',
        key: 'class',
    },
];

const data = [
    {
        class: '1',
        name: 'John Brown',
    },
    {
        class: '2',
        name: 'Jim Green',
    },
    {
        class: '3',
        name: 'Joe Black',
    },
];

class ClientForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            class: '',
            rows: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderClients = this.renderClients.bind(this);
        this.renderClientTable = this.renderClientTable.bind(this);
             
    }

    componentWillMount(){
        this.props.getClients()
    }

    componentWillReceiveProps(nextProps) {
        if (  this.props.clients !== nextProps.clients) {
            this.setState({
                rows: nextProps.clients,
            });
        }
        console.log(this.state.rows);
    }

    // handle change
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        const client = {
            name: this.state.name,
            class: this.state.class,
        };
        this.props.saveClient(client);
        this.setState({
            name: '',
            class: '',
        });
    }

    // render clients
    renderClients() {
        return _.map(this.props.clients, (client, key) => {
            return (
                <ClientCard key={key}>
                    <Link to={`/${key}`}>
                        <h2>{client.name}</h2>
                    </Link>
                    {client.uid === this.props.user.uid && (
                        <div>
                            <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteClient(key)}>
                                Delete
                                </button>
                            <button className="btn btn-info btn-xs pull-right">
                                <Link to={`/${key}/edit`}>Update</Link>
                            </button>
                        </div>
                    )}
                </ClientCard>
            );
        });
    }

    renderClientTable() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.rows} shouldCellUpdate/>
            </div>
        );
    }

    render() {
        return (
            <div className="col-sm-10">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            onChange={this.handleChange}
                            value={this.state.name}
                            type="text"
                            name="name"
                            className="form-control no-border"
                            placeholder="Client Name..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            onChange={this.handleChange}
                            value={this.state.class}
                            type="text"
                            name="class"
                            className="form-control no-border"
                            placeholder="class..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary col-sm-12">Save</button>
                    </div>
                </form>
                <div>
                    {
                        this.renderClientTable()
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        clients: state.client,
        user: state.user,
        rows: state.client
    };
}

export default connect(mapStateToProps, { getClients, saveClient, deleteClient })(ClientForm);