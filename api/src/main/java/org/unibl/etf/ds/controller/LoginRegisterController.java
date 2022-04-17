package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.ds.model.dto.LoginRegisterDto;
import org.unibl.etf.ds.model.dto.UserDto;
import org.unibl.etf.ds.service.LoginRegisterService;

@RestController
@AllArgsConstructor
public class LoginRegisterController {

    private LoginRegisterService loginRegisterService;

    @PostMapping("/login")
    public UserDto login(@RequestBody LoginRegisterDto loginRegisterDto) {
        return loginRegisterService.login(loginRegisterDto);
    }

    @PostMapping("/register")
    public UserDto register(@RequestBody LoginRegisterDto loginRegisterDto) {
        return loginRegisterService.register(loginRegisterDto);
    }
}
