package com.zeciakstore.backend.service;

import com.zeciakstore.backend.model.TouristAttraction;
import java.util.List;

public interface TouristAttractionService {
    List<TouristAttraction> getAllAttractions();
    TouristAttraction getAttractionById(Long id);
    TouristAttraction createAttraction(TouristAttraction attraction);
    TouristAttraction updateAttraction(Long id, TouristAttraction attractionDetails);
    void deleteAttraction(Long id);
}
