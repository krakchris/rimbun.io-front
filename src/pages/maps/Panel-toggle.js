import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { PanelToggleFactory, Button, Icons, withState } from 'kepler.gl/components';
import { visStateLens } from 'kepler.gl/reducers';
import { setMapConfig } from '../../reducers/kepler';



const StyledPanelToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  background-color: ${props => props.theme.sidePanelHeaderBg};
`;


const ButtonWrapper = styled.div`
  margin-bottom: 4px;
`;

const PanelToggle = PanelToggleFactory();

const PanelToggleWrapper = props => (
  <StyledPanelToggleWrapper>
    <PanelToggle {...props} />
    <ButtonWrapper>
      <Button onClick={() => props.onClickSaveConfig(props.mapState)} width="120px" paddingLeft="50px">
        <Icons.Files height="12px" />
        Save Config
      </Button>
    </ButtonWrapper>

  </StyledPanelToggleWrapper>
);

const CustomPanelToggleFactory = () =>
  withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    state => ({ mapState: state.keplerGl.editMap }),
    {
      onClickSaveConfig: setMapConfig
    }
  )(PanelToggleWrapper);




export default CustomPanelToggleFactory;
