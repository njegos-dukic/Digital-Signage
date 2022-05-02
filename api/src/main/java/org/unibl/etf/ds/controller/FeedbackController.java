package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.ds.model.dto.FeedbackDto;
import org.unibl.etf.ds.model.dto.NewFeedbackDto;
import org.unibl.etf.ds.model.entity.FeedbackEntity;
import org.unibl.etf.ds.service.FeedbackService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/messages")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping
    public List<FeedbackDto> getAll() {
        return feedbackService.getAll();
    }

    @PostMapping
    public FeedbackEntity insert(@RequestBody NewFeedbackDto newFeedbackDto) {
        return feedbackService.addNew(newFeedbackDto);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return feedbackService.delete(id);
    }
}
