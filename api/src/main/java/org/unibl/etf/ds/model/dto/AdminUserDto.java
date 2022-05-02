package org.unibl.etf.ds.model.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class AdminUserDto {

    @NotNull
    private Integer id;
    @NotNull
    @Size(min = 3, message = "Username must be at least 3 characters long.")
    private String username;
    @Email(message = "Email is not in valid format.")
    private String email;
    @NotNull
    private Boolean disabled;
}