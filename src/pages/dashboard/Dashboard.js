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
      currentPage: 1
    };
  }

  componentDidMount() {
    console.log('componener did mount is called===>');
    this.props.dispatch(getTagNames());
    this.fetchMapList(this.state.currentPage);
  }

  fetchMapList = (currentPage) => {
    this.setState({ currentPage });
    this.props.dispatch(fetchMaps(currentPage));
  }

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
    if (this.props.mapCreateStatus) this.props.dispatch(fetchMaps());
    console.log("modal is closed");
  };

  render() {
    console.log("Render of Dashboard is called");
    const { isFetching, mapList, tagNames } = this.props;

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
            <div className={s.alignEnd}>
              <i className="glyphicon glyphicon-eye-open text-success mr-sm mb-xs" />
              <i className="glyphicon glyphicon-pencil text-success mr-sm mb-xs" />
              <i className="glyphicon glyphicon-share text-success mb-xs" />
            </div>
          </CardBody>
        </Card>
      );
    });
    console.log("mapCreateStatus", this.props.mapCreateStatus);
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
                  count="20"
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
    mapCreateStatus: state.dashboard.mapCreateStatus
  };
}

export default connect(mapStateToProps)(Dashboard);
