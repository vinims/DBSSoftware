import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getContracts , deleteContract , getContractsByArrayOfIds } from '../../redux/contracts/contract.actions';
import { getClient } from '../../redux/clients/client.actions';


class ContractsListCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            client: {},
            contracts: {
                contractName: '',
                id: ''
            }
        };
    }

    componentWillMount = async () => {
        this.props.getContracts()
        console.log(this.props.clientId)
        const clientReturned = await this.props.getClient(`${this.props.clientId}`)
        this.setState({
            client: clientReturned
        })
        const contractsOfThisClient = await this.props.getContractsByArrayOfIds(this.state.client.contracts)
        console.log(contractsOfThisClient)
        this.setState({ 
            contracts: contractsOfThisClient
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    deleteItem = (id) => {
        this.props.deleteContract(id);
        this.props.getClients()
    }

    render() {
       return _.map(this.state.contracts, (contract, key) => {    
            return (     
            <div key={key}> 
                <h2>{contract.contractName}</h2>
                <Link to={`/contract/${contract.id}`}>View</Link>
            </div>
        );
    });
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

export default connect(mapStateToProps, { getContracts , deleteContract , getContractsByArrayOfIds , getClient })(ContractsListCards);