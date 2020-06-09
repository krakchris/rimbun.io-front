import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import s from './Dashboard.module.scss';
import {
  Alert,
  Button,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardGroup,
  CardColumns,
  CardBody,
  Row,
  Container,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import CreateMap from './CreateMap';
import mapImage from "../../images/map_placeholder.png";
import cx from "classnames";
import { fetchMaps, getTagNames, createMap } from "../../actions/dashboard";
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import * as dashboardConst from './constant';
import DeleteMap from './DeleteMap';

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
      currentPage: dashboardConst.CURRENT_PAGE_COUNT
    };
  }

  componentDidMount() {
    this.props.dispatch(getTagNames());
    this.fetchMapList({
      pageNo: this.state.currentPage,
      limit: dashboardConst.PAGE_MAP_LIMIT
    });
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

  handleCreateMap = formData => {
    this.props.dispatch(createMap(formData));
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onModalClose = () => {
    if (this.props.mapCreateStatus)
      this.fetchMapList({
        pageNo: this.state.currentPage,
        limit: dashboardConst.PAGE_MAP_LIMIT
      });
  };

  // viewMap Route --> this.props.history.push(`/viewMap/${id}`);

  handleCardAction = ({ id, action }) => {
    if (action === 'edit') this.props.history.push(`/map/${id}`);
    if (action === 'view') alert('In progress');
    if (action === 'share') alert('In progress');
  }



  render() {
    const { isFetching, mapList, tagNames, totalMapCount } = this.props;

    const mapListComp = mapList.map(item => {
      return (
        <Card key={item._id}>
          <i
            className={cx(
              s.alignEnd,
              "glyphicon glyphicon-folder-close text-success mt-sm mr-sm float-right"
            )}
          />
          <a href="#" target="_blank" title="View Map">
            <CardImg top width="100%" src={mapImage} alt="Card image cap" />
          </a>
          <CardBody>
            <CardTitle className="fw-semi-bold">{item.name}</CardTitle>
            <div className={s.actionIcons}>
              <div>
                <DeleteMap />
              </div>

              <div className={s.alignEnd}>

                <i onClick={() => this.handleCardAction({ id: item._id, action: 'view' })}
                  className="glyphicon glyphicon-eye-open text-success mr-sm mb-xs" />

                <i onClick={() => this.handleCardAction({ id: item._id, action: 'edit' })} className="glyphicon glyphicon-pencil text-success mr-sm mb-xs" />

                <i onClick={() => this.handleCardAction({ id: item._id, action: 'share' })} className="glyphicon glyphicon-share text-success mb-xs" />

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
    totalMapCount: state.dashboard.totalMapCount
  };
}

export default connect(mapStateToProps)(Dashboard);
