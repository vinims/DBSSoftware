import React from 'react';

import ClientProfile from '../../components/client-profile/client-profile.component';
import ContractsListCards from '../../components/contract-list-cards/contract-list-cards.component';

const ClientPage = ({ client }) => {
  return (<div>
    <div className="row">
      <div className="col-lg-4 wrap-form">
        <ClientProfile clientId={client} />
      </div>
      <div>
        <ContractsListCards />
      </div>
    </div>
  </div>)
}

export default ClientPage;