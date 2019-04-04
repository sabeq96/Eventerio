import React, { Component } from 'preact';

export default class ClickOutside extends Component {
	removeListeners = () => {
		document.removeEventListener('touchend', this.handle, true);
		document.removeEventListener('click', this.handle, true);
	};

	addListeners = () => {
		document.addEventListener('touchend', this.handle, true);
		document.addEventListener('click', this.handle, true);
	}

	hasCallback = (callback) => typeof callback === 'function';

	handle = e => {
		if (e.type === 'touchend') this.isTouch = true;
		if (e.type === 'click' && this.isTouch) return;
		const { onClickOutside, id } = this.props;
		const el = document.getElementById(id);

		if (el && !el.contains(e.target)) { onClickOutside(e); }
	}
	

	constructor(props) {
		super(props);

		this.isTouch = false;
	}

	componentDidMount() {
		if (this.hasCallback(this.props.onClickOutside)) {
			this.addListeners();
		}
	}
	
	componentDidUpdate() {
		const { id, onClickOutside } = this.props;
		const el = document.getElementById(id);

		if (this.hasCallback(onClickOutside)) { this.addListeners(); } // Has no callback
		if (!el || !this.hasCallback(onClickOutside)) { this.removeListeners(); } // element does not exist
	}
	
	componentWillUnmount() { this.removeListeners(); }

	render() {
		const { children, id, onClickOutside, ...props } = this.props; //eslint-disable-line

		return <div id={id} {...props}>{children}</div>;
	}
}