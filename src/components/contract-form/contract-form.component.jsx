import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClient, saveClient, deleteClient } from '../../redux/clients/client.actions';

import { Table, Tag, Space } from 'antd';

import './client-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import ClientTable from '../client-table/client-table.component';
import FileBase64 from 'react-file-base64';
import AddressFormAutocomplete from '../address-form-autocomplete/address-form-autocomplete.component';


class ClientForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemId: '',
            id: '',
            imageFile: [],
            name: '',
            priority: '',
            phone: '',
            formUpdating: false,
            address: {},
            completeAddress: '',
            columns: [
                {
                    title: 'Image',
                    dataIndex: 'image',
                    key: 'image',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: 'Actions',
                    dataIndex: 'btns',
                    key: 'btns',
                },
            ],
            rows: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getFiles(files) {
        this.setState({ imageFile: files })
        console.log(this.state.imageFile);
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
            value.image = <img src={value.imageFile} width="50" height="50" />
            value.address = <address>{value.address.address}</address>
            value.btns =
                <div className="row">
                    <button onClick={() => this.updateItem(value.id)}>Update</button>
                    <button onClick={() => this.deleteItem(value.id)}>Delete</button>
                    <Link to={`/client/${value.id}`}>View</Link>
                </div>;
            return value;
        }));

    mountingColumns = (obj) => _.keys(obj);

    componentWillReceiveProps = async (nextProps) => {
        console.log(nextProps);
        if (nextProps.idForUpdate) {
            const itemForUpdate = await this.props.getClient(nextProps.idForUpdate)
            console.log(itemForUpdate);
            await this.setState({
                formUpdating: true,
                itemId: itemForUpdate.id,
                imageFile: itemForUpdate.imageFile,
                id: itemForUpdate.id,
                name: itemForUpdate.name,
                priority: itemForUpdate.priority,
                phone: itemForUpdate.phone,
            });
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
            e.preventDefault();
            console.log(this.state.address);
            const client = {
                id: this.state.id,
                imageFile: this.state.imageFile.base64,
                name: this.state.name,
                priority: this.state.priority,
                phone: this.state.phone,
                address: this.state.address,
                completeAddress: `${this.state.address.streetAddress}, ${this.state.address.city}, ${this.state.address.zipcode}, ${this.state.address.state}`,
                createdBy: this.props.user.currentUser
            };
            console.log(client);
            if (this.state.formUpdating === false) {
                if(this.state.rows.length > 0) {
                    let listOfIds = []; 
                    for (let i = 0; i < this.state.rows.length; i++) {
                        listOfIds.push(this.state.rows[i].id);
                    }
                    let hasId = listOfIds.includes(client.id);
                    if (hasId === true) {
                        alert('ID Duplicado');
                    } else {
                        this.props.saveClient(client);
                    }
                } else {
                    this.props.saveClient(client);
                }
            } else {
                this.props.saveClient(client);
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
            imageFile: '',
            itemId: '',
            name: '',
            priority: '',
            phone: '',
        });
    }

    deleteItem = (id) => {
        this.props.deleteClient(id);
    }

    handleAddress = (address) => {
        this.setState({
            address: address,
            completeAddress: `${address.streetAddress}, ${address.city}, ${address.zipcode}, ${address.state}`
        });
        console.log(this.state.address);
    }

    render() {
        return (
            <div>
                <div className="row wrap-form">
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
                                    name='id'
                                    type='text'
                                    handleChange={this.handleChange}
                                    value={this.state.id}
                                    label='id'
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <FileBase64
                                    multiple={false}
                                    onDone={this.getFiles.bind(this)}
                                />
                            </div>

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

                            <AddressFormAutocomplete
                                google={this.props.google}
                                center={{ lat: 18.5204, lng: 73.8567 }}
                                height='100px'
                                zoom={15}
                                onSelectAddress={this.handleAddress}
                            />

                            <div className="form-group">

                                {this.state.formUpdating === false ? (
                                    <button className="formButton">Save</button>) : (
                                        <button className="formButton">Update</button>)
                                }
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        clients: state.client,
        user: state.user,
        rows: state.client
    };
}

export default connect(mapStateToProps, { getClient, saveClient, deleteClient })(ClientForm);