package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.ds.model.dto.NewContentDto;
import org.unibl.etf.ds.model.entity.ContentEntity;
import org.unibl.etf.ds.service.ContentService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/content")
public class ContentController {

    private final ContentService contentService;

    @GetMapping
    public List<ContentEntity> getAll() {
        return contentService.getAllAvailable();
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ContentEntity addNew(@ModelAttribute NewContentDto newContentDto) {
        return contentService.addNew(newContentDto);
    }
}