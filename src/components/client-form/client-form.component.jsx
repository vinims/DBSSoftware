import React from 'react';
import { Link } from 'react-router-dom';

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
            priority: '',
            phone: '',
            formUpdating: false,
            columns: [],
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
                    <Link to={`/client/${key}`}>View</Link>
                </div>;
            return value;
        }));

    mountingColumns = (obj) => _.keys(obj);

    componentWillReceiveProps(nextProps) {
        if (this.props.clients !== nextProps.clients) {
            let arrayForRows = this.toArrayWithKey(nextProps.clients)
        if (arrayForRows = this.toArrayWithKey(nextProps.clients)) {
            let arrayForCols = this.mountingColumns(arrayForRows[0]);
            let cols = [];
            for (var i = 0; i < arrayForCols.length; i++) {
                cols.push(
                    {
                        title: arrayForCols[i],
                        dataIndex: arrayForCols[i],
                        key: arrayForCols[i],
                    },
                )
              }
              this.setState({
                  columns: cols,
                  rows: arrayForRows,
              });
        }
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
                priority: this.state.priority,
                phone: this.state.phone,
            };
            if (this.state.formUpdating === false) {
                this.props.saveClient(client);
            } else {
                this.props.editClient(id, client);
            }
            this.setState({
                name: '',
                priority: '',
                phone: '',
            });
        }
    }

    addMode = () => {
        this.setState({
            formUpdating: false,
            itemId: '',
            name: '',
            priority: '',
            phone: '',
        });
    }

    updateItem = (id) => {
        let itemForUpdate = this.state.rows.find(element => element.id === id);
        this.setState({
            formUpdating: true,
            itemId: itemForUpdate.id,
            name: itemForUpdate.name,
            priority: itemForUpdate.priority,
            phone: itemForUpdate.phone,
        });
        console.log(this.state.rows.find(element => element.id === id));
    }

    // render clients
    renderClientTable() {
        return (
            <div>
                <Table key="id" columns={this.state.columns} dataSource={this.state.rows} />
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

                            <div className="form-group">
                                <FormInput
                                    name='name'
                                    type='text'
                                    handleChange={this.handleChange}
                                    value={this.state.name}
                                    label='name'
                                    required
                                />
                            </div>

                            <div className="wrap-input">
                                <FormInput
                                    name='priority'
                                    type='select'
                                    handleChange={this.handleChange}
                                    value={this.state.priority}
                                    label='priority'
                                    options={["A", "B", "C"]}
                                    required
                                />
                            </div>

                            <div className="wrap-input">
                                <FormInput
                                    name='phone'
                                    type='tel'
                                    handleChange={this.handleChange}
                                    value={this.state.phone}
                                    label='Phone Number'
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