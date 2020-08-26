import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { getSystemConfigs } from '../../redux/systemConfig/systemConfig.actions';
import { saveCompany } from '../../redux/companies/company.actions';

import FormInput from '../../components/form-input/form-input.component';

class InitialConfigPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                companyType: [],
                companyTypePicked: '',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getSystemConfigs()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.systemConfigs !== nextProps.systemConfigs) {
                this.setState({
                    companyType: nextProps.systemConfigs[0],
                });
        }
    }

    // handle change
    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
        console.log(event.target);
    };


    // handle submit
    handleSubmit(id) {
        return e => {
            console.log(e);
            e.preventDefault();
            const companyTypePicked = {
                companyType: this.state.companyTypePicked,
            };
            console.log(companyTypePicked);
                this.props.saveCompany(companyTypePicked);
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-4 wrap-form">
                        <form className="form" onSubmit={this.handleSubmit(this.state.itemId)}>
                        {
                            _.map(this.state.companyType, (companyType, key) => {
                                return (
                            <div className="" key={key}>
                                <h2>{companyType.Title}</h2>
                                <img src={companyType.Image} width="200" height="200" />
                                <FormInput
                                    name='companyTypePicked'
                                    type='radio'
                                    handleChange={this.handleChange}
                                    value={companyType.Title}
                                    label='companyTypePicked'
                                    required
                                />
                            </div>
                                );
                            })
                        }
                            <div className="form-group">

                                {this.state.formUpdating === false ? (
                                    <button className="formButton">Save</button>) : (
                                        <button className="formButton">Update</button>)
                                }
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        systemConfigs: state.systemConfigs,
    };
}

export default connect(mapStateToProps, { getSystemConfigs , saveCompany })(InitialConfigPage);