import React from 'react';
import styled from 'styled-components';
import { PanelToggleFactory, Button, Icons, withState } from 'kepler.gl/components';
import { visStateLens } from 'kepler.gl/reducers';
import { saveMapConfig } from "../../actions/map";
import { toast } from "react-toastify";
import KeplerGlSchema from "kepler.gl/schemas";
import history from "../../components/history";


const StyledPanelToggleWrapper = styled.div`
  background-color: ${props => props.theme.sidePanelHeaderBg};
`;


const ButtonWrapper = styled.div`
  margin-bottom: 2%;
  margin-top: 2%;
  display: flex;
  justify-content: space-between;
  padding-right: 5%;
  padding-left: 5%;
`;

const PanelToggle = PanelToggleFactory();

const PanelToggleWrapper = props => {

  const saveMapConfig = () => {

    // get the config object and mapId
    const { mapState: { editMap }, mapData: { mapId } } = props;

    // create the config object
    const config = KeplerGlSchema.getConfigToSave(editMap);

    //dispatch action to save config into database
    mapId && config
      ? props.onClickSaveConfig({ mapId, config })
      : toast.error("Oops, Unable to save config. Try Again Later", {
        position: toast.POSITION.TOP_RIGHT
      });  
    
  };

  const handleBack = () => {
    history.push("/app");
    window.location.reload();
  }

  return (
    <StyledPanelToggleWrapper>
      <PanelToggle {...props} />
      <ButtonWrapper>
        <Button onClick={saveMapConfig} width="40%" paddingLeft="90px">
          <Icons.Files height="12px" />
          Save Config
        </Button>
        <Button onClick={handleBack} width="40%" paddingLeft="90px">
          <Icons.ArrowLeft height="12px"  />
          Back
        </Button>
      </ButtonWrapper>
    </StyledPanelToggleWrapper>
  );



}


const CustomPanelToggleFactory = () =>
  withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    state => ({
      mapState: state.keplerGl,
      mapData:  state.map.mapData
    }),
    {
      onClickSaveConfig: saveMapConfig
    }
  )(PanelToggleWrapper);




export default CustomPanelToggleFactory;
