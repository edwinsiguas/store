package com.zeciakstore.backend.service.impl;

import com.zeciakstore.backend.model.TouristAttraction;
import com.zeciakstore.backend.repository.TouristAttractionRepository;
import com.zeciakstore.backend.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TouristAttractionServiceImpl implements TouristAttractionService {

    @Autowired
    private TouristAttractionRepository attractionRepository;

    @Override
    public List<TouristAttraction> getAllAttractions() {
        return attractionRepository.findAll();
    }

    @Override
    public TouristAttraction getAttractionById(Long id) {
        return attractionRepository.findById(id).orElseThrow(() -> new RuntimeException("Attraction not found"));
    }

    @Override
    public TouristAttraction createAttraction(TouristAttraction attraction) {
        return attractionRepository.save(attraction);
    }

    @Override
    public TouristAttraction updateAttraction(Long id, TouristAttraction attractionDetails) {
        TouristAttraction attraction = getAttractionById(id);
        attraction.setName(attractionDetails.getName());
        attraction.setDescription(attractionDetails.getDescription());
        attraction.setLocation(attractionDetails.getLocation());
        attraction.setImageUrl(attractionDetails.getImageUrl());
        return attractionRepository.save(attraction);
    }

    @Override
    public void deleteAttraction(Long id) {
        TouristAttraction attraction = getAttractionById(id);
        attractionRepository.delete(attraction);
    }
}
