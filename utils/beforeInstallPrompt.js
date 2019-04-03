export const beforeInstallListener = (_this) => {
	window.addEventListener('beforeinstallprompt', (e) => {
		_this.setState({ showInstallButton: true });
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		_this.deferredPrompt = e;
		_this.deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					_this.setState({ showInstallButton: false });
				}
			});
	});
};

export const promptInstallApp = (_this) => {
	_this.deferredPrompt.prompt();
	_this.deferredPrompt.userChoice
		.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				_this.setState({ showInstallButton: false });
			}
		});
};
