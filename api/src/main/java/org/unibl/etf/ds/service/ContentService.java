package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.FileDto;
import org.unibl.etf.ds.model.dto.NewContentDto;
import org.unibl.etf.ds.model.entity.BillboardEntity;
import org.unibl.etf.ds.model.entity.ContentEntity;
import org.unibl.etf.ds.model.entity.LogEntity;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.BillboardRepository;
import org.unibl.etf.ds.repository.ContentRepository;
import org.unibl.etf.ds.repository.LogRepository;
import org.unibl.etf.ds.repository.UserRepository;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ContentService {

    private final ContentRepository contentRepository;
    private final AsyncMailService asyncMailService;
    private final UserRepository userRepository;
    private final BillboardRepository billboardRepository;
    private final LogRepository logRepository;

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
            Files.createDirectory(Paths.get("digital-signage-fs" + File.separator + inserted.getId()));
            Files.write(Paths.get("digital-signage-fs" + File.separator + inserted.getId() + File.separator + newContentDto.getContent().getOriginalFilename()), fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
            contentRepository.delete(inserted);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while processing request.");
        }

        LogEntity logEntity = new LogEntity();
        logEntity.setDateTime(Instant.now());
        logEntity.setType("INFO");
        logEntity.setInfo(userEntity.getUsername() + ":" + "Dostavio reklamu.");
        logRepository.saveAndFlush(logEntity);
        return inserted;
    }

    public void toggleStatus(Integer id) {
        ContentEntity contentEntity = contentRepository.findById(id).orElse(null);
        if (contentEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Id does not exist in the database.");
        }

        contentEntity.setApproved(!contentEntity.getApproved());
        ContentEntity updatedContentEntity = contentRepository.saveAndFlush(contentEntity);

        if (contentEntity.getApproved()) {
            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
            String formattedStart = formatter.format(Date.from(updatedContentEntity.getStartDate()));
            String formattedEnd = formatter.format(Date.from(updatedContentEntity.getEndDate()));

            String messageContent = "You ad \"" + updatedContentEntity.getAdName()
                    + "\" has been approved for showing on billboard "
                    + updatedContentEntity.getBillboard().getName()
                    + " between " + formattedStart
                    + " and " + formattedEnd + ".";
            asyncMailService.sendSimpleMailAsync(updatedContentEntity.getUser().getEmail(), messageContent);
        }
    }

    public void setDeleted(Integer id) {
        ContentEntity contentEntity = contentRepository.findById(id).orElse(null);
        if (contentEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Id does not exist in the database.");
        }

        contentEntity.setDeleted(true);
        ContentEntity updatedContentEntity = contentRepository.saveAndFlush(contentEntity);
    }

    @SneakyThrows
    public FileDto getFile(Integer id) {

        if (!contentRepository.existsById(id)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Ad with that id does not exist in the database.");
        }
        FileDto fileDto = new FileDto();
        String contentDirectory = "digital-signage-fs" + File.separator + id;

        File directory = new File(contentDirectory);
        File[] files = directory.listFiles(new FileFilter() {
            @Override
            public boolean accept(File file) {
                return file.isFile();
            }
        });

        if (files != null && files[0] != null) {
            fileDto.setFilename(files[0].getName());
            fileDto.setContent(Files.readAllBytes(files[0].toPath()));
            return fileDto;
        }

        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while processing request.");
    }

    public List<FileDto> getAllAdsForBillboard(Integer billboardId) {
        List<ContentEntity> contents = contentRepository.getAllByBillboardIdAndDeletedAndApproved(billboardId, false, true);
        List<FileDto> ads = new ArrayList<>();

        for (ContentEntity c : contents) {
            ads.add(getFile(c.getId()));
        }

        return ads;
    }

    public List<ContentEntity> getAllAdsForUser(Integer userId) {
        return contentRepository.getAllByUserIdAndDeleted(userId, false);
    }
}
