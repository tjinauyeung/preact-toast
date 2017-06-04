import styled from 'styled-components';

const MAP_POSITION_TO_CSS = {
  'top-left': 'top: 0; left: 0;',
  'top-right': 'top: 0; right: 0;',
  'bottom-left': 'bottom: 0; left: 0;',
  'bottom-right': 'bottom: 0; right: 0;'
};

export const Wrapper = styled.div`
  height: 300px;
  position: relative;
`

export const ToastWrapper = styled.div`
  position: absolute;
  ${props => MAP_POSITION_TO_CSS[props.position]};

  display: flex;
  flex-direction: ${props => getCssFlexDirection(props)};

  z-index: 9999999999;
  margin: 10px;
  box-sizing: border-box;
`;

export const ToastIcon = styled.img`
  background-color: ${props => props.backgroundColor};
  width: 80px;
  height: 80px;
  border-radius: ${props => props.borderRadius}px;
  padding: 20px;
  cursor: pointer;
  box-sizing: border-box;

  animation: ${props => getPulseAnimation(props)};
  animation-delay: ${props => parseInt(props.delay - 800)}ms;

  @keyframes pulse {
    0% { transform: scale3d(1, 1, 1) }
    25% { transform: scale3d(1.1, 1.1, 1.1) }
    50% { transform: scale3d(1, 1, 1) }
    75% { transform: scale3d(1.1, 1.1, 1.1) }
    100% { transform: scale3d(1, 1, 1) }
  }
`;

export const ToastMessage = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};

  font-family: sans-serif;
  font-size: ${props => props.fontSize}px;

  max-width: 550px;
  border-radius: ${props => props.borderRadius}px;
  margin: 0 10px;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;

  opacity: ${props => props.showToast ? 1 : 0};
  transform: ${props => getTransformCssValues(props)};
  transition: all 200ms ease-in-out;

  &:after {
    content: '';
    display: ${props => props.icon ? 'block' : 'none' };
    width: 0;
    height: 0;

    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid ${props => props.backgroundColor};

    position: absolute;
    top: 32px;
    ${props => getArrowCssValues(props)};
  }
`;

function getCssFlexDirection(props) {
  if (props.position.includes('right')) {
    return 'row-reverse';
  }
  return 'row';
}

function getTransformCssValues(props) {
  if (props.showToast) {
    return 'translateX(0)';
  }
  if (!props.showToast && props.position.includes('right')) {
    return 'translateX(100px)';
  }
  if (!props.showToast && props.position.includes('left')) {
    return 'translateX(-100px)';
  }
}

function getPulseAnimation(props) {
  if (props.pulse) {
    return 'pulse 450ms forwards linear'
  }
}

function getArrowCssValues(props) {
  if (props.position.includes('right')) {
    return 'right: -7px; transform: rotate(180deg)';
  }
  return 'left: -7px';
}
