package org.unibl.etf.ds.model.dto;

import lombok.Data;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class LoginDto {

    @Size(min = 3, message = "Username must be at least 3 characters long.")
    private String username;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password must be at least 8 characters long, must contain a letter and a number.")
    private String password;
}
