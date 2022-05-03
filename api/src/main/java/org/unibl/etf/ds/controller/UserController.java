package org.unibl.etf.ds.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.ds.model.dto.AdminUserDto;
import org.unibl.etf.ds.model.dto.IdDto;
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

    // POST /users -> Done in registration.

    @PutMapping
    public void updatedUser(@RequestBody @Validated AdminUserDto adminUserDto) {
        userService.update(adminUserDto);
    }

    @PostMapping("/reset")
    public void resetPassword(@RequestBody @Validated IdDto idDto) {
        userService.resetPassword(idDto);
    }

    @PostMapping("/toggle")
    public void toggleStatus(@RequestBody @Validated IdDto idDto) {
        userService.toggleStatus(idDto);
    }

    @PostMapping("/toggle-admin")
    public void toggleAdmin(@RequestBody @Validated IdDto idDto) {
        userService.toggleAdmin(idDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AdminUserDto> delete(@PathVariable Integer id) {
        IdDto idDto = new IdDto(id);
        return new ResponseEntity<AdminUserDto>(userService.deleteById(idDto), HttpStatus.OK);
    }
}
