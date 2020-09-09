import React from 'react';

import ClientProfile from '../../components/client-profile/client-profile.component';
import ContractsListCards from '../../components/contract-list-cards/contract-list-cards.component';

import './clients-page.styles.scss';

const ClientPage = ({ client }) => {
  return (<div>
    <div className="row">
      <div className="col-12 wrap-form">
        <ClientProfile clientId={client} />
      </div>
      <div className="col-12 client-childData-wrap">
        <ContractsListCards clientId={client} />
      </div>
    </div>
  </div>)
}

export default ClientPage;