import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getClients, saveClient, deleteClient } from '../../redux/clients/client.actions';

import ClientForm from '../client-form/client-form.component';
import ClientTable from '../client-table/client-table.component';

import ReactModal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

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
        await this.setState({ idForUpdate: id } , () => {
            this.handleOpenModal()
        })
        
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
                    <div>
                    {
                        this.renderClientForm()
                    }
                    </div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                        {
                            this.renderClientTable()
                        }
                </div >
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                    {
                        this.renderClientForm()
                    }
                </ReactModal>
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