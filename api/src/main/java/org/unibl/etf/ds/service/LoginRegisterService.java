package org.unibl.etf.ds.service;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.unibl.etf.ds.exception.HttpException;
import org.unibl.etf.ds.model.dto.LoginRegisterDto;
import org.unibl.etf.ds.model.dto.UserDto;
import org.unibl.etf.ds.model.entity.UserEntity;
import org.unibl.etf.ds.repository.UserRepository;

@Service
@AllArgsConstructor
public class LoginRegisterService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserDto register(LoginRegisterDto loginRegisterDto) {
        UserEntity userEntity = modelMapper.map(loginRegisterDto, UserEntity.class);
        System.out.println(userEntity);
        if (userRepository.findByUsername(userEntity.getUsername()) == null) {
            userRepository.saveAndFlush(userEntity);
            UserDto userDto = new UserDto();
            userDto.setUsername(userEntity.getUsername());
            userDto.setToken("JWT TOKEN");
            return userDto;
        }

        throw new HttpException(HttpStatus.BAD_REQUEST, "Username is taken!");
    }

    public UserDto login(LoginRegisterDto loginRegisterDto) {
        UserEntity userEntity = userRepository.findByUsernameAndPassword(loginRegisterDto.getUsername(), loginRegisterDto.getPassword());
        if (userEntity != null) {
            UserDto userDto = new UserDto();
            userDto.setUsername(loginRegisterDto.getUsername());
            userDto.setToken("JWT TOKEN");
            return userDto;
        }

        throw new HttpException(HttpStatus.UNAUTHORIZED, "Credentials invalid!");
    }
}
