import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getInteractions , deleteInteraction } from '../../redux/interactions/interaction.actions';
import { getClient } from '../../redux/clients/client.actions';


class InteractionsListCards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount = async () => {
        this.props.getInteractions()
        // const clientReturned = this.props.getInteraction(`${this.props.id}`)
        // await this.setState({
        //     client: clientReturned
        // })
    }

    componentWillReceiveProps(nextProps) {
    }

    deleteItem = (id) => {
        // this.props.deleteInteraction(id);
        this.props.getClients()
    }

    render() {
       return _.map(this.props.interactions, (interaction, key) => {    
            return (     
            <div key={key}> 
                <h2>{interaction.id}</h2>
                <Link to={`/interaction/${interaction.id}`}>View</Link>
            </div>
        );
    });
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        interactions: state.interaction,
        clients: state.client,
        user: state.user,
        rows: state.client
    };
}

export default connect(mapStateToProps, { getInteractions , deleteInteraction , getClient })(InteractionsListCards);