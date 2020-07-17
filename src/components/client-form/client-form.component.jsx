import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClients, saveClient, deleteClient, editClient } from '../../redux/clients/client.actions';

import { Table, Tag, Space } from 'antd';

import './client-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

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
            value.btns =
                <div className="row">
                    <button onClick={() => this.updateItem(key)}>Update</button>
                    <button onClick={() => this.props.deleteClient(key)}>Delete</button>
                </div>;
            return value;
        }));

    mountingColumns = (obj) => _.keys(
        _.mapKeys(obj, (value, key) => {
            value.title = `'` + key + `'`;
            value.dataIndex = `'` + key + `'`;
            value.key = `'` + key + `'`;
            console.log(value);
            return value
        }));

    componentWillReceiveProps(nextProps) {
        
        if (this.props.clients !== nextProps.clients) {
            this.setState({
                rows: this.toArrayWithKey(nextProps.clients),
            });
            let test = this.mountingColumns(this.state.rows)
            console.log(test);

        }
    }

    // handle change
    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    // handle submit
    handleSubmit(id) {
        return e => {
            console.log(e);
            e.preventDefault();
            const client = {
                name: this.state.name,
                class: this.state.class,
            };
            if (this.state.formUpdating === false) {
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
        let itemForUpdate = this.state.rows.find(element => element.id === id);
        this.setState({
            formUpdating: true,
            itemId: itemForUpdate.id,
            name: itemForUpdate.name,
            class: itemForUpdate.class,
        });

        console.log(this.state.rows.find(element => element.id === id));
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
            <div>
                <div className="row">
                    <div className="col-lg-4 wrap-form">
                        <div className="wrap-top-btn">
                        {this.state.formUpdating === false ? (
                            <button className="btn" disabled>IN ADD MODE </button>
                        ) : (
                                <button onClick={this.addMode}> ADD MODE </button>
                            )}
</div>
                        <form className="form" onSubmit={this.handleSubmit(this.state.itemId)}>

                            <div className="form-group wrap-input">
                                <FormInput
                                    name='name'
                                    type='text'
                                    handleChange={this.handleChange}
                                    value={this.state.name}
                                    label='name'
                                    required
                                />
                            </div>

                            <div className="wrap-input wrap-input">
                                <FormInput
                                    name='class'
                                    type='text'
                                    handleChange={this.handleChange}
                                    value={this.state.class}
                                    label='class'
                                    required
                                />
                            </div>

                            <div className="form-group">

                                {this.state.formUpdating === false ? (
                                    <button className="formButton">Save</button>) : (
                                        <button className="formButton">Update</button>)
                                }
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-8">
                        {
                            this.renderClientTable()
                        }
                    </div>
                </div >
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

export default connect(mapStateToProps, { getClients, saveClient, deleteClient, editClient })(ClientForm);