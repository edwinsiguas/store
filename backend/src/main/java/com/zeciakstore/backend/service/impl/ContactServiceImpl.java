package com.zeciakstore.backend.service.impl;

import com.zeciakstore.backend.model.ContactMessage;
import com.zeciakstore.backend.repository.ContactMessageRepository;
import com.zeciakstore.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }
}
