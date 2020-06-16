import React from 'react';
import { LayerHoverInfoFactory, CoordinateInfoFactory } from 'kepler.gl/components';


const CustomPopover = () => (<div></div>);
const CustomPopOverFactory = () => CustomPopover;

CustomPopOverFactory.deps = [LayerHoverInfoFactory, CoordinateInfoFactory];

export default CustomPopOverFactory;