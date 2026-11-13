package com.zeciakstore.backend.controller;

import com.zeciakstore.backend.model.TouristAttraction;
import com.zeciakstore.backend.service.TouristAttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tourist-attractions")
public class TouristAttractionController {

    @Autowired
    private TouristAttractionService touristAttractionService;

    @GetMapping
    public List<TouristAttraction> getAllAttractions() {
        return touristAttractionService.getAllAttractions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TouristAttraction> getAttractionById(@PathVariable Long id) {
        return ResponseEntity.ok(touristAttractionService.getAttractionById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TouristAttraction> createAttraction(@RequestBody TouristAttraction attraction) {
        return ResponseEntity.ok(touristAttractionService.createAttraction(attraction));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TouristAttraction> updateAttraction(@PathVariable Long id, @RequestBody TouristAttraction attraction) {
        return ResponseEntity.ok(touristAttractionService.updateAttraction(id, attraction));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAttraction(@PathVariable Long id) {
        touristAttractionService.deleteAttraction(id);
        return ResponseEntity.ok("Attraction deleted successfully");
    }
}
