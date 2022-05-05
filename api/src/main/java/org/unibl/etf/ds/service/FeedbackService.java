package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.AdminUserDto;
import org.unibl.etf.ds.model.dto.FeedbackDto;
import org.unibl.etf.ds.model.dto.NewFeedbackDto;
import org.unibl.etf.ds.model.entity.FeedbackEntity;
import org.unibl.etf.ds.model.entity.LogEntity;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.FeedbackRepository;
import org.unibl.etf.ds.repository.LogRepository;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final LogRepository logRepository;

    public List<FeedbackDto> getAll() {
        return feedbackRepository.findAll()
                .stream()
                .map(f -> new FeedbackDto(f.getId(), f.getContent(), modelMapper.map(f.getUser(), AdminUserDto.class)))
                .collect(Collectors.toList());
    }

    public FeedbackEntity addNew(NewFeedbackDto newFeedbackDto) {
        FeedbackEntity feedbackEntity = new FeedbackEntity();
        feedbackEntity.setContent(newFeedbackDto.getFeedback());
        UserEntity userEntity = userService.getById(newFeedbackDto.getUserId());
        if (userEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "User with that Id does not exist.");
        }
        feedbackEntity.setUser(userEntity);
        LogEntity logEntity = new LogEntity();
        logEntity.setDateTime(Instant.now());
        logEntity.setType("INFO");
        logEntity.setInfo(userEntity.getUsername() + ":" + "Ostavio feedback.");
        logRepository.saveAndFlush(logEntity);
        return feedbackRepository.saveAndFlush(feedbackEntity);
    }

    public Boolean delete(Integer id) {
        FeedbackEntity feedbackEntity = feedbackRepository.findById(id).orElse(null);
        if (feedbackEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Feedback with that Id does not exist.");
        }

        feedbackRepository.deleteById(feedbackEntity.getId());
        return true;
    }
}
