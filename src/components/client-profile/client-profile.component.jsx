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
            clientData: {},
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
            <div>
                <p>Name: {this.state.clientData.name}</p>
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