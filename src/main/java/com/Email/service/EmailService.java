package com.Email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    public String sendEmails(String[] recipients, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipients); // Set multiple recipients
        message.setSubject(subject);
        message.setText(body+"\n\nRegards,\nEmailService");
        message.setFrom("your-email@gmail.com"); // Optional

        try {
            mailSender.send(message);
            return "Emails sent successfully to: " + String.join(", ", recipients);
            
        } catch (Exception e) {
            return "Error sending emails: " + e.getMessage();
        }
    }
}

