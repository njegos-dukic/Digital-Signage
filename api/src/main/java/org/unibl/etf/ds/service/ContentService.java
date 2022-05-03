package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.NewContentDto;
import org.unibl.etf.ds.model.entity.BillboardEntity;
import org.unibl.etf.ds.model.entity.ContentEntity;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.BillboardRepository;
import org.unibl.etf.ds.repository.ContentRepository;
import org.unibl.etf.ds.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class ContentService {

    private final ContentRepository contentRepository;
    private final AsyncMailService asyncMailService;
    private final UserRepository userRepository;
    private final BillboardRepository billboardRepository;

    public List<ContentEntity> getAllAvailable() {
        return contentRepository.getAllByDeleted(false);
    }

    public ContentEntity addNew(NewContentDto newContentDto) {

        ContentEntity contentEntity = new ContentEntity();

        Instant startDate = Instant.parse(newContentDto.getStartDate());
        Instant endDate = Instant.parse(newContentDto.getEndDate());

        System.out.println(startDate);
        System.out.println(endDate);

        UserEntity userEntity = userRepository.findById(newContentDto.getUserId()).orElse(null);
        if (userEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "User does not exist.");
        }

        BillboardEntity billboardEntity = billboardRepository.findById(newContentDto.getBillboardId()).orElse(null);
        if (billboardEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Billboard does not exist.");
        }

        if(!startDate.truncatedTo(ChronoUnit.DAYS).isBefore(endDate.plus(1, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS))) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Start date must be before end date.");
        }

        if(startDate.truncatedTo(ChronoUnit.DAYS).isBefore(Instant.now().truncatedTo(ChronoUnit.DAYS)) ||
           endDate.truncatedTo(ChronoUnit.DAYS).isBefore(Instant.now().truncatedTo(ChronoUnit.DAYS))) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Start and end date must be in the future.");
        }

        contentEntity.setUser(userEntity);
        contentEntity.setBillboard(billboardEntity);
        contentEntity.setAdName(newContentDto.getAdName());
        contentEntity.setApproved(false);
        contentEntity.setDeleted(false);
        contentEntity.setStartDate(startDate);
        contentEntity.setEndDate(endDate);
        Long daysBetween = ChronoUnit.DAYS.between(contentEntity.getStartDate().truncatedTo(ChronoUnit.DAYS), contentEntity.getEndDate().truncatedTo(ChronoUnit.DAYS)) + 1;
        contentEntity.setTotalCost(billboardEntity.getDailyRate() * daysBetween);
        ContentEntity inserted = contentRepository.saveAndFlush(contentEntity);

        byte[] fileBytes;
        try {
            fileBytes = newContentDto.getContent().getBytes();
            Files.createDirectory(Paths.get(".\\..\\digital-signage-fs\\" + inserted.getId()));
            Files.write(Paths.get(".\\..\\digital-signage-fs\\" + inserted.getId() + "\\" + newContentDto.getContent().getOriginalFilename()), fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
            contentRepository.delete(inserted);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while processing request.");
        }

        // TODO: Send mail from here.
        return inserted;
    }
}
