import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getContract } from '../../redux/contracts/contract.actions';

import './contract-profile.styles.scss';

class ContractProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contractData: {
                address: {}
            },
        };
    }

    componentWillMount= async() => {
       const contractDataRetrieved = await this.props.getContract("UjpHispXKYMbwyMatRnU")
        this.setState({ contractData: contractDataRetrieved }
        , () => {
            console.log(this.state.contractData)
        }
        )
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-4 profile-img-wrap">
                    <div className="profile-img">
                        <img src={this.state.contractData.imageFile} />
                    </div>
                </div>
                <div className="col-sm-8">
                    <small>{this.state.contractData.id}</small>
                    <h2>Name: {this.state.contractData.name}</h2>
                    <p>{this.state.contractData.phone}</p>
                    <p>{this.state.contractData.email}</p>
                    <p>{this.state.contractData.address.completeAddress}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getContract })(ContractProfile);