package com.zeciakstore.backend.service;

import com.zeciakstore.backend.model.ContactMessage;

import java.util.List;

public interface ContactService {
    ContactMessage saveMessage(ContactMessage message);
    List<ContactMessage> getAllMessages();
}
