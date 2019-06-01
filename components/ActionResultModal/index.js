import { Component } from 'preact';
import { actions, withStore } from '../../utils/store';
import { Button, Card, CardHeader, CardBody, CardFooter, Icon } from 'preact-fluid';
import Result from './actionResultTypes';
import OutsideClickHandler from '../OutsideClickHandler';

class ActionResultModal extends Component {
	hideModal = () => {
		const { dispatch } = this.props;
		dispatch({ type: actions.SHOW_ACTION_RESULT_MODAL, actionResultModalType: false });
	}

	handleButtonClick = (e) => {
		e.preventDefault();
		this.props.dispatch({ type: actions.SHOW_ACTION_RESULT_MODAL, actionResultModalType: false });
	}

	getModalTitle = () => {
		switch (this.props.store.actionResultModalType) {
			case Result.SUCCESS: {
				return <Icon name="check-circle" size="large" color="#5a33a7" />;
			}
			case Result.ERROR: {
				return <Icon name="exclamation-circle" size="large" color="#ff3776" />;
			}
			default: {
				return '';
			}
		}
	}

	getModalButton = () => {
		switch (this.props.store.actionResultModalType) {
			case Result.SUCCESS: {
				return <Button primary onClick={this.handleButtonClick}>OK</Button>;
			}
			case Result.ERROR: {
				return <Button secondary onClick={this.handleButtonClick}>OK</Button>;
			}
			default: {
				return '';
			}
		}
	}

	render(props, state) {
		return (
			<div style={styles.modalWrapper}>
				<OutsideClickHandler onClickOutside={this.hideModal} id="actionResultModal">
					<Card style={styles.card}>
						<CardHeader title={this.getModalTitle()} />
						<form>
							<CardBody>
								<div style={styles.messageContainer}>
									{props.store.actionResultModalMessage}
								</div>
							</CardBody>
							<CardFooter
								right={this.getModalButton()}
							/>
						</form>
					</Card>
				</OutsideClickHandler>
			</div>
		);
	}
}

const styles = {
	card: {
		width: '350px'
	},
	modalWrapper: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 100
	},
	messageContainer: {
		display: 'flex',
		justifyContent: 'center'
	}
};

export default withStore(ActionResultModal);