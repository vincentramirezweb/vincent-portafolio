<?php

// Get Values from JS
$  		= $_POST['ajax_name'];
$php_email 		= $_POST['ajax_email'];
$php_emailto	= $_POST['ajax_emailto'];
$php_message 	= $_POST['ajax_message'];
$php_phone 		= $_POST['ajax_phone'];



// Sanitizing email
$php_email 		= filter_var($php_email, FILTER_SANITIZE_EMAIL);
$php_emailto 	= filter_var($php_emailto, FILTER_SANITIZE_EMAIL);


// After sanitization Validation is performed
if(filter_var($php_email, FILTER_VALIDATE_EMAIL)){
	
	
		$php_subject  = "Mensaje del formulario de conracto";
		
		// To send HTML mail, the Content-type header must be set
		$php_headers  = 'MIME-Version: 1.0' . "\r\n";
		$php_headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$php_headers .= 'From:' . $php_email. "\r\n"; // Sender's Email
		$php_headers .= 'Cc:' . $php_email. "\r\n"; // Carbon copy to Sender
		
		$php_template = '<div style="padding:50px;">Hello ' . $php_name . ',<br/>'
		. 'Gracias por contactarte conmigo.<br/><br/>'
		. '<strong style="color:#f00a77;">Name:</strong>  ' . $php_name . '<br/>'
		. '<strong style="color:#f00a77;">Email:</strong>  ' . $php_email . '<br/>'
		. '<strong style="color:#f00a77;">Subject:</strong>  ' . $php_subject . '<br/>'
		. '<strong style="color:#f00a77;">Phone:</strong>  ' . $php_phone . '<br/>'
		. '<strong style="color:#f00a77;">Message:</strong>  ' . $php_message . '<br/><br/>'
		. 'Su mensaje fue enviado correctamente'
		. '<br/>'
		. 'Me pondre en contacto con usted tan pronto como me sea posible .</div>';
		$php_sendmessage = "<div style=\"background-color:#f5f5f5; color:#333;\">" . $php_template . "</div>";
		
		// message lines should not exceed 70 characters (PHP rule), so wrap it
		$php_sendmessage = wordwrap($php_sendmessage, 70);
		
		// Send mail by PHP Mail Function
		mail($php_emailto, $php_subject, $php_sendmessage, $php_headers);
		echo "";
	
	
}else if(filter_var($php_emailto, FILTER_VALIDATE_EMAIL)){
	echo "<span class='contact_error'>* Invalid recipient email *</span>";
}else{
	echo "<span class='contact_error'>* Invalid sender email *</span>";
}

?>