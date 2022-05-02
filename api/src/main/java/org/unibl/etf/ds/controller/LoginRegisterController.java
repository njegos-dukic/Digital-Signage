package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.ds.model.dto.LoginDto;
import org.unibl.etf.ds.model.dto.RegisterDto;
import org.unibl.etf.ds.model.dto.UserDto;
import org.unibl.etf.ds.service.LoginRegisterService;

@RestController
@AllArgsConstructor
public class LoginRegisterController {

    private LoginRegisterService loginRegisterService;

    @PostMapping("/login")
    public UserDto login(@Validated @RequestBody LoginDto loginDto) {
        return loginRegisterService.login(loginDto);
    }

    @PostMapping("/admin-login")
    public UserDto adminLogin(@Validated @RequestBody LoginDto loginDto) {
        return loginRegisterService.adminlogin(loginDto);
    }

    @PostMapping("/register")
    public UserDto register(@Validated @RequestBody RegisterDto registerDto) {
        return loginRegisterService.register(registerDto);
    }
}
