package com.Email.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Email.Dto.EmailRequest;
import com.Email.service.EmailService;

@RestController
public class EmailController {
	
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/sendEmail")
    public String sendEmails(@RequestBody EmailRequest emailRequest) {
        String[] recipients = emailRequest.getRecipients();
        String subject = emailRequest.getSubject();
        String body = emailRequest.getBody();
        return emailService.sendEmails(recipients, subject, body);
    }
}

