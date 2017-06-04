import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { Wrapper, ToastWrapper, ToastIcon, ToastMessage } from './Toast.styled';

// helper function
function isEmpty(arr) {
  return arr === undefined || arr.length == 0;
};

class Toast extends Component {

  constructor(props) {
    super(props);
    this.timer = [];
    this.state = {
      showToast: false,
      pulse: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === 'active') {
      this.initActiveNotification();
    }
    if (this.props.mode === 'passive') {
      this.initPassiveNotification();
    }
  }

  initActiveNotification() {
    const delay = parseInt(this.props.delay);
    const duration = parseInt(this.props.duration);
    // show message after delay
    this.timer[0] = setTimeout(() => this.setState({showToast: true}), delay);
    // hide message after timeout
    this.timer[1] = setTimeout(() => this.setState({showToast: false}), duration + delay);
  }

  initPassiveNotification() {
    const interval = parseInt(this.props.pulseInterval) / 2;
    // set pulse animation
    this.timer[0] = setInterval(() => this.setState({pulse: !this.state.pulse}), interval);
  }

  handleClick() {
    this.setState({
      showToast: !this.state.showToast
    });
    // remove timer
    if (!isEmpty(this.timer)) {
      this.removeTimers();
    }
  }

  removeTimers() {
    if (this.props.mode === 'passive') {
      clearInterval(this.timer[0]);
    }
    if (this.props.mode === 'active') {
      clearTimeout(this.timer[0]);
      clearTimeout(this.timer[1]);
    }
    this.timer = [];
  }

  render() {
    const {
      icon,
      fontSize,
      position,
      backgroundColor,
      borderRadius,
      textColor,
      pulseInterval,
      delay,
      duration,
      children
    } = this.props;

    return (
      <Wrapper>
        <ToastWrapper
          position={position}>
          { icon
            ? <ToastIcon
                src={icon}
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                delay={delay}
                pulse={this.state.pulse}
                pulseInterval={pulseInterval}
                onClick={this.handleClick} />
            : null }
          <ToastMessage
            icon={icon}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            textColor={textColor}
            fontSize={fontSize}
            position={position}
            duration={duration}
            showToast={this.state.showToast}
            onClick={this.handleClick} >
            {children}
          </ToastMessage>
        </ToastWrapper>
      </Wrapper>
    );
  }
};

Toast.defaultProps = {
  mode: 'active',
  pulseInterval: 8000,
  fontSize: 17,
  backgroundColor: '#000',
  textColor: '#FFF',
  borderRadius: '0',
  position: 'top-left',
  delay: 2000,
  duration: 5000
};

Toast.propTypes = {
  /** toast icon */
  icon: PropTypes.string,
  /** top-left | top-right | bottom-left | bottom-right */
  position: PropTypes.string,
  /** active | passive */
  mode: PropTypes.string,
  /** time between pulses in milliseconds (only in passive mode) */
  pulseInterval: PropTypes.number,
  /** duration of notification message before collapsing in milliseconds */
  duration: PropTypes.number,
  /** delay of notification message appearing in milliseconds */
  delay: PropTypes.number,
  /** color applied to message panel */
  backgroundColor: PropTypes.string,
  /** size of message font */
  fontSize: PropTypes.number,
  /** color of message text */
  textColor: PropTypes.string,
  /** border radius of toast icon and message panel */
  borderRadius: PropTypes.string,
  /** the contents to be rendered inside */
  children: PropTypes.array
};

export default Toast;
