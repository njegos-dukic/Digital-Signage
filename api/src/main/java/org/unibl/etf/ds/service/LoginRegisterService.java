package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.LoginDto;
import org.unibl.etf.ds.model.dto.RegisterDto;
import org.unibl.etf.ds.model.dto.UserDto;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.UserRepository;

@Service
@AllArgsConstructor
public class LoginRegisterService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UserDto register(RegisterDto registerDto) {
        UserEntity userEntity = modelMapper.map(registerDto, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        if (userRepository.findByUsername(userEntity.getUsername()) == null) {
            UserEntity newUserEntity = userRepository.saveAndFlush(userEntity);
            return modelMapper.map(newUserEntity, UserDto.class);
        }

        throw new HttpException(HttpStatus.BAD_REQUEST, "Username is taken.");
    }

    public UserDto login(LoginDto loginDto) {
        UserEntity userEntity = userRepository.findByUsername(loginDto.getUsername());
        if (canLogin(userEntity, loginDto.getPassword())) {
            return modelMapper.map(userEntity, UserDto.class);
        }

        throw new HttpException(HttpStatus.UNAUTHORIZED, "Credentials invalid.");
    }

    private Boolean canLogin(UserEntity userEntity, String password) {
        if (userEntity.getDeleted()) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Account is disabled.");
        }
        return passwordEncoder.matches(password, userEntity.getPassword());
    }
}
