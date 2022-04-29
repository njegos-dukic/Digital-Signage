package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.AdminUserDto;
import org.unibl.etf.ds.model.dto.UserIdDto;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.UserRepository;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AsyncMailService asyncMailService;

    public UserEntity getById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<AdminUserDto> getAll() {

        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, AdminUserDto.class))
                .collect(Collectors.toList());
    }

    public AdminUserDto deleteById(UserIdDto userIdDto) {
        UserEntity userEntity = getById(userIdDto.getId());
        if (userEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Id does not exist in the database.");
        }
        userEntity.setDeleted(true);
        userRepository.saveAndFlush(userEntity);
        return modelMapper.map(userEntity, AdminUserDto.class);
    }

    public AdminUserDto update(AdminUserDto adminUserDto) {
        UserEntity updatedUserEntity = userRepository.saveAndFlush(modelMapper.map(adminUserDto, UserEntity.class));
        return modelMapper.map(updatedUserEntity, AdminUserDto.class);
    }

    public void resetPassword(UserIdDto userIdDto) {
        UserEntity userEntity = getById(userIdDto.getId());
        if (userEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Id does not exist in the database.");
        }

        String newPassword = "DS2022" + generateRandomAlphaNumericString(10);
        userEntity.setPassword(passwordEncoder.encode(newPassword));
        UserEntity updatedUserEntity = userRepository.saveAndFlush(userEntity);
        String messageContent = "Password for the account " + updatedUserEntity.getUsername() + " has been reset." +
                                "\n" +
                                "New password is: " + newPassword;

        asyncMailService.sendSimpleMailAsync(updatedUserEntity.getEmail(), messageContent);
    }

    public void toggleStatus(UserIdDto userIdDto) {
        UserEntity userEntity = getById(userIdDto.getId());
        if (userEntity == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Id does not exist in the database.");
        }

        userEntity.setDeleted(!userEntity.getDeleted());
        UserEntity updatedUserEntity = userRepository.saveAndFlush(userEntity);
        if (updatedUserEntity.getDeleted()) {
            String messageContent = "Account " + updatedUserEntity.getUsername() + " has been disabled." +
                                    "\n" +
                                    "Contact administrator via contact form for more information.";

            asyncMailService.sendSimpleMailAsync(updatedUserEntity.getEmail(), messageContent);
        }
    }

    private String generateRandomAlphaNumericString(Integer length) {
        int leftLimit = '0';
        int rightLimit = 'z';
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)) // Exclude unicode chars;
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}
