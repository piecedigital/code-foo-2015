$(document).ready(function() {
	function loadData(data) {
		data = data || "/videos";
		$.ajax({
			url: data,
			success: function (data) {
				$("#data-injection").html(data);
			},
	    error: function(errmsg1, errmsg2, errmsg3) {
	      console.log(errmsg1.status);
	      console.log(errmsg2);
	      console.log(errmsg3.message);
	    }
		});
	}
});