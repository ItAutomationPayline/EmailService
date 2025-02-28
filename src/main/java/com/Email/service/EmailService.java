package com.Email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    public String sendEmails(String[] recipients, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		    helper.setFrom(new InternetAddress("donot_reply@paylineindia.com"));
            helper.setTo(recipients);
            helper.setSubject(subject);
            helper.setText(body, true); // Enable HTML content
            mailSender.send(message);
            return "Emails sent successfully to: " + String.join(", ", recipients);
        }
        catch (MessagingException e) {
            return "Error sending emails: " + e.getMessage();
        }
    }
}

