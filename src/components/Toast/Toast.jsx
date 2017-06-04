import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { Wrapper, ToastWrapper, ToastIcon, ToastMessage } from './Toast.styled';

class Toast extends Component {

  constructor(props) {
    super(props);
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
    setTimeout(() => this.setState({showToast: true}), delay);
    // hide message after timeout
    this.timer = setTimeout(() => this.setState({showToast: false}), duration + delay);
  }

  initPassiveNotification() {
    const interval = parseInt(this.props.pulseInterval) / 2;
    // set pulse animation
    this.timer = setInterval(() => this.setState({pulse: !this.state.pulse}), interval);
  }

  handleClick() {
    this.setState({
      showToast: !this.state.showToast
    });
    // remove timer
    if (this.timer) {
      if (this.props.mode === 'passive') {
        clearInterval(this.timer);
      }
      if (this.props.mode === 'active') {
        clearTimeout(this.timer);
      }
    }
  }

  render() {
    const {
      icon,
      fontSize,
      position,
      bgColor,
      borderRadius,
      textColor,
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
              {...this.props}
              src={icon}
              pulse={this.state.pulse}
              onClick={this.handleClick} />
            : null }
          <ToastMessage
            {...this.props}
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
  fontSize: 18,
  backgroundColor: '#000',
  textColor: '#FFF',
  borderRadius: '0',
  position: 'top-left',
  delay: 1000,
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
