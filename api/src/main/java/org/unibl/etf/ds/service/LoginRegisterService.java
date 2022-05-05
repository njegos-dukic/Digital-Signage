package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.LoginDto;
import org.unibl.etf.ds.model.dto.RegisterDto;
import org.unibl.etf.ds.model.dto.UserDto;
import org.unibl.etf.ds.model.entity.LogEntity;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.LogRepository;
import org.unibl.etf.ds.repository.UserRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class LoginRegisterService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final LogRepository logRepository;

    public UserDto register(RegisterDto registerDto) {
        UserEntity userEntity = modelMapper.map(registerDto, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        if (userRepository.findByUsername(userEntity.getUsername()) == null) {
            UserEntity newUserEntity = userRepository.saveAndFlush(userEntity);
            LogEntity logEntity = new LogEntity();
            logEntity.setDateTime(Instant.now());
            logEntity.setType("INFO");
            logEntity.setInfo(newUserEntity.getUsername() + ":" + "Kreirao nalog.");
            logRepository.saveAndFlush(logEntity);
            return modelMapper.map(newUserEntity, UserDto.class);
        }

        throw new HttpException(HttpStatus.BAD_REQUEST, "Username is taken.");
    }

    public UserDto login(LoginDto loginDto) {
        UserEntity userEntity = userRepository.findByUsername(loginDto.getUsername());
        increaseClicks();
        if (userEntity == null) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Credentials invalid.");
        }

        if (canLogin(userEntity, loginDto.getPassword())) {
            LogEntity logEntity = new LogEntity();
            logEntity.setDateTime(Instant.now());
            logEntity.setType("INFO");
            logEntity.setInfo(userEntity.getUsername() + ":" + "Pristupio servisu.");
            logRepository.saveAndFlush(logEntity);
            return modelMapper.map(userEntity, UserDto.class);
        }

        throw new HttpException(HttpStatus.UNAUTHORIZED, "Credentials invalid.");
    }

    public UserDto adminlogin(LoginDto loginDto) {
        UserEntity userEntity = userRepository.findByUsername(loginDto.getUsername());
        if (userEntity == null) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Credentials invalid.");
        }

        if (canLogin(userEntity, loginDto.getPassword()) && userEntity.getIsAdmin()) {
            return modelMapper.map(userEntity, UserDto.class);
        }

        throw new HttpException(HttpStatus.UNAUTHORIZED, "Credentials invalid.");
    }

    private Boolean canLogin(UserEntity userEntity, String password) {
        if (userEntity.getDisabled()) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Account is disabled.");
        }
        return passwordEncoder.matches(password, userEntity.getPassword());
    }

    @SneakyThrows
    public void increaseClicks() {
        Files.writeString(Paths.get("digital-signage-fs" + File.separator + "clicks.txt"), String.valueOf(getClicks() + 1));
    }

    @SneakyThrows
    public Integer getClicks() {
        List<String> lines = Files.readAllLines(Paths.get("digital-signage-fs" + File.separator + "clicks.txt"));
        String count = lines.get(0);
        return Integer.parseInt(count);
    }
}
