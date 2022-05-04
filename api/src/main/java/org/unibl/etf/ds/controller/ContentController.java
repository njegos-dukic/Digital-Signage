package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.ds.model.dto.FileDto;
import org.unibl.etf.ds.model.dto.NewContentDto;
import org.unibl.etf.ds.model.entity.ContentEntity;
import org.unibl.etf.ds.service.ContentService;

import javax.servlet.http.HttpServletResponse;
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

    @GetMapping(value = "/ad/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getAd(@PathVariable Integer id, HttpServletResponse response) {
        FileDto fileDto = contentService.getFile(id);
        response.setHeader("Content-Disposition", "attachment; filename=" + fileDto.getFilename());
        return fileDto.getContent();
    }

    @PostMapping("/toggle/{id}")
    public Boolean toggleStatus(@PathVariable Integer id) {
        contentService.toggleStatus(id);
        return true;
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Integer id) {
        contentService.setDeleted(id);
        return true;
    }

    @GetMapping("/ad")
    public List<FileDto> getAdsForBillboard(@RequestParam Integer billboardId) {
        return contentService.getAllAdsForBillboard(billboardId);
    }
}