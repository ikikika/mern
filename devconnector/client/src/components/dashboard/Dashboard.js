import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {

  componentDidMount(){
    this.props.getCurrentProfile();
  }

  render() {

    //need to make sure that profile state != null before rendering anything
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if( profile === null || loading ){
      dashboardContent = <Spinner />
    } else {
      dashboardContent = <h1>Hello</h1>
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
                Dashboard
              </h1>
              { dashboardContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
