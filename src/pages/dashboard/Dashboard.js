import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import s from './Dashboard.module.scss';
import {
  Card,
  CardImg,
  CardTitle,
  CardColumns,
  CardBody,
  Row,
  Container,
  Col
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import CreateMap from './CreateMap';
import mapImage from "../../images/map_placeholder.png";
import cx from "classnames";
import {
  fetchMaps,
  getTagNames,
  createMap,
  clearDashboardState,
  deleteMapById,
  shareMap
} from "../../actions/dashboard";
import { fetchUsers } from "../../actions/user";
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import * as dashboardConst from '../../constants';
import DeleteMap from './DeleteMap';
import ShareMap from "./ShareMap";


class Dashboard extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string
  };

  static defaultProps = {
    isFetching: false,
    isError: false,
    errorMessage: null
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      currentPage: dashboardConst.CURRENT_PAGE_COUNT,
      isShareModalOpen: false,
      activeShareMapData: {}
    };
  }

  componentDidMount() {
    this.props.dispatch(getTagNames());

    this.fetchMapList({
      pageNo: this.state.currentPage,
      limit: dashboardConst.PAGE_MAP_LIMIT
    });

    this.props.dispatch(fetchUsers());
  }

  fetchMapList = PaginationParam => {
    const { pageNo, limit } = PaginationParam;
    this.setState({ currentPage: pageNo });
    this.props.dispatch(
      fetchMaps({
        pageNo: pageNo,
        limit: limit
      })
    );
  };

  shareModalToggle = (data) => {
    
    const { userIds, name } = data;
    const { userList } = this.props;
    let selectedOptions = [];
    userList.map((item)=>{
      if (userIds.indexOf(item._id) !== -1)
        selectedOptions.push({
        label: `${item.name} (${item.email})`,
        value: item._id,
        key: item._id
      });
      return true;
    });
    const activeShareMapData = { id: data._id, name, selectedOptions};
    this.setState((prevState, props) => {
      return {
        isShareModalOpen: !prevState.isShareModalOpen,
        activeShareMapData
      };
    });
  }

  handleCreateMap = formData => {
    this.props.dispatch(createMap(formData));
  };

  handleShareMap = formData => {
    this.props.dispatch(shareMap(formData));
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onModalClose = () => {
    if (this.props.mapCreateStatus || this.props.mapShareStatus)
      this.fetchMapList({
        pageNo: this.state.currentPage,
        limit: dashboardConst.PAGE_MAP_LIMIT
      });
    this.setState({ isShareModalOpen: false });
    this.props.dispatch(clearDashboardState());
  };

  // viewMap Route --> this.props.history.push(`/viewMap/${id}`);

  handleCardAction = ({ id, action }) => {
    if (action === "edit") this.props.history.push(`/map/${id}`);
    if (action === "view") this.props.history.push(`/viewMap/${id}`);
  };

  deleteConfirm = mapId => {
    toast(
      <DeleteMap
        mapId={mapId}
        deleteMap={this.deleteMap}
        cancelDelete={this.cancelDelete}
      />,
      {
        autoClose: 7000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        toastId: mapId,
        position: "top-center"
      }
    );
  };

  deleteMap = mapId => {
    this.props.dispatch(deleteMapById({ mapId }))
  }

  cancelDelete = id =>
    toast.update(id, {
      render: "Deletion Cancelled",
      type: toast.TYPE.SUCCESS,
      closeOnClick: true,
      autoClose: 1000
    });

  render() {
    const {
      isFetching,
      mapList,
      tagNames,
      totalMapCount,
      userList
    } = this.props;

    const mapListComp = mapList.map(item => {
      return (
        <Card key={item._id}>
          <i
            className={cx(
              s.alignEnd,
              "glyphicon glyphicon-folder-close text-success mt-sm mr-sm float-right"
            )}
          />
          <a href={`/viewmap/${item._id}`} target="_blank" title="View Map">
            <CardImg top width="100%" src={mapImage} alt="Card image cap" />
          </a>
          <CardBody>
            <CardTitle className="fw-semi-bold">{item.name}</CardTitle>
            <div className={s.actionIcons}>
              <div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none"
                  }}
                  onClick={() => this.deleteConfirm(item._id)}
                >
                  <i className="glyphicon glyphicon-trash text-success mr-sm mb-xs" />
                </button>
              </div>

              <div className={s.alignEnd}>
                <i
                  onClick={() =>
                    this.handleCardAction({ id: item._id, action: "view" })
                  }
                  className="glyphicon glyphicon-eye-open text-success mr-sm mb-xs"
                />

                <i
                  onClick={() =>
                    this.handleCardAction({ id: item._id, action: "edit" })
                  }
                  className="glyphicon glyphicon-pencil text-success mr-sm mb-xs"
                />

                <i
                  onClick={() => this.shareModalToggle(item)}
                  className="glyphicon glyphicon-share text-success mb-xs"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
    return (
      <section className={s.root}>
        <Loader visible={isFetching} />
        <Container>
          <Row>
            <Col>
              <h1 className="page-title">Maps</h1>
            </Col>
            <Col>
              <ShareMap
                isShareModalOpen={this.state.isShareModalOpen}
                users={userList}
                mapData={this.state.activeShareMapData}
                shareMap={this.handleShareMap}
                errorMessage={this.props.errorMessage}
                mapShareStatus={this.props.mapShareStatus}
                onModalClose={this.onModalClose}
              />
              <CreateMap
                tagNames={tagNames}
                createMap={this.handleCreateMap}
                errorMessage={this.props.errorMessage}
                mapCreateStatus={this.props.mapCreateStatus}
                onModalClose={this.onModalClose}
              />
            </Col>
          </Row>
          <Row>
            {mapList && mapList.length != 0 ? (
              <React.Fragment>
                <CardColumns className="mt-20">{mapListComp}</CardColumns>
                <Pagination
                  count={totalMapCount}
                  limit={dashboardConst.PAGE_MAP_LIMIT}
                  currentPage={this.state.currentPage}
                  fetchMaps={this.fetchMapList}
                />
              </React.Fragment>
            ) : (
              <h5>{isFetching ? `Loading....` : `No Maps Available!`}</h5>
            )}
          </Row>
        </Container>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.dashboard.isFetching,
    isError: state.dashboard.isError,
    mapList: state.dashboard.mapList,
    errorMessage: state.dashboard.errorMessage,
    tagNames: state.dashboard.tagNames,
    mapCreateStatus: state.dashboard.mapCreateStatus,
    mapShareStatus: state.dashboard.mapShareStatus,
    totalMapCount: state.dashboard.totalMapCount,
    userList: state.auth.userList
  };
}

export default connect(mapStateToProps)(Dashboard);
