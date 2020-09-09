import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClients, saveClient, deleteClient } from '../../redux/clients/client.actions';

import ClientForm from '../client-form/client-form.component';
import ClientTable from '../client-table/client-table.component';

import { Button , Modal } from 'react-bootstrap';

class ClientsPageWrap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idForUpdate: null,
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }


    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    updateItem = async (id) => {

        await this.setState({
            idForUpdate: id
        })
        this.handleOpenModal()
        console.log(this.state.idForUpdate)
    }

    renderClientForm() {
        return (
            <div>
                <ClientForm idForUpdate={this.state.idForUpdate} />
            </div>
        );
    }

    // render clients
    renderClientTable() {
        return (
            <div>
                <ClientTable updateItem={this.updateItem} />
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Button variant="primary" onClick={this.handleOpenModal}>
                        Launch static backdrop modal
                    </Button>
                    <ClientTable updateItem={this.updateItem} />
                </div >

                <Modal
                    show={this.state.showModal}
                    onHide={this.handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                    {
                        this.renderClientForm()
                    }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                    </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>

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

export default connect(mapStateToProps, { getClients, saveClient, deleteClient })(ClientsPageWrap);