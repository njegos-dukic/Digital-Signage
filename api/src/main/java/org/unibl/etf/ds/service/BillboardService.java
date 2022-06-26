package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.BillboardDto;
import org.unibl.etf.ds.model.entity.BillboardEntity;
import org.unibl.etf.ds.repository.BillboardRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class BillboardService {

    private final BillboardRepository billboardRepository;
    private final ModelMapper modelMapper;

    public List<BillboardEntity> getAll() {
        return billboardRepository.findAllByDeleted(false);
    }

    public List<BillboardEntity> getAllAvailable() {
        return billboardRepository.findAllByDeletedAndAvailable(false, true);
    }

    public BillboardEntity createNew(BillboardDto billboardDto) {
        billboardDto.setId(0);
        billboardDto.setLat(44.772);
        billboardDto.setLng(17.191);
        return billboardRepository.saveAndFlush(modelMapper.map(billboardDto, BillboardEntity.class));
    }

    public Boolean delete(Integer id) {
        BillboardEntity billboardEntity = billboardRepository.findById(id).orElse(null);
        if (billboardEntity == null || billboardEntity.getDeleted()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Bilbord sa datim identifikatorom ne postoji.");
        }

        billboardEntity.setDeleted(true);
        billboardRepository.saveAndFlush(billboardEntity);
        return true;
    }

    public BillboardEntity update(BillboardDto billboardDto) {
        BillboardEntity billboardEntity = billboardRepository.findById(billboardDto.getId()).orElse(null);
        if (billboardEntity == null || billboardEntity.getDeleted()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Bilbord sa datim identifikatorom ne postoji.");
        }

        billboardEntity.setName(billboardDto.getName());
        billboardEntity.setCity(billboardDto.getCity());
        billboardEntity.setDailyRate(billboardDto.getDailyRate());
        billboardEntity.setLat(billboardDto.getLat());
        billboardEntity.setLng(billboardDto.getLng());
        return billboardRepository.saveAndFlush(billboardEntity);
    }

    public Boolean toggleAvailabile(Integer id) {
        BillboardEntity billboardEntity = billboardRepository.findById(id).orElse(null);
        if (billboardEntity == null || billboardEntity.getDeleted()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Bilbord sa datim identifikatorom ne postoji.");
        }

        billboardEntity.setAvailable(!billboardEntity.getAvailable());
        billboardRepository.saveAndFlush(billboardEntity);
        return true;
    }
}
