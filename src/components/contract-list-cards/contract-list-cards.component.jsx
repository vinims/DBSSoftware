import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getContracts , deleteContract } from '../../redux/contracts/contract.actions';

class ContractsListCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    title: 'Image',
                    dataIndex: 'image',
                    key: 'image',
                },
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
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
    }

    componentWillMount() {
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
                    <button onClick={() => this.props.updateItem(value.id)}>Update</button>
                    <button onClick={() => this.deleteItem(value.id)}>Delete</button>
                    <Link to={`/client/${value.id}`}>View</Link>
                </div>;
            return value;
        }));

    componentWillReceiveProps(nextProps) {
        if (this.props.clients !== nextProps.clients) {
            let arrayForRows = this.toArrayWithKey(nextProps.clients)
            console.log(arrayForRows);
            this.setState({
                rows: arrayForRows,
            });
        }
    }

    deleteItem = (id) => {
        this.props.deleteContract(id);
        this.props.getClients()
    }

    render() {
        return (            
            <div>
                teste
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        contracts: state.contract,
        clients: state.client,
        user: state.user,
        rows: state.client
    };
}

export default connect(mapStateToProps, { getContracts , deleteContract })(ContractsListCards);