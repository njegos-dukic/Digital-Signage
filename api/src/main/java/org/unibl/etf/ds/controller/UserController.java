package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.ds.model.dto.AdminUserDto;
import org.unibl.etf.ds.model.dto.UserIdDto;
import org.unibl.etf.ds.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<AdminUserDto>> getAll() {
        return new ResponseEntity<List<AdminUserDto>>(userService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/reset")
    public void resetPassword(@RequestBody @Validated UserIdDto userIdDto) {
        userService.resetPassword(userIdDto);
    }

    @PostMapping("/toggle")
    public void toggleStatus(@RequestBody @Validated UserIdDto userIdDto) {
        userService.toggleStatus(userIdDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AdminUserDto> delete(@PathVariable Integer id) {
        UserIdDto userIdDto = new UserIdDto(id);
        return new ResponseEntity<AdminUserDto>(userService.deleteById(userIdDto), HttpStatus.OK);
    }
}
