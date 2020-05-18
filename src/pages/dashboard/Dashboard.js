import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './Dashboard.module.scss';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

 

  render() {
    return (
      <section className={s.root}>
        <h1 className="page-title mb-lg">Maps</h1>

      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Dashboard);
