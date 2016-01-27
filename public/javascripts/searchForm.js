$(document).ready(function(){
	$('#submitButton').click(onSubmitButtonClick);

	function onSubmitButtonClick(e) {
		var URL = '/search?' +
		          'searchModel=' + $('#searchModel').val()

		$.ajax({
			type: 'GET',
			url: URL,
			beforeSend: function() {
				$('#submitButton').prop('disabled', true);
  				$('#results').text('Please wait...');
			},
			success: function(response) {
  				$('#results').html(response);
			},
			error: function(response) {

				if(response.status == 401) {
					window.location.replace("login");
				} else {
					console.log('error getting rates: ' + JSON.stringify(response));
	  				$('#results').text('Server exception encountered. Please try again later');
				}
			},
			complete: function(response, status) {
				$('#submitButton').prop('disabled', false);
			}
		});
	}

	function onSuccessfulSubmitResults(data, status) {
		console.log(data);
	}
});
