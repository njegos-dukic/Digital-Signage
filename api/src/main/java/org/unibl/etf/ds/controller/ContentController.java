package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.ds.model.dto.NewContentDto;
import org.unibl.etf.ds.model.entity.ContentEntity;
import org.unibl.etf.ds.service.ContentService;

@RestController
@AllArgsConstructor
@RequestMapping("/content")
public class ContentController {

    private final ContentService contentService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ContentEntity addNew(@ModelAttribute NewContentDto newContentDto) { // @RequestBody @Validated NewContentDto newContentDto) {
        return contentService.addNew(newContentDto);
        // return contentService.addNew(newContentDto);
    }
}