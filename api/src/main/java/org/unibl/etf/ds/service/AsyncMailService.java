package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AsyncMailService {

    private JavaMailSender emailSender;

    private final static String EMAIL_FROM = "njegos.dukic.998@gmail.com";
    private final static String EMAIL_SUBJECT = "Digital Signage";

    public void sendSimpleMailAsync(String recipient, String content) {
        new Thread(() -> {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(EMAIL_FROM);
            message.setTo(recipient);
            message.setSubject(EMAIL_SUBJECT);
            message.setText(content);
            emailSender.send(message);
        }).start();
    }
}

