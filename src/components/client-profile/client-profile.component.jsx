import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClient } from '../../redux/clients/client.actions';

import './client-profile.styles.scss';

class ClientProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientData: {
                address: {}
            },
        };
    }

    componentWillMount= async() => {
       const clientDataRetrieved = await this.props.getClient(this.props.clientId)
        this.setState({ clientData: clientDataRetrieved }
        , () => {
            console.log(this.state.clientData)
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
                        <img src={this.state.clientData.imageFile} />
                    </div>
                </div>
                <div className="col-sm-8">
                    <small>{this.state.clientData.id}</small>
                    <h2>Name: {this.state.clientData.name}</h2>
                    <p>{this.state.clientData.phone}</p>
                    <p>{this.state.clientData.email}</p>
                    <p>{this.state.clientData.address.completeAddress}</p>
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

export default connect(mapStateToProps, { getClient })(ClientProfile);