import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClients, saveClient, deleteClient, editClient } from '../../redux/clients/client.actions';

import { Table, Tag, Space } from 'antd';

class ClientForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemId: '',
            name: '',
            class: '',
            formUpdating: false,
            columns: [
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
                {
                    title: 'Edit',
                    dataIndex: 'btns',
                    key: 'btns',
                },
            ],
            rows: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderClientTable = this.renderClientTable.bind(this);

    }

    componentWillMount() {
        this.props.getClients()
    }


    snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };

    toArrayWithKey = (obj) => _.values(
        _.mapValues(obj, (value, key) => { 
            value.id = key; 
            value.btns = <button onClick={() => this.updateItem(key)}>Update</button>; 
            return value; 
        }));

    mountingColumns = (obj) => _.values(_.mapValues(obj, (value, key) => { value.id = key; return value; }));

    componentWillReceiveProps(nextProps) {
        if (this.props.clients !== nextProps.clients) {

            this.setState({
                rows: this.toArrayWithKey(nextProps.clients),
            });
        }
        console.log(nextProps.clients);
        console.log(this.state.rows);
    }

    // handle change
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // handle submit
    handleSubmit(id) {
        return e => {
        console.log(e);
        e.preventDefault();
        const client = {
            name: this.state.name,
            class: this.state.class,
        };
        if(this.state.formUpdating === false) {
        this.props.saveClient(client);
        } else {
        this.props.editClient(id, client);            
        }
        this.setState({
            name: '',
            class: '',
        });
    }
    }

    addMode = () => {
        this.setState({
            formUpdating: false,
            itemId: '',
            name: '',
            class: '',
        });
    }

    updateItem = (id) => {
        let itemForUpdate = this.state.rows.find(element => element.id === id );
        this.setState({
            formUpdating: true,
            itemId: itemForUpdate.id,
            name: itemForUpdate.name,
            class: itemForUpdate.class,
        });

        console.log(this.state.rows.find(element => element.id === id ));
    }

    // render clients
    renderClientTable() {
        return (
            <div>
                <Table columns={this.state.columns} dataSource={this.state.rows} key='name' shouldCellUpdate />
            </div>
        );
    }

    render() {
        return (
            <div className="col-sm-10">

                {this.state.formUpdating === false ? (
                    <button>IN ADD MODE </button>
                ) : (
                        <button onClick={this.addMode}> ADD MODE </button>
                    )}

                <form onSubmit={this.handleSubmit(this.state.itemId)}>
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

                        {this.state.formUpdating === false ? (
                            <button className="btn btn-primary col-sm-12">Save</button>) : (
                                <button className="btn btn-primary col-sm-12">Update</button>)
                            }
                    </div>
                </form>

            <div>
                {
                    this.renderClientTable()
                }
            </div>
            </div >
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

export default connect(mapStateToProps, { getClients, saveClient, deleteClient, editClient })(ClientForm);