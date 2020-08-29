import React from 'react';

import ContractProfile from '../../components/contract-profile/contract-profile.component';
import InteractionsListCards from '../../components/interaction-list/interaction-list.component';

// import './contracts-page.styles.scss';

const ContractPage = ({ contract }) => {
  return (<div>
    <div className="row">
      <div className="col-sm-4 wrap-form">
        <ContractProfile contractId={contract} />
      </div>
      <div className="col-sm-8">
        <InteractionsListCards />
      </div>
    </div>
  </div>)
}

export default ContractPage;