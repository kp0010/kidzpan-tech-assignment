const errorHandler = (err, _, res, next) => {
	console.error('Error: ', err);

	const errorStatus = err.status || 500

	res.status(errorStatus).json({
		success: "error",
		error: {
			message: err.message || 'Server error',
			status: errorStatus
		}
	});
};

export default errorHandler
