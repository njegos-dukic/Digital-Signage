package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.ds.model.dto.BillboardDto;
import org.unibl.etf.ds.model.entity.BillboardEntity;
import org.unibl.etf.ds.service.BillboardService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/billboard")
public class BillboardController {

    private final BillboardService billboardService;

    @GetMapping
    public List<BillboardEntity> getAll() {
        return billboardService.getAll();
    }

    @PostMapping
    public BillboardEntity addNew(@RequestBody @Validated BillboardDto billboardDto) {
        return billboardService.createNew(billboardDto);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return billboardService.delete(id);
    }

    @PutMapping
    public BillboardEntity update(@RequestBody @Validated BillboardDto billboardDto) {
        return billboardService.update(billboardDto);
    }

    @PostMapping("/toggle/{id}")
    public Boolean toggleAvailable(@PathVariable Integer id) {
        return billboardService.toggleAvailabile(id);
    }
}
